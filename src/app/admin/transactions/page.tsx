"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AdminTx {
  id: string;
  amount: number;
  type: string;
  created_at: string;
  profiles: { full_name: string } | null;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<AdminTx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: txs, error } = await supabase
        .from('transactions')
        .select(`
          id, amount, type, created_at,
          profiles ( full_name )
        `)
        .order('created_at', { ascending: false })
        .limit(100); // Pour le moment on limite aux 100 dernières
      
      if (txs && !error) {
        setTransactions(txs as unknown as AdminTx[]);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div style={{ color: '#A1A1AA' }}>Chargement de l'historique...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ background: '#18181B', borderRadius: '16px', border: '1px solid #27272A', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#FAFAFA' }}>Toutes les Transactions</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272A', color: '#A1A1AA', fontSize: '13px', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Référence</th>
                <th style={{ padding: '12px 16px' }}>Utilisateur</th>
                <th style={{ padding: '12px 16px' }}>Type</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Montant</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#A1A1AA' }}>Aucune transaction enregistrée</td>
                </tr>
              ) : transactions.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #27272A' }}>
                  <td style={{ padding: '16px', fontFamily: 'monospace', color: '#6C5CE7', fontSize: '12px' }}>
                    DP-{tx.id.toString().substring(0, 8).toUpperCase()}
                  </td>
                  <td style={{ padding: '16px', color: '#FAFAFA', fontWeight: 500, fontSize: '14px' }}>
                    {tx.profiles?.full_name || 'Inconnu'}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700,
                      backgroundColor: tx.type === 'DEPOSIT' || tx.type === 'TRANSFER_IN' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: tx.type === 'DEPOSIT' || tx.type === 'TRANSFER_IN' ? '#10B981' : '#EF4444',
                      border: tx.type === 'DEPOSIT' || tx.type === 'TRANSFER_IN' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                      {tx.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#FAFAFA', fontWeight: 700, textAlign: 'right' }}>
                    {tx.amount.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td style={{ padding: '16px', color: '#A1A1AA', fontSize: '13px', textAlign: 'right' }}>
                    {new Date(tx.created_at).toLocaleString('fr-FR')}
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
