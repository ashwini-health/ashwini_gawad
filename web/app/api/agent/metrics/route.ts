import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';

function getTodayIST(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
  }).format(new Date());
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date') || getTodayIST();

    const supabase = createServerSupabase();

    // Today's usage
    const { data: todayData } = await supabase
      .from('agent_token_usage')
      .select('messages_count, total_cost_usd')
      .eq('date', date)
      .maybeSingle();

    // Weekly usage (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
    }).format(weekAgo);

    const { data: weeklyData } = await supabase
      .from('agent_token_usage')
      .select('messages_count, total_cost_usd, input_tokens, output_tokens')
      .gte('date', weekAgoStr);

    const weekly = (weeklyData || []).reduce(
      (acc, row) => ({
        messages: acc.messages + (row.messages_count || 0),
        cost: acc.cost + parseFloat(String(row.total_cost_usd || 0)),
        inputTokens: acc.inputTokens + (row.input_tokens || 0),
        outputTokens: acc.outputTokens + (row.output_tokens || 0),
      }),
      { messages: 0, cost: 0, inputTokens: 0, outputTokens: 0 }
    );

    return NextResponse.json({
      messages_today: todayData?.messages_count || 0,
      cost_today: parseFloat(String(todayData?.total_cost_usd || 0)),
      weekly,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { metric_type, source, details, amount } = body;

    if (!metric_type) {
      return NextResponse.json(
        { error: 'metric_type is required' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from('weekly_metrics')
      .insert({
        metric_type,
        source: source || null,
        details: details || null,
        amount: amount || null,
        recorded_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ metric: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
