'use client';

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: 'haiku' | 'sonnet';
  streaming?: boolean;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const adjustTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '44px';
    el.style.height = Math.min(el.scrollHeight, 128) + 'px';
  };

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = '44px';
    setIsStreaming(true);

    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '', timestamp: new Date(), streaming: true }]);

    try {
      const history = messages.slice(-18).concat([userMsg]).map((m) => ({ role: m.role, content: m.content }));
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const data = JSON.parse(raw);
            if (data.type === 'delta') {
              setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: m.content + data.text } : m));
            } else if (data.type === 'done') {
              setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, streaming: false, model: data.model } : m));
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch {
      setMessages((prev) => prev.map((m) => m.id === assistantId
        ? { ...m, content: 'Something went wrong. Please try again.', streaming: false }
        : m
      ));
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex flex-col h-full no-bounce" style={{ background: '#07080A' }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-48 text-center px-4 mt-8">
            <div className="text-4xl mb-4">🌿</div>
            <p className="font-bold text-base" style={{ color: '#F8FAFC' }}>Good day, Ashwini!</p>
            <p className="text-sm mt-1" style={{ color: '#69717F' }}>What would you like to focus on today?</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words"
                style={
                  msg.role === 'user'
                    ? { background: '#FF6A1A', color: '#fff', borderBottomRightRadius: 4 }
                    : { background: '#111318', color: '#A8B0BD', borderBottomLeftRadius: 4, border: '1px solid #252A33' }
                }
              >
                {msg.content}
                {msg.streaming && msg.content === '' && (
                  <span className="inline-flex items-center gap-1 h-4">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: '#69717F', animationDelay: `${delay}ms` }} />
                    ))}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 px-1">
                <span className="text-xs" style={{ color: '#69717F' }}>{formatTime(msg.timestamp)}</span>
                {msg.model && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={msg.model === 'haiku'
                      ? { background: '#172554', color: '#93C5FD' }
                      : { background: '#1E1B4B', color: '#A5B4FC' }
                    }
                  >
                    {msg.model === 'haiku' ? 'Haiku' : 'Sonnet'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 py-3" style={{ borderTop: '1px solid #111318', background: '#07080A' }}>
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); adjustTextarea(); }}
            onKeyDown={handleKeyDown}
            placeholder="Message your assistant…"
            rows={1}
            disabled={isStreaming}
            className="flex-1 resize-none px-4 py-3 rounded-2xl text-sm outline-none transition-all overflow-hidden disabled:opacity-50"
            style={{
              background: '#111318', color: '#F8FAFC', border: '1px solid #252A33',
              minHeight: '44px', maxHeight: '128px',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-40 active:scale-90 transition-all"
            style={{ background: '#FF6A1A' }}
            aria-label="Send"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 translate-x-0.5">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
