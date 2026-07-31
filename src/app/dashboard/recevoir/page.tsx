"use client";
import React from 'react';
import Link from 'next/link';

export default function Recevoir() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', backgroundColor: 'var(--bg-light)' }}>
      <header style={{ padding: '24px', background: 'var(--bg-white)', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '20px', margin: '0 auto', fontWeight: 700 }}>Recevoir</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '15px', marginBottom: '32px' }}>
          Faites scanner ce QR code ou partagez votre lien pour recevoir de l'argent instantanément.
        </p>

        {/* QR Code Card */}
        <div style={{ background: 'var(--bg-white)', padding: '32px', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '320px', marginBottom: '32px' }}>
          
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '24px', marginBottom: '16px' }}>
            JD
          </div>
          
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>John Doe</h2>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '24px' }}>@johndoe</span>

          {/* Placeholder for actual QR Code Image */}
          <div style={{ width: '200px', height: '200px', background: 'var(--bg-light)', border: '2px dashed var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative' }}>
             {/* Simulating a QR code look with inline SVG blocks */}
             <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
               <rect x="10" y="10" width="20" height="20" rx="2" fill="var(--text-main)" />
               <rect x="70" y="10" width="20" height="20" rx="2" fill="var(--text-main)" />
               <rect x="10" y="70" width="20" height="20" rx="2" fill="var(--text-main)" />
               <rect x="15" y="15" width="10" height="10" fill="white" />
               <rect x="75" y="15" width="10" height="10" fill="white" />
               <rect x="15" y="75" width="10" height="10" fill="white" />
               
               <rect x="40" y="10" width="10" height="10" rx="1" fill="var(--text-main)" />
               <rect x="55" y="25" width="15" height="15" rx="1" fill="var(--text-main)" />
               <rect x="35" y="45" width="30" height="10" rx="1" fill="var(--text-main)" />
               <rect x="10" y="45" width="15" height="15" rx="1" fill="var(--text-main)" />
               <rect x="40" y="70" width="20" height="20" rx="2" fill="var(--text-main)" />
               <rect x="70" y="45" width="20" height="45" rx="2" fill="var(--text-main)" />
             </svg>
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', background: 'var(--bg-white)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <img src="/logo.png" alt="D" style={{ height: '20px' }} />
             </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', gap: '12px' }}>
          <button 
            className="btn btn-secondary" 
            style={{ flex: 1, justifyContent: 'center', padding: '16px', borderRadius: '16px', fontSize: '15px' }}
            onClick={(e) => {
              const target = e.currentTarget;
              const original = target.innerHTML;
              target.innerHTML = '<span style="display:flex;align-items:center;gap:8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Copié !</span>';
              setTimeout(() => { target.innerHTML = original; }, 2000);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Copier le lien
          </button>
          
          <button 
            className="btn btn-primary" 
            style={{ flex: 1, justifyContent: 'center', padding: '16px', borderRadius: '16px', fontSize: '15px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            Partager
          </button>
        </div>

      </div>
    </div>
  );
}
