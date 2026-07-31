"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Inscription() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName || !formData.phoneNumber) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
          }
        }
      });

      if (error) throw error;

      // Update phone number in the profile table, as the trigger only sets full_name by default
      if (data.user) {
        await supabase.from('profiles').update({ phone_number: formData.phoneNumber }).eq('id', data.user.id);
      }

      toast.success("Compte créé avec succès !");
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

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
         <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div className="input-group">
             <label>Nom complet</label>
             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ex: John Doe" className="auth-input" disabled={loading} />
           </div>
           <div className="input-group">
             <label>Email</label>
             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="auth-input" disabled={loading} />
           </div>
           <div className="input-group">
             <label>Numéro de téléphone</label>
             <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+221 77 123 45 67" className="auth-input" disabled={loading} />
           </div>
           <div className="input-group">
             <label>Mot de passe</label>
             <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
               <input 
                 type={showPassword ? "text" : "password"} 
                 name="password" 
                 value={formData.password} 
                 onChange={handleChange} 
                 placeholder="••••••••" 
                 className="auth-input" 
                 style={{ width: '100%', paddingRight: '44px' }}
                 disabled={loading} 
               />
               <button 
                 type="button" 
                 onClick={(e) => {
                   e.preventDefault();
                   setShowPassword(!showPassword);
                 }}
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
                   padding: '4px',
                   zIndex: 10
                 }}
               >
                 {showPassword ? <EyeOffIcon /> : <EyeIcon />}
               </button>
             </div>
           </div>
           <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center', padding: '16px', marginTop: '16px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}>
             {loading ? 'Création en cours...' : 'S\'inscrire et accéder au Dashboard'}
           </button>
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
