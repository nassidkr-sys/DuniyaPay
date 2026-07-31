"use client";
import React, { useState } from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { toast } from 'sonner';

export default function Envoyer() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSend = () => {
    toast.success(`Transfert de ${amount} FCFA vers ${recipient} réussi !`);
    setAmount('');
    setRecipient('');
  };

  return (
    <PageWrapper className="page-content" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        
        {/* Balance Info */}
        <div style={{ background: 'var(--bg-white)', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(22, 163, 74, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>Solde disponible</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>2 787 500 FCFA</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '15px', color: 'var(--text-main)' }}>À qui envoyez-vous ?</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Numéro de téléphone ou email"
                className="auth-input"
                style={{ width: '100%', paddingLeft: '48px', fontWeight: 500, fontSize: '16px', height: '60px', backgroundColor: 'var(--bg-white)' }}
              />
              <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            
            {/* Quick Contacts */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px', overflowX: 'auto', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--bg-light)', border: '1px dashed var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Nouveau</span>
              </div>
              <QuickContact initials="MB" name="Mariama" color="#FCA5A5" onClick={() => setRecipient('Mariama Ba')} />
              <QuickContact initials="AS" name="Alioune" color="#93C5FD" onClick={() => setRecipient('Alioune Sow')} />
              <QuickContact initials="FL" name="Fatou" color="#FCD34D" onClick={() => setRecipient('Fatou L.')} />
            </div>
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '15px', color: 'var(--text-main)' }}>Montant à envoyer</label>
            <div style={{ position: 'relative', background: 'var(--bg-white)', borderRadius: '16px', border: '1px solid var(--border)', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '36px', fontWeight: 800, color: 'var(--text-main)', outline: 'none', width: '100%' }}
                />
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-muted)', marginLeft: '12px' }}>FCFA</span>
              </div>
              <div style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span>Frais de transfert</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Gratuit</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '15px', color: 'var(--text-main)' }}>Motif (Optionnel)</label>
            <input 
              type="text" 
              placeholder="Ex: Loyer, Cadeau..."
              className="auth-input"
              style={{ fontWeight: 500, height: '60px', backgroundColor: 'var(--bg-white)' }}
            />
          </div>

        </div>

        <button 
          onClick={handleSend}
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '40px', padding: '20px', borderRadius: '16px', fontSize: '18px', justifyContent: 'center', opacity: (!amount || !recipient) ? 0.5 : 1, cursor: (!amount || !recipient) ? 'not-allowed' : 'pointer' }}
          disabled={!amount || !recipient}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          Envoyer maintenant
        </button>

      </div>
    </PageWrapper>
  );
}

function QuickContact({ initials, name, color, onClick }: { initials: string, name: string, color: string, onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        {initials}
      </div>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{name}</span>
    </div>
  );
}
