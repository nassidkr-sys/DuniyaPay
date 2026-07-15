"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Securite() {
  const [use2FA, setUse2FA] = useState(true);
  const [useBiometrics, setUseBiometrics] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', backgroundColor: 'var(--bg-light)' }}>
      <header style={{ padding: '24px', background: 'white', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard/profil" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '18px', margin: '0 auto', fontWeight: 700 }}>Sécurité</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Change Password */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>Mot de passe et PIN</h2>
            
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Mot de passe actuel</label>
              <input type="password" placeholder="••••••••" className="auth-input" />
            </div>
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Nouveau mot de passe</label>
              <input type="password" placeholder="••••••••" className="auth-input" />
            </div>
            
            <button className="btn btn-secondary" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '14px', justifyContent: 'center' }}>
              Mettre à jour le mot de passe
            </button>
            
            <div style={{ height: '1px', background: 'var(--border)', margin: '24px 0' }}></div>
            
            <button className="btn" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '14px', justifyContent: 'center', background: 'var(--bg-light)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
              Modifier le code PIN (4 chiffres)
            </button>
          </div>

          {/* Advanced Security */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>Sécurité avancée</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Authentification à 2 facteurs</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Protégez votre compte via SMS ou Email.</div>
              </div>
              <Toggle checked={use2FA} onChange={() => setUse2FA(!use2FA)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Connexion biométrique</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Utiliser Face ID ou l'empreinte digitale.</div>
              </div>
              <Toggle checked={useBiometrics} onChange={() => setUseBiometrics(!useBiometrics)} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <div 
      onClick={onChange}
      style={{
        width: '44px', height: '24px', borderRadius: '12px', 
        background: checked ? 'var(--primary)' : 'var(--border)',
        position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', background: 'white',
        position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
        transition: 'left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}></div>
    </div>
  );
}
