import React from 'react';
import Link from 'next/link';

export default function Inscription() {
  return (
    <div className="auth-container">
       <div className="auth-card">
         <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <Link href="/">
             <img src="/logo.png" alt="DuniyaPay Logo" height="65" style={{ objectFit: 'contain', cursor: 'pointer' }} />
           </Link>
           <h1 style={{ marginTop: '32px', fontSize: '28px', color: 'var(--text-main)' }}>Créer un compte</h1>
           <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Rejoignez DuniyaPay pour transférer sans frontières.</p>
         </div>
         <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div className="input-group">
             <label>Nom complet</label>
             <input type="text" placeholder="Ex: John Doe" className="auth-input" />
           </div>
           <div className="input-group">
             <label>Email</label>
             <input type="email" placeholder="john@example.com" className="auth-input" />
           </div>
           <div className="input-group">
             <label>Mot de passe</label>
             <input type="password" placeholder="••••••••" className="auth-input" />
           </div>
           <Link href="/dashboard" className="btn btn-primary" style={{ justifyContent: 'center', padding: '16px', marginTop: '16px', textDecoration: 'none', fontSize: '16px' }}>
             S'inscrire et accéder au Dashboard
           </Link>
         </form>
         <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: 'var(--text-muted)' }}>
           Vous avez déjà un compte ?{' '}
           <Link href="/connexion" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>
             Connectez-vous
           </Link>
         </div>
       </div>
    </div>
  );
}
