import React from 'react';

export default function AdminConnexion() {
  return (
    <div className="auth-container" style={{ background: '#0F1117' }}>
       <div className="auth-card" style={{ background: '#1A1D27', border: '1px solid #2E3341' }}>
         <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <img src="/logo.png" alt="DuniyaPay Logo" height="65" style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
           <h1 style={{ marginTop: '32px', fontSize: '24px', color: 'white' }}>Portail Administrateur</h1>
           <p style={{ color: '#8B95A5', marginTop: '8px' }}>Accès restreint au personnel autorisé.</p>
         </div>
         <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div className="input-group">
             <label style={{ color: 'white' }}>Email Pro</label>
             <input type="email" placeholder="admin@dunyapay.com" className="auth-input" style={{ background: '#0F1117', color: 'white', borderColor: '#2E3341' }} />
           </div>
           <div className="input-group">
             <label style={{ color: 'white' }}>Mot de passe</label>
             <input type="password" placeholder="••••••••" className="auth-input" style={{ background: '#0F1117', color: 'white', borderColor: '#2E3341' }} />
           </div>
           <button type="button" className="btn btn-secondary" style={{ justifyContent: 'center', padding: '16px', marginTop: '16px', fontSize: '16px' }}>
             Connexion sécurisée
           </button>
         </form>
       </div>
    </div>
  );
}
