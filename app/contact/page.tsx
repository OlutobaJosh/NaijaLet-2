'use client';

import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, connect to email service like Resend
    setSent(true);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '20%', left: '5%', width: '350px', height: '350px', background: 'rgba(255,92,0,0.05)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <span className="accent-pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Get in touch</span>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--cream)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              We&apos;re here<br /><span style={{ color: 'var(--accent)' }}>to help.</span>
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'rgba(242,237,228,0.5)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.5rem' }}>
              Have a question, complaint, or want to partner with us? We respond to every message within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: '📧', label: 'Email', value: 'hello@naijaletng.com' },
                { icon: '📱', label: 'WhatsApp', value: '+234 800 000 0000' },
                { icon: '📍', label: 'Based in', value: 'Nigeria 🇳🇬' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(242,237,228,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'var(--cream)', fontWeight: 500 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', padding: '2rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>Message sent!</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(242,237,228,0.45)', fontSize: '0.9rem', fontWeight: 300 }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Adebayo Johnson' },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'adebayo@gmail.com' },
                  { label: 'Subject', key: 'subject', type: 'text', placeholder: 'What is this about?' },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'rgba(242,237,228,0.45)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      required placeholder={field.placeholder}
                      style={{ width: '100%', background: 'rgba(242,237,228,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.8rem 1rem', color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'rgba(242,237,228,0.45)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required placeholder="Tell us what you need help with..."
                    rows={4}
                    style={{ width: '100%', background: 'rgba(242,237,228,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.8rem 1rem', color: 'var(--cream)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
                <button type="submit" style={{ background: 'var(--accent)', border: 'none', color: 'white', padding: '0.9rem', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
