"use client";
import React, { useState } from 'react';
import Link from 'next/link';

interface Transaction {
  id: number;
  title: string;
  sub: string;
  amount: string;
  isDebit: boolean;
  date: string; // 'Aujourd'hui', 'Hier', etc.
}

const allTransactions: Transaction[] = [
  { id: 1, title: "Transfert Orange Money", sub: "SN • Mariama Ba", amount: "98 400 FCFA", isDebit: true, date: "Aujourd'hui" },
  { id: 2, title: "Rechargement Compte", sub: "Finissant par 4242", amount: "328 000 FCFA", isDebit: false, date: "Aujourd'hui" },
  { id: 3, title: "Envoi bancaire", sub: "FR • Loyer", amount: "426 400 FCFA", isDebit: true, date: "Hier" },
  { id: 4, title: "Transfert Wave", sub: "CI • Koffi", amount: "32 800 FCFA", isDebit: true, date: "Hier" },
  { id: 5, title: "Paiement marchand", sub: "Abonnement DuniyaPay", amount: "19 600 FCFA", isDebit: true, date: "12 Juillet 2026" },
  { id: 6, title: "Réception virement", sub: "Salaire", amount: "1 639 900 FCFA", isDebit: false, date: "12 Juillet 2026" }
];

type FilterType = 'all' | 'in' | 'out';

export default function Historique() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredTransactions = allTransactions.filter(tx => {
    if (filter === 'in') return !tx.isDebit;
    if (filter === 'out') return tx.isDebit;
    return true;
  });

  // Group by date
  const grouped = filteredTransactions.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center' }}>
        <Link href="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '20px', margin: '0 auto', fontWeight: 700 }}>Historique</h1>
        <div style={{ width: '24px' }}></div> {/* Spacer */}
      </header>

      <div style={{ padding: '20px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button 
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'btn btn-primary' : 'btn'} 
            style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '20px', ...(filter !== 'all' ? { background: 'white', color: 'var(--text-main)', border: '1px solid var(--border)' } : {}) }}>
            Tout
          </button>
          <button 
            onClick={() => setFilter('in')}
            className={filter === 'in' ? 'btn btn-primary' : 'btn'} 
            style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '20px', ...(filter !== 'in' ? { background: 'white', color: 'var(--text-main)', border: '1px solid var(--border)' } : {}) }}>
            Entrées
          </button>
          <button 
            onClick={() => setFilter('out')}
            className={filter === 'out' ? 'btn btn-primary' : 'btn'} 
            style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '20px', ...(filter !== 'out' ? { background: 'white', color: 'var(--text-main)', border: '1px solid var(--border)' } : {}) }}>
            Sorties
          </button>
        </div>

        {/* Transactions List */}
        {Object.keys(grouped).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            Aucune transaction trouvée.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(grouped).map(([date, txs]) => (
              <div key={date} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{date}</span>
                {txs.map(tx => (
                  <TxItem 
                    key={tx.id} 
                    title={tx.title} 
                    sub={tx.sub} 
                    amount={(tx.isDebit ? "- " : "+ ") + tx.amount} 
                    isDebit={tx.isDebit} 
                    onClick={() => setSelectedTx(tx)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Centered Modal for Transaction Details (Pro Web Responsive) */}
      {selectedTx && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="modal-pro" style={{ backgroundColor: 'white', width: '100%', maxWidth: '440px', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid var(--border)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>Détails de l'opération</span>
              <button onClick={() => setSelectedTx(null)} style={{ border: 'none', background: 'var(--bg-light)', cursor: 'pointer', fontSize: '20px', fontWeight: 500, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: 'all 0.2s' }}>×</button>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 0', background: 'var(--bg-light)', borderRadius: '20px', border: '1px dashed var(--border)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: selectedTx.isDebit ? '#FEE2E2' : '#DCFCE7', color: selectedTx.isDebit ? '#DC2626' : '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                {selectedTx.isDebit ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Montant total {selectedTx.isDebit ? 'envoyé' : 'reçu'}</span>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px', letterSpacing: '-0.03em' }}>{selectedTx.amount}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '14px' }}>Bénéficiaire</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>{selectedTx.sub}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '14px' }}>Type d'opération</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>{selectedTx.title}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '14px' }}>Référence</span>
                <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, color: 'var(--text-muted)', fontSize: '13px', background: 'var(--bg-light)', padding: '4px 8px', borderRadius: '6px' }}>DP-{selectedTx.id.toString().padStart(8, '0')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '14px' }}>Statut</span>
                <span style={{ backgroundColor: '#DCFCE7', color: '#16A34A', padding: '6px 12px', borderRadius: '12px', fontWeight: 700, fontSize: '12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Complété
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '14px' }}>Frais appliqués</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  0 FCFA (Gratuit)
                </span>
              </div>
            </div>

            <button onClick={() => setSelectedTx(null)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', borderRadius: '16px', border: 'none', cursor: 'pointer', marginTop: '8px', fontSize: '15px' }}>
              Fermer le reçu
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

function TxItem({ title, sub, amount, isDebit = false, onClick }: { title: string, sub: string, amount: string, isDebit?: boolean, onClick?: () => void }) {
  return (
    <div className="tx-item-hover" onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'white', border: '1px solid var(--border)', cursor: 'pointer' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isDebit ? '#FEE2E2' : '#DCFCE7', color: isDebit ? '#DC2626' : '#16A34A' }}>
        {isDebit ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)', marginBottom: '2px' }}>{title}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub}</div>
      </div>
      <div style={{ fontWeight: 800, fontSize: '13px', color: isDebit ? 'var(--text-main)' : 'var(--primary)' }}>
        {amount}
      </div>
    </div>
  );
}

const ArrowUpIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>;
const ArrowDownIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>;
