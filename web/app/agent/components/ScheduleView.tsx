'use client';

import { useState, useEffect } from 'react';

interface ScheduleBlock {
  id: string;
  block_date: string;
  start_time: string;
  end_time: string;
  task_title: string;
  task_description?: string;
  category?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'missed';
}

const STATUS_META: Record<ScheduleBlock['status'], { bg: string; border: string; dot: string; text: string; label: string }> = {
  pending:     { bg: '#111318', border: '#252A33', dot: '#69717F',  text: '#A8B0BD', label: 'Pending' },
  in_progress: { bg: '#1A1400', border: '#78350F', dot: '#F59E0B',  text: '#FCD34D', label: 'In Progress' },
  completed:   { bg: '#071610', border: '#14532D', dot: '#22C55E',  text: '#86EFAC', label: 'Done ✓' },
  missed:      { bg: '#1A0808', border: '#7F1D1D', dot: '#EF4444',  text: '#FCA5A5', label: 'Missed' },
};

const STATUS_CYCLE: ScheduleBlock['status'][] = ['pending', 'in_progress', 'completed', 'missed'];

export default function ScheduleView() {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSchedule(); }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch('/api/agent/schedule');
      if (res.ok) { const data = await res.json(); setBlocks(data.blocks || []); }
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  const cycleStatus = async (block: ScheduleBlock) => {
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(block.status) + 1) % STATUS_CYCLE.length];
    setBlocks((prev) => prev.map((b) => b.id === block.id ? { ...b, status: next } : b));
    try {
      await fetch('/api/agent/schedule', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: block.id, status: next }),
      });
    } catch {
      setBlocks((prev) => prev.map((b) => b.id === block.id ? { ...b, status: block.status } : b));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-sm" style={{ color: '#69717F' }}>
        Loading schedule…
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center">
        <div className="text-5xl mb-4">📅</div>
        <p className="font-bold text-lg" style={{ color: '#F8FAFC' }}>No schedule yet</p>
        <p className="text-sm mt-2" style={{ color: '#69717F' }}>Switch to Chat and ask me to plan your day.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-4 no-bounce" style={{ background: '#07080A' }}>
      <h2 className="text-xs font-bold uppercase tracking-widest mb-4 px-1" style={{ color: '#69717F', letterSpacing: '0.15em' }}>
        Today&apos;s Schedule
      </h2>

      <div className="space-y-3">
        {blocks.map((block) => {
          const meta = STATUS_META[block.status];
          return (
            <button
              key={block.id}
              onClick={() => cycleStatus(block)}
              className="w-full text-left rounded-2xl p-4 transition-all active:scale-98"
              style={{ background: meta.bg, border: `1px solid ${meta.border}` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: meta.dot, boxShadow: block.status === 'in_progress' ? `0 0 6px ${meta.dot}` : 'none' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-medium" style={{ color: '#69717F' }}>
                      {block.start_time}–{block.end_time}
                    </span>
                    {block.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                        style={{ background: '#171A21', color: '#69717F', border: '1px solid #252A33' }}>
                        {block.category}
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-sm leading-tight" style={{ color: meta.text }}>
                    {block.task_title}
                  </p>
                  {block.task_description && (
                    <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: '#69717F' }}>
                      {block.task_description}
                    </p>
                  )}
                  <p className="text-xs mt-2 font-medium" style={{ color: '#52575F' }}>
                    {STATUS_META[block.status].label} · tap to advance
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
