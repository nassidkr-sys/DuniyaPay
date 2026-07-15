"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Envoyer() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', backgroundColor: 'var(--bg-light)' }}>
      <header style={{ padding: '24px', background: 'white', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '20px', margin: '0 auto', fontWeight: 700 }}>Envoyer</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        
        {/* Balance Info */}
        <div style={{ background: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(22, 163, 74, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Solde disponible</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>2 787 500 FCFA</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>À qui envoyez-vous ?</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Numéro de téléphone ou email"
                className="auth-input"
                style={{ width: '100%', paddingLeft: '44px', fontWeight: 500, fontSize: '16px', height: '56px' }}
              />
              <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            
            {/* Quick Contacts */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-light)', border: '1px dashed var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Nouveau</span>
              </div>
              <QuickContact initials="MB" name="Mariama" color="#FCA5A5" onClick={() => setRecipient('Mariama Ba')} />
              <QuickContact initials="AS" name="Alioune" color="#93C5FD" onClick={() => setRecipient('Alioune Sow')} />
              <QuickContact initials="FL" name="Fatou" color="#FCD34D" onClick={() => setRecipient('Fatou L.')} />
            </div>
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Montant à envoyer</label>
            <div style={{ position: 'relative', background: 'white', borderRadius: '16px', border: '1px solid var(--border)', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', outline: 'none', width: '100%' }}
                />
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-muted)', marginLeft: '12px' }}>FCFA</span>
              </div>
              <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                <span>Frais de transfert</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Gratuit</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Motif (Optionnel)</label>
            <input 
              type="text" 
              placeholder="Ex: Loyer, Cadeau..."
              className="auth-input"
              style={{ fontWeight: 500, height: '52px' }}
            />
          </div>

        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '32px', padding: '18px', borderRadius: '16px', fontSize: '16px', justifyContent: 'center', opacity: (!amount || !recipient) ? 0.5 : 1, cursor: (!amount || !recipient) ? 'not-allowed' : 'pointer' }}
          disabled={!amount || !recipient}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          Envoyer maintenant
        </button>

      </div>
    </div>
  );
}

function QuickContact({ initials, name, color, onClick }: { initials: string, name: string, color: string, onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        {initials}
      </div>
      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{name}</span>
    </div>
  );
}
