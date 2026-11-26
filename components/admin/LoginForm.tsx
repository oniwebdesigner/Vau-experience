'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { btn, inputCls, labelCls } from './ui';

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace('/admin');
        router.refresh();
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? 'Nuk u arrit të hyni.');
    } catch {
      setError('Nuk u arrit lidhja me serverin.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <div>
        <label htmlFor="pw" className={labelCls}>
          Fjalëkalimi
        </label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-clay-deep">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy || !password} className={`${btn.primary} w-full`}>
        {busy ? 'Duke hyrë…' : 'Hyr në panel'}
      </button>
    </form>
  );
}
