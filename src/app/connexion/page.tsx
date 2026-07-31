"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Connexion() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
       <div className="auth-card">
         <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <Link href="/">
             <img src="/logo.png" alt="DuniyaPay Logo" height="65" style={{ objectFit: 'contain', cursor: 'pointer' }} />
           </Link>
           <h1 style={{ marginTop: '32px', fontSize: '28px', color: 'var(--text-main)' }}>Connexion Client</h1>
           <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Accédez à votre portefeuille DuniyaPay.</p>
         </div>
         <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div className="input-group">
             <label>Email</label>
             <input type="email" placeholder="john@example.com" className="auth-input" />
           </div>
           <div className="input-group">
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <label>Mot de passe</label>
               <span style={{ fontSize: '12px', color: 'var(--secondary)', cursor: 'pointer', fontWeight: 500 }}>Mot de passe oublié ?</span>
             </div>
             <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
               <input 
                 type={showPassword ? "text" : "password"} 
                 placeholder="••••••••" 
                 className="auth-input" 
                 style={{ width: '100%', paddingRight: '40px' }} 
               />
               <button 
                 type="button" 
                 onClick={() => setShowPassword(!showPassword)}
                 style={{
                   position: 'absolute',
                   right: '12px',
                   background: 'none',
                   border: 'none',
                   cursor: 'pointer',
                   color: 'var(--text-muted)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   padding: 0
                 }}
               >
                 {showPassword ? <EyeOffIcon /> : <EyeIcon />}
               </button>
             </div>
           </div>
           <Link href="/dashboard" className="btn btn-primary" style={{ justifyContent: 'center', padding: '16px', marginTop: '16px', textDecoration: 'none', fontSize: '16px' }}>
             Se connecter
           </Link>
         </form>
         <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: 'var(--text-muted)' }}>
           Nouveau sur DuniyaPay ?{' '}
           <Link href="/inscription" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>
             Créez un compte
           </Link>
         </div>
       </div>
    </div>
  );
}

// Icons
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);
