"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Inscription() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName) {
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
          }
        }
      });

      if (error) throw error;

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
             <label>Mot de passe</label>
             <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="auth-input" disabled={loading} />
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
