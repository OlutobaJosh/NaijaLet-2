'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ position: 'absolute', top: '20%', right: '15%', width: '350px', height: '350px', background: 'rgba(255,92,0,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '2.5rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--cream)' }}>
            Naija<span style={{ color: 'var(--accent)' }}>Let</span>
          </span>
        </Link>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '2rem', color: 'var(--cream)', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Welcome back</h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(242,237,228,0.45)', fontSize: '0.95rem', marginBottom: '2rem', fontWeight: 300 }}>
          Sign in to your NaijaLet account
        </p>

        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.25)', borderRadius: '8px', padding: '0.75rem 1rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.5)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="you@example.com"
              style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem 1rem', color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.5)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem 1rem', color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            background: 'var(--accent)', border: 'none', color: 'white',
            padding: '0.9rem', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, marginTop: '0.5rem',
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.25)' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.25)', textAlign: 'center', marginBottom: '1.5rem' }}>
          Google sign-in coming soon
        </p>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: 'rgba(242,237,228,0.4)', textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
