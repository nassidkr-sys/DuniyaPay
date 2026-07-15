import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#F4F7FC', minHeight: '100vh', fontFamily: 'var(--font-inter), sans-serif', overflowX: 'hidden' }}>
      
      {/* Navbar */}
      <nav className="navbar" style={{ background: 'rgba(244, 247, 252, 0.8)', borderBottom: 'none' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="DuniyaPay Logo" height="55" style={{ objectFit: 'contain' }} />
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#features" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Home</a>
          <a href="#features" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Features</a>
          <a href="#valeurs" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Help</a>
          <a href="#valeurs" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Rate & Fees</a>
          <a href="#footer" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Contact Us</a>
        </div>
        <div>
          <Link href="/connexion" className="btn btn-secondary" style={{ textDecoration: 'none', borderRadius: '9999px', padding: '12px 28px', backgroundColor: 'var(--secondary)' }}>
            Login <svg style={{ marginLeft: '4px' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '150px', paddingBottom: '80px', paddingLeft: '5%', paddingRight: '5%' }}>
        
        {/* Trusted Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '9999px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)', border: '1px solid var(--border)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '-4px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#E2E8F0', border: '2px solid white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>👤</div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#CBD5E1', border: '2px solid white', marginLeft: '-8px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>👤</div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#94A3B8', border: '2px solid white', marginLeft: '-8px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>👤</div>
          </div>
          <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>Trusted by 21,000+ people</span>
        </div>

        {/* Hero Headline */}
        <h1 style={{ fontSize: '3.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', maxWidth: '800px', marginBottom: '20px', lineHeight: '1.15' }}>
          Transfer Money <br />at <span style={{ color: 'var(--secondary)' }}>0% Fees</span>
        </h1>

        {/* Hero Subtitle */}
        <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '600px', marginBottom: '32px', lineHeight: '1.6' }}>
          DuniyaPay offers Industry-Leading <strong>Exchange Rates without any Hidden Fees</strong>. Get more FCFA for every hard-earned Euro.
        </p>

        {/* CTA Button */}
        <Link href="/inscription" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem', borderRadius: '9999px', textDecoration: 'none', backgroundColor: 'var(--secondary)', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)' }}>
          Register <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>

        {/* Visual Showcase (Dribbble Style with floating cards) */}
        <div style={{ marginTop: '64px', position: 'relative', width: '100%', maxWidth: '650px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Main Mockup Image */}
          <div style={{ width: '100%', maxWidth: '400px', zIndex: 2, position: 'relative' }}>
            <img 
              src="/hero_phone.png" 
              alt="DuniyaPay App Mockup" 
              style={{ width: '100%', height: 'auto', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }} 
            />
          </div>

          {/* Left Floating Card: EUR */}
          <div className="floating-card-dribbble" style={{ position: 'absolute', left: '-60px', top: '35%', backgroundColor: 'white', borderRadius: '20px', padding: '20px', border: '1px solid var(--border)', boxShadow: '0 15px 30px rgba(0,0,0,0.06)', zIndex: 3, display: 'flex', gap: '16px', alignItems: 'center', minWidth: '220px', textAlign: 'left' }}>
            <div style={{ fontSize: '32px' }}>🇪🇺</div>
            <div>
              <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>EUR (€)</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>€ 2,000</div>
              <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, marginTop: '4px' }}>Taux : 1€ = 655.957 FCFA</div>
            </div>
          </div>

          {/* Right Floating Card: FCFA */}
          <div className="floating-card-dribbble" style={{ position: 'absolute', right: '-60px', bottom: '25%', backgroundColor: 'white', borderRadius: '20px', padding: '20px', border: '1px solid var(--border)', boxShadow: '0 15px 30px rgba(0,0,0,0.06)', zIndex: 3, display: 'flex', gap: '16px', alignItems: 'center', minWidth: '220px', textAlign: 'left' }}>
            <div style={{ fontSize: '32px' }}>🌍</div>
            <div>
              <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>XOF (FCFA)</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>1 311 914 F</div>
              <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, marginTop: '4px' }}>Frais : 0 FCFA (Garanti)</div>
            </div>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer id="footer" className="footer">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', borderBottom: '1px solid #2E3341', paddingBottom: '40px', marginBottom: '32px', gap: '32px' }}>
          <div className="logo" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="DuniyaPay Logo" height="60" style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ color: 'white', fontWeight: 700 }}>Liens utiles</span>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Conditions Générales</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Politique de Confidentialité</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ color: 'white', fontWeight: 700 }}>Contact</span>
              <span>support@dunyapay.com</span>
              <span>+33 1 00 00 00 00</span>
            </div>
          </div>
        </div>
        <div className="flex-between" style={{ fontSize: '14px' }}>
          <span>© 2026 DuniyaPay. Tous droits réservés.</span>
          <Link href="/admin/connexion" style={{ color: 'inherit', textDecoration: 'none' }}>Accès Admin</Link>
        </div>
      </footer>

      {/* CSS Styles specifics to floating animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @media(max-width: 768px) {
          .floating-card-dribbble {
            position: static !important;
            margin-top: 16px;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}
