"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Transaction {
  id: number;
  title: string;
  sub: string;
  amount: string;
  isDebit: boolean;
}

export default function Dashboard() {
  const [balance, setBalance] = useState<number>(2787500);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [greeting, setGreeting] = useState<string>('Bonjour');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 18 ? 'Bonjour' : 'Bonsoir');

    // Initialiser le solde s'il n'existe pas
    if (!localStorage.getItem('dunyapay_balance')) {
      localStorage.setItem('dunyapay_balance', '2787500');
    }
    setBalance(Number(localStorage.getItem('dunyapay_balance')));

    // Initialiser l'historique s'il n'existe pas
    if (!localStorage.getItem('dunyapay_transactions')) {
      const defaultTx = [
        { id: 1, title: "Transfert Orange Money", sub: "SN • Mariama Ba", amount: "- 98 400 FCFA", isDebit: true },
        { id: 2, title: "Rechargement Compte", sub: "Finissant par 4242", amount: "+ 328 000 FCFA", isDebit: false },
        { id: 3, title: "Envoi bancaire", sub: "FR • Loyer", amount: "- 426 400 FCFA", isDebit: true }
      ];
      localStorage.setItem('dunyapay_transactions', JSON.stringify(defaultTx));
    }
    setTransactions(JSON.parse(localStorage.getItem('dunyapay_transactions')!));
  }, []);

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', minHeight: '100%' }}>
      
      {/* Mini Profile Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        {/* Logo DuniyaPay à gauche */}
        <Link href="/">
          <img src="/logo.png" alt="DuniyaPay Logo" height="48" style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        
        {/* Infos de profil et notification à droite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/dashboard/notifications" style={{ position: 'relative', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
            <BellIcon />
            <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: '#EF4444', border: '2px solid white', borderRadius: '50%' }}></span>
          </Link>
          <Link href="/dashboard/profil" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', lineHeight: '1.2' }}>John Doe</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>JD</div>
          </Link>
        </div>
      </header>

      {/* Greeting */}
      <div style={{ marginBottom: '8px', marginTop: '4px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
          {greeting}, John
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Prêt à gérer vos finances aujourd'hui ?</p>
      </div>

      {/* Balance Card XOF */}
      <div className="balance-card-full" style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, var(--secondary), var(--secondary-hover))', color: 'white', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', opacity: 0.9 }}>Solde de votre portefeuille</span>
          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '8px', fontWeight: 600 }}>FCFA</span>
        </div>
        <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          {balance.toLocaleString('fr-FR')} FCFA
        </div>
        <p style={{ fontSize: '11px', opacity: 0.8, margin: 0 }}>~ € {(balance / 655.957).toLocaleString('fr-FR', {maximumFractionDigits: 2})} EUR (1€ = 655.957 FCFA)</p>
      </div>

      {/* Action Buttons below the balance card */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link href="/dashboard/envoyer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '14px', textDecoration: 'none', borderRadius: '12px' }}>
          <SendIcon /> Envoyer de l'argent
        </Link>
        <Link href="/dashboard/recevoir" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '14px', textDecoration: 'none', borderRadius: '12px', backgroundColor: 'var(--secondary)' }}>
          <BanknoteIcon /> Recevoir de l'argent
        </Link>
      </div>

      {/* Quick Action Grid (2x2) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
         <Link href="/dashboard/recharger" style={{ textDecoration: 'none' }}>
           <ActionCard icon={<WalletIcon color="var(--primary)" />} label="Recharger" />
         </Link>
         <Link href="/dashboard/convertir" style={{ textDecoration: 'none' }}>
           <ActionCard icon={<ConvertIcon color="#F59E0B" />} label="Convertir" />
         </Link>
      </div>

      {/* Recent Transactions */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Transactions récentes</h2>
          <Link href="/dashboard/historique" style={{ color: 'var(--secondary)', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>Voir tout</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {transactions.slice(0, 3).map((tx) => (
            <TxItem key={tx.id} title={tx.title} sub={tx.sub} amount={tx.amount} isDebit={tx.isDebit} onClick={() => setSelectedTx(tx)} />
          ))}
        </div>
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

function ActionCard({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="action-card-hover" style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
      <div style={{ width: '48px', height: '48px', background: 'var(--bg-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', textAlign: 'center', lineHeight: '1.2' }}>{label}</span>
    </div>
  );
}

function TxItem({ title, sub, amount, isDebit = false, onClick }: { title: string, sub: string, amount: string, isDebit?: boolean, onClick?: () => void }) {
  return (
    <div className="tx-item-hover" onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'white', border: '1px solid var(--border)' }}>
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

// Icons
const BellIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const ArrowUpIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>;
const ArrowDownIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>;
const WalletIcon = ({ color }: { color: string }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const ConvertIcon = ({ color }: { color: string }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3v11"/><path d="m13 10 4 4 4-4"/><path d="M7 21V10"/><path d="m11 14-4-4-4 4"/></svg>;
const SendIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const BanknoteIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;
