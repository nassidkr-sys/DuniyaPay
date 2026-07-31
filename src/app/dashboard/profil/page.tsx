"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageWrapper } from '@/components/page-wrapper';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Profil() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [previewPic, setPreviewPic] = useState<string | null>(null);

  React.useEffect(() => {
    const savedPic = localStorage.getItem('dunyapay_profile_pic');
    if (savedPic) {
      setProfilePic(savedPic);
      setPreviewPic(savedPic);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewPic(base64String);
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewPic) {
      setProfilePic(previewPic);
      localStorage.setItem('dunyapay_profile_pic', previewPic);
      window.dispatchEvent(new Event('profilePicUpdated'));
    }
    setHasUnsavedChanges(false);
    toast.success("Modifications enregistrées !");
  };

  return (
    <PageWrapper className="page-content" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        
        {/* Profile Picture Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '36px', overflow: 'hidden', border: '4px solid var(--bg-white)', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              {previewPic ? (
                <img src={previewPic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                "JD"
              )}
            </div>
            
            {/* Upload Button */}
            <label style={{ position: 'absolute', bottom: 0, right: 0, width: '36px', height: '36px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', border: '3px solid var(--bg-white)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginTop: '16px', marginBottom: '4px' }}>John Doe</h2>
          <span style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: 600 }}>john.doe@example.com</span>
        </div>

        {/* Settings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <SettingCard 
            icon={<UserIcon />}
            title="Informations personnelles"
            subtitle="Gérez vos données et votre identité"
            href="/dashboard/profil/informations"
          />

          <SettingCard 
            icon={<LockIcon />}
            title="Sécurité et mot de passe"
            subtitle="Double authentification, code PIN"
            href="/dashboard/profil/securite"
          />
          
        </div>

        {hasUnsavedChanges && (
          <button 
            onClick={handleSave}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '32px', padding: '16px', borderRadius: '16px', fontSize: '16px', justifyContent: 'center' }}
          >
            Enregistrer les modifications
          </button>
        )}

        <button 
          onClick={async () => {
            await supabase.auth.signOut();
            toast.success("Déconnexion réussie");
            router.push('/connexion');
          }}
          style={{ width: '100%', marginTop: hasUnsavedChanges ? '16px' : '40px', padding: '18px', borderRadius: '16px', background: '#FEE2E2', color: '#DC2626', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.background = '#FCA5A5'}
          onMouseOut={(e) => e.currentTarget.style.background = '#FEE2E2'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Se déconnecter
        </button>

      </div>
    </PageWrapper>
  );
}

function SettingCard({ icon, title, subtitle, href }: { icon: React.ReactNode, title: string, subtitle: string, href?: string }) {
  const content = (
    <div style={{ background: 'var(--bg-white)', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', border: '1px solid var(--border)', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', transition: 'all 0.2s' }}

      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.06)'; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.02)'; }}
    >
      <div style={{ width: '56px', height: '56px', background: 'var(--bg-light)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{subtitle}</div>
      </div>
      <div style={{ color: 'var(--text-muted)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </div>
  );
  if (href) {
    return <Link href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>{content}</Link>;
  }
  return content;
}

// Icons
const UserIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LockIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
