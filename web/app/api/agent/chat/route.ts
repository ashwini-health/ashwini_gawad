import Anthropic from '@anthropic-ai/sdk';
import { createServerSupabase } from '@/lib/supabase';

export const maxDuration = 60;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Intent classification ────────────────────────────────────────────────────

function classifyIntent(message: string): 'light' | 'full' {
  const lower = message.toLowerCase();
  const fullTriggers = [
    /plan (my|today|this|the|tomorrow)/,
    /schedule (my|today|this)/,
    /what should i do/,
    /prioriti[sz]e/,
    /research/,
    /latest (studies|evidence)/,
    /strateg/,
    /how (do|should|can) (i|we)/,
    /business (review|update|plan)/,
    /weekly review/,
    /analyz/,
    /explain .+ (to me|in detail)/,
  ];
  for (const t of fullTriggers) if (t.test(lower)) return 'full';
  if (message.length > 150) return 'full';
  return 'light';
}

// ─── System prompts ───────────────────────────────────────────────────────────

const LIGHT_SYSTEM = `You are Ashwini's daily business assistant. You are warm, direct, and always helpful.

RULES:
- Respond in 1-3 sentences max for simple check-ins
- If she logs a task completion, acknowledge it warmly and state the next task
- If she asks what to do, check her schedule and tell her the current block
- Never fabricate data. Say "not logged yet" if you don't have information
- End every response with one clear Next Step
- Speak simply. No corporate language. Like a supportive colleague.

Current date/time: {{DATETIME}}
Today's schedule: {{TODAYS_SCHEDULE}}
Business metrics this week: {{WEEKLY_METRICS}}`;

const FULL_SYSTEM = `You are Ashwini Gawad's personal Business Architect and daily operating assistant. You combine deep business experience with warm, personal guidance. You know her business deeply.

ASHWINI'S BUSINESS:
- Clinical dietitian, 25+ years, KEM Hospital trained, former VLCC Area Head
- Core offer: 90-Day Concierge Parental Health Protocol
- NRI families site: ashwini-gawad.vercel.app (₹45,000-65,000)
- Local Mumbai site: ashwinigawad.vercel.app
- Current: {{CLIENT_COUNT}} active clients, {{INQUIRIES_THIS_WEEK}} inquiries this week
- Target: 3 clients in 90 days

YOUR PRINCIPLES:
1. Every task must advance getting clients or delivering the protocol
2. Work WITH Ashwini — you think, she acts, she reports, you synthesize
3. For research: tell her what to search, she finds, you synthesize
4. Be honest. If something isn't working, say so warmly
5. Never fabricate data. Unlogged = "Not logged yet"
6. Research citations need year. Flag >3 year old sources
7. If outside your capability, say so and suggest who to contact
8. Flag medical accuracy concerns: "⚠️ Verify with a doctor"

FORMAT:
- Day planning: timed blocks with specific tasks, always include 1hr reading
- Strategy: think step by step, ONE recommendation
- Always end with: "▶️ Next Step: [one action]"

Current: {{DATETIME}}
Schedule: {{TODAYS_SCHEDULE}}
Metrics: {{WEEKLY_METRICS}}
Messages today: {{MESSAGES_TODAY}}`;

// ─── Model config ─────────────────────────────────────────────────────────────

const MODEL_MAP = {
  light: 'claude-haiku-4-5-20251001',
  full: 'claude-sonnet-4-6',
} as const;

type ModelKey = (typeof MODEL_MAP)[keyof typeof MODEL_MAP];

const COST_PER_TOKEN: Record<ModelKey, { input: number; output: number }> = {
  'claude-haiku-4-5-20251001': { input: 1 / 1_000_000, output: 5 / 1_000_000 },
  'claude-sonnet-4-6': { input: 3 / 1_000_000, output: 15 / 1_000_000 },
};

// ─── Context fetching ─────────────────────────────────────────────────────────

async function getContextData(istDate: string) {
  const supabase = createServerSupabase();

  const datetime = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  // Fetch today's schedule
  const { data: scheduleRows } = await supabase
    .from('agent_schedule')
    .select('start_time, end_time, task_title, status')
    .eq('block_date', istDate)
    .order('start_time', { ascending: true });

  const todaysSchedule =
    scheduleRows && scheduleRows.length > 0
      ? scheduleRows
          .map(
            (b) =>
              `${b.start_time}–${b.end_time}: ${b.task_title} [${b.status}]`
          )
          .join('\n')
      : 'No schedule set for today';

  // Fetch weekly metrics summary
  const { data: metricsRow } = await supabase
    .from('weekly_metrics_summary')
    .select('*')
    .limit(1)
    .maybeSingle();

  const weeklyMetrics = metricsRow
    ? Object.entries(metricsRow)
        .filter(([k]) => k !== 'id')
        .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
        .join(' · ')
    : 'No weekly metrics available yet';

  const clientCount = String(metricsRow?.client_count ?? 'Not logged yet');
  const inquiriesThisWeek = String(
    metricsRow?.inquiries_this_week ?? 'Not logged yet'
  );

  // Fetch today's message count
  const { data: usageRow } = await supabase
    .from('agent_token_usage')
    .select('messages_count')
    .eq('date', istDate)
    .maybeSingle();

  const messagesToday = String(usageRow?.messages_count ?? 0);

  return {
    datetime,
    todaysSchedule,
    weeklyMetrics,
    clientCount,
    inquiriesThisWeek,
    messagesToday,
  };
}

