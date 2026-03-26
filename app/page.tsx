import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { PropertyCard } from '@/components/PropertyCard';
import { SearchBar } from '@/components/SearchBar';

async function getFeaturedProperties() {
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false })
    .limit(6);
  return data || [];
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5rem 1.5rem 4rem' }}>
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '500px', height: '500px', background: 'rgba(255,92,0,0.08)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-80px', width: '400px', height: '400px', background: 'rgba(255,92,0,0.04)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          {/* Badge */}
          <div className="animate-fade-up-1" style={{ marginBottom: '1.5rem' }}>
            <span className="accent-pill">🇳🇬 Built for Nigeria</span>
          </div>

          {/* Headline */}
          <div className="animate-fade-up-2">
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--cream)',
              maxWidth: '820px',
              marginBottom: '1.5rem',
            }}>
              Find your next home.<br />
              <span style={{ color: 'var(--accent)' }}>No shady agents.</span>
            </h1>

            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1.15rem',
              color: 'rgba(242,237,228,0.55)',
              maxWidth: '520px',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: 300,
            }}>
              Connect directly with verified landlords across all 36 states. No middlemen. No inflated fees. Just your next home.
            </p>
          </div>

          {/* Search */}
          <div className="animate-fade-up-3" style={{ marginBottom: '3rem' }}>
            <SearchBar />
          </div>

          {/* Stats row */}
          <div className="animate-fade-up-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
            {[
              { value: '36', label: 'States covered' },
              { value: '₦0', label: 'To list your property' },
              { value: '100%', label: 'Verified landlords' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="stat-number">{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(242,237,228,0.4)', fontFamily: 'DM Sans, sans-serif', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: '1200px', margin: '0 auto' }} />

      {/* WHY NAIJAJET */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '420px' }}>
            <span className="accent-pill" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Why us</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--cream)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
              Renting in Nigeria should not be this hard.
            </h2>
          </div>

          <div style={{ flex: '1', minWidth: '280px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🔒', title: 'Verified Listings', desc: 'Every property is confirmed by a real owner. No ghost listings, no scams.' },
              { icon: '📞', title: 'Direct Contact', desc: 'Talk straight to the landlord. Cut out the agent entirely.' },
              { icon: '🏷️', title: 'Transparent Pricing', desc: 'No hidden fees or inflated costs. What you see is what you pay.' },
              { icon: '⚡', title: 'Fast & Easy', desc: 'Browse, inquire, and secure a home — all from your phone.' },
            ].map((item) => (
              <div key={item.title} className="card-lift" style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '1.5rem',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '1rem', color: 'var(--cream)', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.45)', lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" style={{ maxWidth: '1200px', margin: '0 auto' }} />

      {/* FEATURED PROPERTIES */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="accent-pill" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Fresh listings</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--cream)', letterSpacing: '-0.02em', margin: 0 }}>
              Featured Properties
            </h2>
          </div>
          <Link href="/listings" style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            borderBottom: '1px solid var(--border-accent)',
            paddingBottom: '2px',
          }}>
            View all →
          </Link>
        </div>

        {featuredProperties.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: 'var(--bg-card)',
            border: '1px dashed rgba(242,237,228,0.1)',
            borderRadius: '16px',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏠</div>
            <p style={{ color: 'rgba(242,237,228,0.4)', fontFamily: 'DM Sans, sans-serif', fontSize: '1rem' }}>
              No listings yet. Be the first to list your property.
            </p>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{
                marginTop: '1.25rem', background: 'var(--accent)', border: 'none', color: 'white',
                padding: '0.6rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 600, cursor: 'pointer',
              }}>
                + List a Property
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* CTA BAND */}
      <section style={{ padding: '0 1.5rem 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1A0E00 0%, #0D0D0D 50%, #1A0800 100%)',
          border: '1px solid rgba(255,92,0,0.2)',
          borderRadius: '20px',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '300px', height: '300px', background: 'rgba(255,92,0,0.06)', borderRadius: '50%', filter: 'blur(80px)' }} />
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--cream)', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
              You have a property?<br />List it free.
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'rgba(242,237,228,0.5)', maxWidth: '400px', lineHeight: 1.7, fontWeight: 300 }}>
              Reach thousands of verified tenants across Nigeria. Free listing, optional verification for ₦5,000.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'var(--accent)', border: 'none', color: 'white',
                padding: '0.85rem 1.75rem', borderRadius: '10px',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.95rem',
                cursor: 'pointer', transition: 'background 0.2s',
              }}>
                List Your Property
              </button>
            </Link>
            <Link href="/listings" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'transparent', border: '1px solid rgba(242,237,228,0.15)', color: 'var(--cream)',
                padding: '0.85rem 1.75rem', borderRadius: '10px',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.95rem',
                cursor: 'pointer',
              }}>
                Browse First
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
