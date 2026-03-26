'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'tenant' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name, phone: form.phone, role: form.role }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Insert into profiles
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: form.email,
        full_name: form.name,
        phone: form.phone,
        role: form.role,
      });
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📬</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.8rem', color: 'var(--cream)', marginBottom: '0.75rem' }}>Check your email</h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(242,237,228,0.5)', lineHeight: 1.7, fontWeight: 300 }}>
            We sent a confirmation link to <strong style={{ color: 'var(--cream)' }}>{form.email}</strong>. Click it to activate your account.
          </p>
          <Link href="/auth/signin" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--accent)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>
            Back to Sign In →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '400px', height: '400px', background: 'rgba(255,92,0,0.05)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative' }}>
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

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '2rem', color: 'var(--cream)', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Create account</h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(242,237,228,0.45)', fontSize: '0.95rem', marginBottom: '2rem', fontWeight: 300 }}>
          Join thousands finding homes across Nigeria
        </p>

        {/* Role picker */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[{ value: 'tenant', label: '🔍 I\'m looking', sub: 'Find a home' }, { value: 'landlord', label: '🏠 I\'m listing', sub: 'List a property' }].map((r) => (
            <button key={r.value} onClick={() => setForm({ ...form, role: r.value })} type="button" style={{
              background: form.role === r.value ? 'var(--accent-muted)' : 'var(--bg-card)',
              border: `1px solid ${form.role === r.value ? 'var(--border-accent)' : 'var(--border)'}`,
              borderRadius: '10px', padding: '0.9rem', cursor: 'pointer', textAlign: 'left',
            }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'var(--cream)', fontWeight: 500 }}>{r.label}</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(242,237,228,0.4)', marginTop: '0.2rem' }}>{r.sub}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.25)', borderRadius: '8px', padding: '0.75rem 1rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Adebayo Johnson' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'adebayo@gmail.com' },
            { label: 'Phone', key: 'phone', type: 'tel', placeholder: '08012345678' },
            { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.key}>
              <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.5)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                required placeholder={field.placeholder}
                style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem 1rem', color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={{
            background: 'var(--accent)', border: 'none', color: 'white',
            padding: '0.9rem', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, marginTop: '0.5rem',
          }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: 'rgba(242,237,228,0.4)', textAlign: 'center', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link href="/auth/signin" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
