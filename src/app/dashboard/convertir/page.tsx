"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const rates: Record<string, number> = {
  'XOF': 1,
  'EUR': 655.957,
  'USD': 600.00,
  'CAD': 450.00,
  'GBP': 770.00
};

export default function Convertir() {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('XOF');
  const [targetCurrency, setTargetCurrency] = useState('EUR');

  // Convert source to XOF first, then to target
  const getConvertedAmount = () => {
    if (!amount) return '0.00';
    const amountInXOF = Number(amount) * rates[sourceCurrency];
    const amountInTarget = amountInXOF / rates[targetCurrency];
    return amountInTarget.toFixed(2);
  };

  const getExchangeRateText = () => {
    const oneSourceInXOF = rates[sourceCurrency];
    const oneSourceInTarget = oneSourceInXOF / rates[targetCurrency];
    return `1 ${sourceCurrency} = ${oneSourceInTarget.toFixed(4)} ${targetCurrency}`;
  };

  const handleSwap = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  const currencies = Object.keys(rates);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-white)', display: 'flex', alignItems: 'center' }}>
        <Link href="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '20px', margin: '0 auto', fontWeight: 700 }}>Convertir</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: '24px' }}>
        <div style={{ background: 'var(--bg-white)', borderRadius: '24px', padding: '24px', border: '1px solid var(--border)', boxShadow: '0 10px 25px rgba(0,0,0,0.02)', marginBottom: '32px' }}>
          
          {/* Source Currency */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Vous envoyez</span>
              {sourceCurrency === 'XOF' && <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Solde: 2 787 500 FCFA</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-light)', padding: '12px 16px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', outline: 'none', width: '100%' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-white)', padding: '8px 12px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: 700 }}>
                <CurrencySelector value={sourceCurrency} onChange={setSourceCurrency} options={currencies} />
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '-12px 0' }}>
            <button 
              onClick={handleSwap}
              style={{ width: '40px', height: '40px', background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', color: 'var(--text-main)', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3v11"/><path d="m13 10 4 4 4-4"/><path d="M7 21V10"/><path d="m11 14-4-4-4 4"/></svg>
            </button>
          </div>

          {/* Destination Currency */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Vous recevez</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-light)', padding: '12px 16px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <input 
                type="text" 
                value={getConvertedAmount()}
                readOnly
                placeholder="0.00"
                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', outline: 'none', width: '100%' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-white)', padding: '8px 12px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: 700 }}>
                <CurrencySelector value={targetCurrency} onChange={setTargetCurrency} options={currencies} />
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>
            Taux: {getExchangeRateText()} (Sans frais)
          </div>

        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '16px', borderRadius: '16px', justifyContent: 'center' }}>
          Convertir
        </button>
      </div>
    </div>
  );
}

function CurrencySelector({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', userSelect: 'none' }}
      >
        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{value}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--text-muted)' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {isOpen && (
        <div className="modal-pro" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', background: 'var(--bg-white)', borderRadius: '16px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', border: '1px solid var(--border)', zIndex: 100, minWidth: '120px', overflow: 'hidden', transformOrigin: 'top right' }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '6px' }}>
            {options.map(opt => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{ padding: '10px 16px', fontSize: '15px', fontWeight: 700, borderRadius: '10px', color: opt === value ? 'var(--primary)' : 'var(--text-main)', cursor: 'pointer', background: opt === value ? 'rgba(22, 163, 74, 0.08)' : 'transparent', transition: 'background 0.2s' }}
                onMouseOver={(e) => { if (opt !== value) e.currentTarget.style.background = 'var(--bg-light)'; }}
                onMouseOut={(e) => { if (opt !== value) e.currentTarget.style.background = 'transparent'; }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
