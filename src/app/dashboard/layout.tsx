"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  React.useEffect(() => {
    const loadPic = () => {
      const savedPic = localStorage.getItem('dunyapay_profile_pic');
      if (savedPic) setProfilePic(savedPic);
    };
    loadPic();
    window.addEventListener('profilePicUpdated', loadPic);
    return () => window.removeEventListener('profilePicUpdated', loadPic);
  }, []);
  
  return (
    <div className="dashboard-layout">
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <img src="/logo.png" alt="DuniyaPay Logo" height="40" style={{ objectFit: 'contain' }} />
          </Link>
        </div>
        
        <nav className="sidebar-nav">
          <NavItem href="/dashboard" active={pathname === '/dashboard'} icon={<HomeIcon />} label="Accueil" onClick={() => setSidebarOpen(false)} />
          <NavItem href="/dashboard/envoyer" active={pathname === '/dashboard/envoyer'} icon={<SendIcon />} label="Envoyer" onClick={() => setSidebarOpen(false)} />
          <NavItem href="/dashboard/historique" active={pathname === '/dashboard/historique'} icon={<HistoryIcon />} label="Historique" onClick={() => setSidebarOpen(false)} />
          <NavItem href="/dashboard/profil" active={pathname === '/dashboard/profil'} icon={<UserIcon />} label="Profil" onClick={() => setSidebarOpen(false)} />
        </nav>

        <div className="sidebar-footer">
          <Link href="/connexion" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text-muted)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', overflow: 'hidden' }}>
              {profilePic ? <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'JD'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.2' }}>John Doe</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Déconnexion</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="main-wrapper">
        
        {/* Top Navbar */}
        <header className="top-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </button>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
              {getPageTitle(pathname)}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ThemeToggle />
            <Link href="/dashboard/notifications" style={{ position: 'relative', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
              <BellIcon />
              <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: '#EF4444', border: '2px solid white', borderRadius: '50%' }}></span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content">
          {children}
        </main>
      </div>

    </div>
  );
}

function NavItem({ href, icon, label, active = false, onClick }: { href: string, icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <Link href={href} className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <span>{label}</span>
    </Link>
  );
}

function getPageTitle(pathname: string) {
  if (pathname === '/dashboard') return 'Tableau de bord';
  if (pathname.includes('/envoyer')) return 'Envoyer de l\'argent';
  if (pathname.includes('/historique')) return 'Historique des transactions';
  if (pathname.includes('/profil')) return 'Mon Profil';
  if (pathname.includes('/recharger')) return 'Recharger';
  if (pathname.includes('/convertir')) return 'Convertir';
  if (pathname.includes('/recevoir')) return 'Recevoir';
  return 'DuniyaPay';
}

// Icons
const HomeIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const HistoryIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>;
const UserIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const SendIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const BellIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
