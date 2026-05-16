'use client';

import { useState } from 'react';
import AuthGate from './components/AuthGate';
import ChatInterface from './components/ChatInterface';
import ScheduleView from './components/ScheduleView';

export default function AgentPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'today'>('chat');

  return (
    <AuthGate>
      <div className="flex flex-col no-bounce" style={{ height: '100dvh', background: '#07080A' }}>
        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid #111318' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full font-black text-white text-sm"
              style={{ width: 36, height: 36, background: '#FF6A1A', letterSpacing: 1 }}
            >
              AG
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: '#F8FAFC' }}>Ashwini&apos;s Assistant</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E' }} />
                <p className="text-xs" style={{ color: '#69717F' }}>AI-powered · always on</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="shrink-0 flex"
          style={{ borderBottom: '1px solid #111318' }}
        >
          {(['chat', 'today'] as const).map((tab) => {
            const active = activeTab === tab;
            const label = tab === 'chat' ? '💬  Chat' : '📅  Schedule';
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-sm font-semibold transition-colors"
                style={{
                  color: active ? '#FF6A1A' : '#69717F',
                  borderBottom: active ? '2px solid #FF6A1A' : '2px solid transparent',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' ? <ChatInterface /> : <ScheduleView />}
        </div>
      </div>
    </AuthGate>
  );
}
