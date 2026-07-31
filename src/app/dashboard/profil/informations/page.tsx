"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function InformationsPersonnelles() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const { data } = await supabase
          .from('profiles')
          .select('full_name, phone_number')
          .eq('id', session.user.id)
          .single();
        
        setFormData({
          full_name: data?.full_name || '',
          phone_number: data?.phone_number || '',
          email: session.user.email || ''
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    setMessage({ type: '', text: '' });

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        phone_number: formData.phone_number
      })
      .eq('id', userId);

    setSaving(false);

    if (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde.' });
    } else {
      setMessage({ type: 'success', text: 'Modifications enregistrées !' });
      // Notify layout to update name if needed
      setTimeout(() => router.refresh(), 1000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', backgroundColor: 'var(--bg-light)' }}>
      <header style={{ padding: '24px', background: 'var(--bg-white)', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard/profil" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '18px', margin: '0 auto', fontWeight: 700 }}>Infos personnelles</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        
        {message.text && (
          <div style={{ 
            padding: '16px', borderRadius: '12px', marginBottom: '24px', fontWeight: 600, fontSize: '14px',
            backgroundColor: message.type === 'success' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: message.type === 'success' ? 'var(--primary)' : '#EF4444'
          }}>
            {message.text}
          </div>
        )}

        <div style={{ background: 'var(--bg-white)', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Nom complet</label>
            <input 
              type="text" 
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="auth-input"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Adresse Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              className="auth-input"
              disabled={true}
              style={{ backgroundColor: 'var(--bg-light)', color: 'var(--text-muted)' }}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>L'e-mail ne peut pas être modifié ici.</span>
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Numéro de téléphone</label>
            <input 
              type="tel" 
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="auth-input"
              disabled={loading}
            />
          </div>

        </div>

        <button 
          onClick={handleSave}
          disabled={saving || loading}
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '32px', padding: '16px', borderRadius: '16px', fontSize: '16px', justifyContent: 'center', opacity: saving || loading ? 0.7 : 1 }}
        >
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>

      </div>
    </div>
  );
}
