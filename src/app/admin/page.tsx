"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface GlobalStats {
  totalUsers: number;
  totalVolume: number;
  txCount: number;
}

interface AdminTx {
  id: string;
  amount: number;
  type: string;
  created_at: string;
  profiles: { full_name: string } | null;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<GlobalStats>({ totalUsers: 0, totalVolume: 0, txCount: 0 });
  const [recentTxs, setRecentTxs] = useState<AdminTx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      // 1. Total Users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // 2. Total Volume (Sum of all wallets)
      const { data: wallets } = await supabase.from('wallets').select('balance');
      const totalVolume = wallets?.reduce((acc, w) => acc + Number(w.balance), 0) || 0;

      // 3. Transactions count today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: txCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      setStats({ totalUsers: userCount || 0, totalVolume, txCount: txCount || 0 });

      // 4. Recent Transactions
      const { data: txs } = await supabase
        .from('transactions')
        .select(`
          id, amount, type, created_at,
          profiles ( full_name )
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (txs) {
        setRecentTxs(txs as unknown as AdminTx[]);
      }
      setLoading(false);
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div style={{ color: '#A1A1AA' }}>Chargement des statistiques...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <StatCard title="Utilisateurs Inscrits" value={stats.totalUsers.toString()} icon={<UsersIcon />} color="#6C5CE7" />
        <StatCard title="Volume Total (FCFA)" value={stats.totalVolume.toLocaleString('fr-FR')} icon={<WalletIcon />} color="#10B981" />
        <StatCard title="Transactions Aujourd'hui" value={stats.txCount.toString()} icon={<TrendingIcon />} color="#3B82F6" />
      </div>

      <div style={{ background: '#18181B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 24px 0', color: '#FAFAFA' }}>Flux d'activité récent</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272A', color: '#A1A1AA', fontSize: '13px', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Utilisateur</th>
                <th style={{ padding: '12px 16px' }}>Type</th>
                <th style={{ padding: '12px 16px' }}>Montant</th>
                <th style={{ padding: '12px 16px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTxs.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#A1A1AA' }}>Aucune transaction récente</td>
                </tr>
              ) : recentTxs.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #27272A' }}>
                  <td style={{ padding: '16px', color: '#FAFAFA', fontWeight: 500 }}>{tx.profiles?.full_name || 'Inconnu'}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 700,
                      backgroundColor: tx.type === 'DEPOSIT' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: tx.type === 'DEPOSIT' ? '#10B981' : '#EF4444'
                    }}>
                      {tx.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#FAFAFA', fontWeight: 700 }}>{tx.amount.toLocaleString('fr-FR')} FCFA</td>
                  <td style={{ padding: '16px', color: '#A1A1AA', fontSize: '13px' }}>{new Date(tx.created_at).toLocaleString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div style={{ background: '#18181B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <div style={{ color: '#A1A1AA', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{title}</div>
        <div style={{ color: '#FAFAFA', fontSize: '28px', fontWeight: 800 }}>{value}</div>
      </div>
    </div>
  );
}

// Icons
const UsersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const WalletIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const TrendingIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
