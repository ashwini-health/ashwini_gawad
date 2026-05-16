'use client';

import { useState, useEffect, ReactNode } from 'react';

export default function AuthGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('agent_authenticated');
    if (auth === 'true') setAuthenticated(true);
    setChecking(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/agent/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        localStorage.setItem('agent_authenticated', 'true');
        setAuthenticated(true);
      } else {
        setError('Incorrect password. Try again.');
        setPassword('');
      }
    } catch {
      setError('Connection error. Check your network.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) return <div style={{ minHeight: '100dvh', background: '#07080A' }} />;
  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#07080A' }}>
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <div
            className="mx-auto mb-5 flex items-center justify-center rounded-full font-black text-white text-xl"
            style={{ width: 64, height: 64, background: '#FF6A1A', letterSpacing: 2 }}
          >
            AG
          </div>
          <h1 className="text-2xl font-extrabold" style={{ color: '#F8FAFC' }}>
            Ashwini&apos;s Assistant
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#69717F' }}>
            Private portal · Enter your access code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Access code"
            autoFocus
            autoComplete="current-password"
            className="w-full px-5 py-4 text-base rounded-2xl border outline-none transition-all"
            style={{
              background: '#111318',
              borderColor: '#252A33',
              color: '#F8FAFC',
            }}
          />

          {error && (
            <p className="text-sm text-center font-medium" style={{ color: '#EF4444' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 rounded-2xl text-base font-bold text-white transition-all disabled:opacity-40 active:scale-95"
            style={{ background: '#FF6A1A' }}
          >
            {loading ? 'Verifying…' : 'Enter'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs" style={{ color: '#69717F' }}>
          Ashwini Gawad · Clinical Dietitian · Mumbai
        </p>
      </div>
    </div>
  );
}
