import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(242,237,228,0.06)',
      padding: '3rem 1.5rem 2rem',
      background: 'var(--bg)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--accent)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--cream)' }}>
                Naija<span style={{ color: 'var(--accent)' }}>Let</span>
              </span>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: 'rgba(242,237,228,0.35)', lineHeight: 1.7, maxWidth: '180px', fontWeight: 300 }}>
              Find your next home anywhere in Nigeria. No shady agents, just direct connections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'var(--cream)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Browse</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[{ label: 'Properties', href: '/listings' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }].map((item) => (
                <Link key={item.href} href={item.href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.4)', textDecoration: 'none', fontWeight: 300 }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Landlords */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'var(--cream)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Landlords</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[{ label: 'List Property', href: '/dashboard' }, { label: 'Get Verified', href: '/pricing' }, { label: 'FAQ', href: '/faq' }].map((item) => (
                <Link key={item.href} href={item.href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.4)', textDecoration: 'none', fontWeight: 300 }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: 'var(--cream)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[{ label: 'Terms of Service', href: '/terms' }, { label: 'Privacy Policy', href: '/privacy' }].map((item) => (
                <Link key={item.href} href={item.href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.4)', textDecoration: 'none', fontWeight: 300 }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(242,237,228,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.25)', fontWeight: 300 }}>
            © 2026 NaijaLet. All rights reserved.
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(242,237,228,0.2)', fontWeight: 300 }}>
            Made with ❤️ for Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
