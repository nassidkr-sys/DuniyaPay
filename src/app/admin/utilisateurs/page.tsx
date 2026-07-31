"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AdminUser {
  id: string;
  full_name: string;
  phone_number: string | null;
  role: string;
  created_at: string;
  wallet_balance: number;
}

export default function UtilisateursPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      // Pour avoir les dates de création, on doit piocher dans auth.users si on y a accès (Admin API)
      // Mais avec le client public on a juste accès à profiles. 
      // On a ajouté role dans profiles ! On va utiliser profiles et left join wallets
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id, full_name, phone_number, role,
          wallets(balance)
        `)
        .order('full_name', { ascending: true });

      if (profiles && !error) {
        const formattedUsers = profiles.map(p => ({
          id: p.id,
          full_name: p.full_name || 'Inconnu',
          phone_number: p.phone_number || 'Non renseigné',
          role: p.role || 'USER',
          created_at: 'N/A', // On ne stocke pas created_at dans profiles actuellement, mais on pourrait.
          wallet_balance: p.wallets?.[0]?.balance || 0
        }));
        setUsers(formattedUsers);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div style={{ color: '#A1A1AA' }}>Chargement des utilisateurs...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ background: '#18181B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#FAFAFA' }}>Tous les Utilisateurs ({users.length})</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272A', color: '#A1A1AA', fontSize: '13px', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Nom</th>
                <th style={{ padding: '12px 16px' }}>Téléphone</th>
                <th style={{ padding: '12px 16px' }}>Rôle</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Solde Portefeuille</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#A1A1AA' }}>Aucun utilisateur trouvé</td>
                </tr>
              ) : users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #27272A' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#27272A', color: '#A1A1AA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ color: '#FAFAFA', fontWeight: 600, fontSize: '14px' }}>{user.full_name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: '#A1A1AA', fontSize: '14px' }}>{user.phone_number}</td>
                  <td style={{ padding: '16px' }}>
                    {user.role === 'ADMIN' ? (
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(34, 211, 238, 0.1)', color: '#22D3EE', border: '1px solid rgba(34, 211, 238, 0.2)' }}>
                        ADMINISTRATEUR
                      </span>
                    ) : (
                      <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, backgroundColor: '#27272A', color: '#A1A1AA' }}>
                        CLIENT
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px', color: '#FAFAFA', fontWeight: 700, textAlign: 'right' }}>
                    {user.wallet_balance.toLocaleString('fr-FR')} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
