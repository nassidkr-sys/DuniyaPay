"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function InformationsPersonnelles() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+221 77 123 45 67',
    address: 'Dakar, Sénégal'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', backgroundColor: 'var(--bg-light)' }}>
      <header style={{ padding: '24px', background: 'white', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard/profil" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 style={{ fontSize: '18px', margin: '0 auto', fontWeight: 700 }}>Infos personnelles</h1>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        
        <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Prénom</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Nom de famille</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Adresse Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Numéro de téléphone</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <label style={{ marginBottom: '8px', display: 'block', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>Adresse postale</label>
            <input 
              type="text" 
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

        </div>

        <button className="btn btn-primary" style={{ width: '100%', marginTop: '32px', padding: '16px', borderRadius: '16px', fontSize: '16px', justifyContent: 'center' }}>
          Enregistrer les modifications
        </button>

      </div>
    </div>
  );
}
