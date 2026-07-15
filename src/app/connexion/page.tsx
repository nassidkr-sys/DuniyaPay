import React from 'react';
import Link from 'next/link';

export default function Connexion() {
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
               <span style={{ fontSize: '12px', color: 'var(--secondary)', cursor: 'pointer' }}>Mot de passe oublié ?</span>
             </div>
             <input type="password" placeholder="••••••••" className="auth-input" />
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
