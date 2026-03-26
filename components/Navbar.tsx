'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(242,237,228,0.06)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'var(--cream)', letterSpacing: '-0.02em' }}>
              Naija<span style={{ color: 'var(--accent)' }}>Let</span>
            </span>
          </Link>

          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2rem' }}>
            {[{ label: 'Browse', href: '/listings' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} style={{ color: 'rgba(242,237,228,0.6)', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'transparent', border: '1px solid rgba(242,237,228,0.15)', color: 'var(--cream)', padding: '0.5rem 1.1rem', borderRadius: '8px', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, cursor: 'pointer' }}>
                List Property
              </button>
            </Link>
            <Link href="/auth/signin" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'var(--accent)', border: 'none', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, cursor: 'pointer' }}>
                Sign In
              </button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', color: 'var(--cream)', cursor: 'pointer' }}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div style={{ padding: '1rem 0 1.5rem', borderTop: '1px solid rgba(242,237,228,0.06)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[{ label: 'Browse Properties', href: '/listings' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} style={{ color: 'rgba(242,237,228,0.7)', textDecoration: 'none', fontSize: '1rem', fontFamily: 'DM Sans, sans-serif' }}>
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', background: 'rgba(242,237,228,0.06)', border: '1px solid rgba(242,237,228,0.12)', color: 'var(--cream)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>
                List Property
              </button>
            </Link>
            <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', background: 'var(--accent)', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, cursor: 'pointer' }}>
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
