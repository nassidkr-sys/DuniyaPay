"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AdminConnexion() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      // 1. Authenticate user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Utilisateur non trouvé");

      // 2. Check if user has ADMIN role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();
      
      if (profileError) throw profileError;

      if (profileData.role !== 'ADMIN') {
        // Not an admin: log them out and show error
        await supabase.auth.signOut();
        throw new Error("Accès refusé : vous n'avez pas les droits d'administration.");
      }

      toast.success("Connexion sécurisée établie");
      router.push('/admin');

    } catch (error: any) {
      toast.error(error.message || "Identifiants incorrects ou accès refusé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ background: '#0F1117' }}>
       <div className="auth-card" style={{ background: '#1A1D27', border: '1px solid #2E3341' }}>
         <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <Link href="/">
             <img src="/logo.png" alt="DuniyaPay Logo" height="65" style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', cursor: 'pointer' }} />
           </Link>
           <h1 style={{ marginTop: '32px', fontSize: '24px', color: 'white' }}>Portail Administrateur</h1>
           <p style={{ color: '#8B95A5', marginTop: '8px' }}>Accès restreint au personnel autorisé.</p>
         </div>
         <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div className="input-group">
             <label style={{ color: 'white' }}>Email Pro</label>
             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@dunyapay.com" className="auth-input" style={{ background: '#0F1117', color: 'white', borderColor: '#2E3341' }} disabled={loading} />
           </div>
           <div className="input-group">
             <label style={{ color: 'white' }}>Mot de passe</label>
             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="auth-input" style={{ background: '#0F1117', color: 'white', borderColor: '#2E3341' }} disabled={loading} />
           </div>
           <button type="submit" disabled={loading} className="btn btn-secondary" style={{ justifyContent: 'center', padding: '16px', marginTop: '16px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}>
             {loading ? 'Vérification...' : 'Connexion sécurisée'}
           </button>
         </form>
       </div>
    </div>
  );
}