// ─── Logging ──────────────────────────────────────────────────────────────────

async function logToSupabase(
  istDate: string,
  model: ModelKey,
  content: string,
  inputTokens: number,
  outputTokens: number
) {
  try {
    const supabase = createServerSupabase();
    const costs = COST_PER_TOKEN[model];
    const costUsd = inputTokens * costs.input + outputTokens * costs.output;

    // Log the message
    await supabase.from('agent_messages').insert({
      role: 'assistant',
      content,
      model_used: model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd: costUsd,
    });

    // Upsert daily token usage (increment)
    const { data: existing } = await supabase
      .from('agent_token_usage')
      .select('input_tokens, output_tokens, total_cost_usd, messages_count')
      .eq('date', istDate)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('agent_token_usage')
        .update({
          input_tokens: (existing.input_tokens || 0) + inputTokens,
          output_tokens: (existing.output_tokens || 0) + outputTokens,
          total_cost_usd:
            parseFloat(String(existing.total_cost_usd || 0)) + costUsd,
          messages_count: (existing.messages_count || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('date', istDate);
    } else {
      await supabase.from('agent_token_usage').insert({
        date: istDate,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_cost_usd: costUsd,
        messages_count: 1,
      });
    }
  } catch (err) {
    console.error('Supabase logging error:', err);
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response('Invalid request', { status: 400 });
    }

    const intent = classifyIntent(message);
    const model = MODEL_MAP[intent];
    const modelBadge = intent === 'light' ? 'haiku' : 'sonnet';

    // Get IST date string (YYYY-MM-DD)
    const istDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
    }).format(new Date());

    // Fetch context data from Supabase
    let ctx;
    try {
      ctx = await getContextData(istDate);
    } catch {
      ctx = {
        datetime: new Date().toISOString(),
        todaysSchedule: 'Schedule unavailable',
        weeklyMetrics: 'Metrics unavailable',
        clientCount: 'N/A',
        inquiriesThisWeek: 'N/A',
        messagesToday: '0',
      };
    }

    // Build system prompt
    const template = intent === 'light' ? LIGHT_SYSTEM : FULL_SYSTEM;
    const system = template
      .replace('{{DATETIME}}', ctx.datetime)
      .replace('{{TODAYS_SCHEDULE}}', ctx.todaysSchedule)
      .replace('{{WEEKLY_METRICS}}', ctx.weeklyMetrics)
      .replace('{{CLIENT_COUNT}}', ctx.clientCount)
      .replace('{{INQUIRIES_THIS_WEEK}}', ctx.inquiriesThisWeek)
      .replace('{{MESSAGES_TODAY}}', ctx.messagesToday);

    // Build messages array (max 20 for context window)
    const apiMessages: { role: 'user' | 'assistant'; content: string }[] = (
      history || []
    )
      .slice(-20)
      .filter(
        (m: { role: string; content: string }) =>
          m.role === 'user' || m.role === 'assistant'
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    // Optionally add web search for research queries
    const needsSearch =
      intent === 'full' &&
      /research|latest|studies|evidence|current/i.test(message);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const streamParams: any = {
      model,
      max_tokens: 8192,
      system,
      messages: apiMessages,
    };

    if (needsSearch) {
      streamParams.tools = [
        { type: 'web_search_20250305', name: 'web_search' },
      ];
    }

    const stream = anthropic.messages.stream(streamParams);

    const encoder = new TextEncoder();
    let fullContent = '';
    let inputTokens = 0;
    let outputTokens = 0;

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              fullContent += chunk.delta.text;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: 'delta', text: chunk.delta.text })}\n\n`
                )
              );
            } else if (
              chunk.type === 'message_start' &&
              chunk.message?.usage
            ) {
              inputTokens = chunk.message.usage.input_tokens;
            } else if (chunk.type === 'message_delta' && chunk.usage) {
              outputTokens = chunk.usage.output_tokens;
            }
          }

          // Fire-and-forget logging
          logToSupabase(
            istDate,
            model,
            fullContent,
            inputTokens,
            outputTokens
          );

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'done',
                model: modelBadge,
                usage: { inputTokens, outputTokens },
              })}\n\n`
            )
          );
          controller.close();
        } catch (err) {
          console.error('Streaming error:', err);
          // Send error event before closing
          try {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'error', message: 'Stream failed' })}\n\n`
              )
            );
            controller.close();
          } catch {
            controller.error(err);
          }
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error('Chat route error:', err);
    return new Response('Internal server error', { status: 500 });
  }
}
