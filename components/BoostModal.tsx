'use client';

import { useState } from 'react';

interface BoostModalProps {
  property: { id: string; title: string };
  onClose: () => void;
}

const BOOST_PLANS = [
  { days: 7, price: 3000, label: '7 days', popular: false },
  { days: 30, price: 8000, label: '30 days', popular: true },
  { days: 90, price: 18000, label: '90 days', popular: false },
];

export function BoostModal({ property, onClose }: BoostModalProps) {
  const [selected, setSelected] = useState(BOOST_PLANS[1]);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);

    // Load Paystack inline script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    document.body.appendChild(script);

    script.onload = () => {
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_key_here',
        email: 'user@example.com', // replace with auth user email
        amount: selected.price * 100, // Paystack uses kobo
        currency: 'NGN',
        ref: `BOOST-${property.id}-${Date.now()}`,
        metadata: {
          property_id: property.id,
          boost_days: selected.days,
          custom_fields: [
            { display_name: 'Property', variable_name: 'property_title', value: property.title },
            { display_name: 'Boost Duration', variable_name: 'boost_days', value: `${selected.days} days` },
          ]
        },
        callback: async (response: any) => {
          // Payment successful — update property in Supabase
          const { supabase } = await import('@/lib/supabase');
          const featuredUntil = new Date();
          featuredUntil.setDate(featuredUntil.getDate() + selected.days);

          await supabase.from('properties').update({
            is_featured: true,
            featured_until: featuredUntil.toISOString(),
          }).eq('id', property.id);

          // Record transaction
          await supabase.from('transactions').insert({
            property_id: property.id,
            type: 'boost',
            amount: selected.price,
            reference: response.reference,
            status: 'success',
          });

          alert(`✅ Listing boosted for ${selected.days} days!`);
          onClose();
        },
        onClose: () => { setLoading(false); }
      });
      handler.openIframe();
    };
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem',
    }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '18px', padding: '2rem', maxWidth: '420px', width: '100%',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'rgba(242,237,228,0.4)', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>

        <span className="accent-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>⚡ Boost</span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
          Promote this listing
        </h2>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(242,237,228,0.45)', marginBottom: '1.5rem', fontWeight: 300 }}>
          "{property.title}" — Get more views, appear at the top of search results.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {BOOST_PLANS.map((plan) => (
            <button key={plan.days} onClick={() => setSelected(plan)} style={{
              background: selected.days === plan.days ? 'var(--accent-muted)' : 'rgba(242,237,228,0.03)',
              border: `1px solid ${selected.days === plan.days ? 'var(--border-accent)' : 'var(--border)'}`,
              borderRadius: '12px', padding: '1rem 1.25rem', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: 'var(--cream)' }}>{plan.label}</div>
                {plan.popular && <span style={{ background: 'var(--accent)', color: 'white', fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '999px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>Popular</span>}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: selected.days === plan.days ? 'var(--accent)' : 'var(--cream)' }}>
                ₦{plan.price.toLocaleString()}
              </div>
            </button>
          ))}
        </div>

        <button onClick={handlePay} disabled={loading} style={{
          width: '100%', background: 'var(--accent)', border: 'none', color: 'white',
          padding: '0.9rem', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif',
          fontWeight: 600, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Opening payment...' : `Pay ₦${selected.price.toLocaleString()} →`}
        </button>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(242,237,228,0.25)', textAlign: 'center', marginTop: '0.75rem' }}>
          Secured by Paystack · NGN only
        </p>
      </div>
    </div>
  );
}
