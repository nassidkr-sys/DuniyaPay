"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Recharger() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-white)', display: 'flex', alignItems: 'center' }}>
        <Link href="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '20px', margin: '0 auto', fontWeight: 700 }}>Recharger</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-main)' }}>Ajouter des fonds</h2>
        
        <div className="input-group" style={{ marginBottom: '24px' }}>
          <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-muted)' }}>Méthode de rechargement</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <div 
              onClick={() => setMethod('card')}
              style={{ padding: '16px', borderRadius: '16px', border: `2px solid ${method === 'card' ? 'var(--primary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', background: method === 'card' ? 'rgba(22, 163, 74, 0.05)' : 'var(--bg-white)' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--bg-light)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-main)' }}>Carte Bancaire</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Instantané • 0% de frais</div>
              </div>
            </div>
            
            <div 
              onClick={() => setMethod('mobile')}
              style={{ padding: '16px', borderRadius: '16px', border: `2px solid ${method === 'mobile' ? 'var(--primary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', background: method === 'mobile' ? 'rgba(22, 163, 74, 0.05)' : 'var(--bg-white)' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--bg-light)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-main)' }}>Mobile Money</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Wave, Orange, MTN...</div>
              </div>
            </div>
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: '32px' }}>
          <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-muted)' }}>Montant (FCFA)</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="number" 
              className="auth-input" 
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', fontSize: '24px', fontWeight: 800, padding: '16px 20px', borderRadius: '16px' }}
            />
            <span style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>XOF</span>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '16px', borderRadius: '16px', justifyContent: 'center' }}>
          Confirmer le rechargement
        </button>
      </div>
    </div>
  );
}
