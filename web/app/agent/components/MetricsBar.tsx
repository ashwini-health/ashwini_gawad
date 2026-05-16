'use client';

import { useState, useEffect } from 'react';

interface MetricsData {
  messages_today: number;
  cost_today: number;
  weekly: {
    messages: number;
    cost: number;
  };
}

interface Props {
  currentModel: 'haiku' | 'sonnet' | null;
  refreshKey?: number;
}

export default function MetricsBar({ currentModel, refreshKey }: Props) {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, [refreshKey]);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/agent/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch {
      // non-critical, ignore
    }
  };

  if (!metrics) {
    return <div className="h-8 bg-gray-50 border-b border-gray-100" />;
  }

  return (
    <div
      className="bg-gray-50 border-b border-gray-100 cursor-pointer select-none"
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-center gap-3 px-4 py-2 text-xs text-gray-500">
        <span>💬 {metrics.messages_today} today</span>
        <span>💰 ${metrics.cost_today.toFixed(4)}</span>
        {currentModel && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              currentModel === 'haiku'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            {currentModel === 'haiku' ? 'Haiku' : 'Sonnet'}
          </span>
        )}
        <span className="ml-auto text-gray-300">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="px-4 pb-2 text-xs text-gray-400 border-t border-gray-100 pt-2 space-y-0.5">
          <p>This week: {metrics.weekly.messages} messages · ${metrics.weekly.cost.toFixed(4)}</p>
          <p className="text-gray-300">Tap to collapse</p>
        </div>
      )}
    </div>
  );
}
