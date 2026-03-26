export default function About() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'rgba(255,92,0,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <span className="accent-pill" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Our story</span>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--cream)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          We got tired of<br /><span style={{ color: 'var(--accent)' }}>shady agents.</span>
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.15rem', color: 'rgba(242,237,228,0.6)', lineHeight: 1.8, fontWeight: 300, marginBottom: '3rem' }}>
          Renting in Nigeria has always been painful. Agents collect 10–15% commission on top of already inflated rents, ghost listings waste your time, and there is no transparency anywhere in the process. NaijaLet was built to fix that.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            { number: '36', label: 'States', desc: 'Coverage across all of Nigeria from day one' },
            { number: '₦0', label: 'To list', desc: 'Free listings for every landlord, always' },
            { number: '5%', label: 'Max fee', desc: 'Our success fee vs agent\'s 10–15%' },
            { number: '100%', label: 'Direct', desc: 'Talk straight to the owner, no middlemen' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.25rem' }}>{stat.number}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '1rem', color: 'var(--cream)', marginBottom: '0.5rem' }}>{stat.label}</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.4)', lineHeight: 1.6, fontWeight: 300 }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.8rem', color: 'var(--cream)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Our mission</h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: 'rgba(242,237,228,0.55)', lineHeight: 1.8, fontWeight: 300 }}>
            To make finding and renting a home in Nigeria as simple, transparent, and affordable as possible — for both tenants and landlords. We believe the renting process should work for the people involved, not the middlemen.
          </p>
        </div>
      </div>
    </div>
  );
}
