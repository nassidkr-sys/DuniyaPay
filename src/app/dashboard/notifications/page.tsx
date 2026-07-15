import React from 'react';
import Link from 'next/link';

export default function Notifications() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center' }}>
        <Link href="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '20px', margin: '0 auto' }}>Notifications</h1>
        <div style={{ width: '24px' }}></div> {/* Spacer */}
      </header>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <NotifItem 
          title="Virement Orange Money validé" 
          desc="Votre transfert de 98 400 FCFA vers Mariama Ba a été complété avec succès." 
          time="Il y a 2h" 
          isNew 
        />
        <NotifItem 
          title="Tentative de connexion suspecte" 
          desc="Une tentative de connexion a été détectée depuis un nouvel appareil à Paris, France." 
          time="Il y a 1 jour" 
        />
        <NotifItem 
          title="Taux de change avantageux" 
          desc="Profitez dès aujourd'hui d'un taux garanti de 1 EUR = 655.957 FCFA pour tous vos envois." 
          time="Il y a 3 jours" 
        />
      </div>
    </div>
  );
}

function NotifItem({ title, desc, time, isNew = false }: { title: string, desc: string, time: string, isNew?: boolean }) {
  return (
    <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--border)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {isNew && (
        <span style={{ position: 'absolute', top: '16px', right: '16px', width: '8px', height: '8px', backgroundColor: 'var(--secondary)', borderRadius: '50%' }}></span>
      )}
      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)', paddingRight: '24px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{desc}</div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>{time}</div>
    </div>
  );
}
