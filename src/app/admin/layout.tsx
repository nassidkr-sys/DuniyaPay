"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthGuard } from '@/components/admin-auth-guard';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState<string>('Chargement...');

  React.useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();
        
        if (data && !error) {
          setAdminName(data.full_name);
        } else {
          setAdminName('Administrateur');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push('/admin/connexion');
  };
  
  return (
    <AdminAuthGuard>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#09090B', color: '#FAFAFA' }}>
        
        {/* Mobile Sidebar Overlay */}
        <div 
          className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div style={{ padding: '24px', borderBottom: '1px solid #27272A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href="/admin" onClick={() => setSidebarOpen(false)}>
              <img src="/logo.png" alt="DuniyaPay Logo" height="40" style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </Link>
          </div>
          
          <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
            <NavItem href="/admin" active={pathname === '/admin'} icon={<DashboardIcon />} label="Aperçu Global" onClick={() => setSidebarOpen(false)} />
            <NavItem href="/admin/utilisateurs" active={pathname.includes('/admin/utilisateurs')} icon={<UsersIcon />} label="Utilisateurs" onClick={() => setSidebarOpen(false)} />
            <NavItem href="/admin/transactions" active={pathname.includes('/admin/transactions')} icon={<HistoryIcon />} label="Transactions" onClick={() => setSidebarOpen(false)} />
          </nav>

          <div style={{ padding: '24px', borderTop: '1px solid #27272A' }}>
            <a href="#" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#A1A1AA' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(108, 92, 231, 0.1)', color: '#6C5CE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', border: '1px solid rgba(108, 92, 231, 0.2)' }}>
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#FAFAFA', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminName}</span>
                <span style={{ fontSize: '12px', color: '#6C5CE7', fontWeight: 600 }}>Super Admin</span>
              </div>
            </a>
          </div>
        </aside>

        {/* Main Content Wrapper */}
        <div className="admin-main-wrapper">
          
          {/* Top Navbar */}
          <header className="admin-top-navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>
                <MenuIcon />
              </button>
              <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#FAFAFA' }}>
                {getPageTitle(pathname)}
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ padding: '6px 12px', backgroundColor: 'rgba(34, 211, 238, 0.1)', color: '#22D3EE', borderRadius: '20px', fontSize: '12px', fontWeight: 700, border: '1px solid rgba(34, 211, 238, 0.2)' }}>
                 Mode Admin
               </div>
            </div>
          </header>

          {/* Page Content */}
          <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {children}
          </main>
        </div>

      </div>
    </AdminAuthGuard>
  );
}

function NavItem({ href, icon, label, active = false, onClick }: { href: string, icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} style={{ 
      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none',
      backgroundColor: active ? 'rgba(108, 92, 231, 0.1)' : 'transparent',
      color: active ? '#FAFAFA' : '#A1A1AA',
      fontWeight: active ? 600 : 500,
      transition: 'all 0.2s',
      border: active ? '1px solid rgba(108, 92, 231, 0.2)' : '1px solid transparent'
    }}>
      <div style={{ color: active ? '#6C5CE7' : '#A1A1AA' }}>{icon}</div>
      <span>{label}</span>
    </Link>
  );
}

function getPageTitle(pathname: string) {
  if (pathname === '/admin') return 'Aperçu Global';
  if (pathname.includes('/admin/utilisateurs')) return 'Gestion des Utilisateurs';
  if (pathname.includes('/admin/transactions')) return 'Historique des Transactions';
  return 'Administration';
}

// Icons
const DashboardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const HistoryIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>;
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
