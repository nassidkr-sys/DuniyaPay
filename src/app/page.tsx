"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div style={{ backgroundColor: '#09090B', color: '#FAFAFA', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'var(--font-inter)' }}>
      
      {/* Navbar Flottante */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(9, 9, 11, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #22D3EE, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              D
            </div>
            <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: '#FAFAFA' }}>DuniyaPay</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="#comment-ca-marche" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#FAFAFA'} onMouseOut={e => e.currentTarget.style.color = '#A1A1AA'}>Fonctionnalités</Link>
            <Link href="#temoignages" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#FAFAFA'} onMouseOut={e => e.currentTarget.style.color = '#A1A1AA'}>Témoignages</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/connexion" style={{ color: '#FAFAFA', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Se connecter</Link>
              <Link href="/inscription" style={{ padding: '10px 20px', backgroundColor: '#FAFAFA', color: '#09090B', borderRadius: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Commencer</Link>
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="show-mobile" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: '#FAFAFA', cursor: 'pointer', padding: '4px' }}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#09090B', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', borderBottom: '1px solid #27272A' }}>
            <Link href="#comment-ca-marche" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FAFAFA', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>Fonctionnalités</Link>
            <Link href="#temoignages" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FAFAFA', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>Témoignages</Link>
            <div style={{ height: '1px', backgroundColor: '#27272A' }}></div>
            <Link href="/connexion" style={{ color: '#FAFAFA', textDecoration: 'none', fontSize: '16px', fontWeight: 600 }}>Se connecter</Link>
            <Link href="/inscription" style={{ padding: '14px', backgroundColor: '#FAFAFA', color: '#09090B', borderRadius: '12px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>Commencer</Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '160px', paddingBottom: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        
        {/* Abstract Glow Background */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '800px', height: '600px', background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(9,9,11,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(108,92,231,0.1) 0%, rgba(9,9,11,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ maxWidth: '800px' }}>
              <motion.div variants={fadeUpVariant} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22D3EE', boxShadow: '0 0 10px #22D3EE' }}></span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E4E4E7' }}>La nouvelle ère du transfert d'argent</span>
              </motion.div>
              
              <motion.h1 variants={fadeUpVariant} style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#FAFAFA', marginBottom: '24px' }}>
                La finance sans frontières, <span style={{ background: 'linear-gradient(to right, #22D3EE, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>conçue pour vous.</span>
              </motion.h1>
              
              <motion.p variants={fadeUpVariant} style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#A1A1AA', lineHeight: 1.6, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
                Envoyez, recevez et gérez votre argent instantanément à travers l'Afrique avec une sécurité de niveau bancaire et des frais transparents.
              </motion.p>
              
              <motion.div variants={fadeUpVariant} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/inscription" className="btn-glow" style={{ padding: '18px 32px', backgroundColor: '#FAFAFA', color: '#09090B', borderRadius: '16px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 0 30px rgba(255,255,255,0.15)', transition: 'all 0.3s' }}>
                  Ouvrir un compte <ArrowRightIcon />
                </Link>
              </motion.div>
            </motion.div>

            {/* Interactive Mockup Hero */}
            <motion.div 
              style={{ y: heroY, opacity, marginTop: '80px', width: '100%', maxWidth: '900px', position: 'relative' }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ position: 'relative', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                {/* Browser/App Header */}
                <div style={{ height: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                </div>
                {/* Mockup Content */}
                <div style={{ backgroundColor: '#0F1117', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', padding: '32px', display: 'flex', gap: '32px', overflow: 'hidden' }}>
                  
                  {/* Mock Sidebar */}
                  <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '16px' }} className="hidden-mobile">
                    <div style={{ height: '24px', width: '100px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '32px' }}></div>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{ height: '20px', width: '100%', backgroundColor: i === 1 ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255,255,255,0.05)', borderRadius: '6px' }}></div>
                    ))}
                  </div>
                  
                  {/* Mock Main Content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ height: '28px', width: '150px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}></div>
                      <div style={{ height: '36px', width: '36px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                      <div style={{ padding: '24px', borderRadius: '20px', background: 'linear-gradient(135deg, #2563EB, #4F46E5)', boxShadow: '0 10px 20px rgba(37,99,235,0.3)' }}>
                        <div style={{ height: '12px', width: '80px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '4px', marginBottom: '16px' }}></div>
                        <div style={{ height: '32px', width: '140px', backgroundColor: '#FFF', borderRadius: '8px' }}></div>
                      </div>
                      <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                          <div style={{ height: '48px', width: '48px', borderRadius: '12px', backgroundColor: 'rgba(34, 211, 238, 0.1)' }}></div>
                          <div style={{ height: '48px', width: '48px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated Transaction Row */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                      style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}></div>
                        <div>
                          <div style={{ height: '14px', width: '100px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '4px', marginBottom: '6px' }}></div>
                          <div style={{ height: '10px', width: '60px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                      <div style={{ height: '16px', width: '80px', backgroundColor: '#10B981', borderRadius: '4px' }}></div>
                    </motion.div>

                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" style={{ padding: '120px 24px', backgroundColor: '#09090B', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.02em', marginBottom: '16px' }}>La simplicité absolue.</h2>
            <p style={{ color: '#A1A1AA', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Trois étapes suffisent pour rejoindre le réseau et commencer à gérer vos finances intelligemment.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <StepCard 
              num="01" 
              title="Créez votre compte" 
              desc="Inscrivez-vous en 2 minutes chrono. Pas de paperasse inutile, juste votre numéro de téléphone et votre email."
              icon={<ShieldIcon />}
            />
            <StepCard 
              num="02" 
              title="Rechargez votre solde" 
              desc="Ajoutez des fonds via Mobile Money, Carte Bancaire ou Virement avec 0% de frais sur votre premier dépôt."
              icon={<WalletMockIcon />}
            />
            <StepCard 
              num="03" 
              title="Envoyez sans limites" 
              desc="Transférez de l'argent instantanément vers n'importe qui, n'importe où, avec une sécurité maximale."
              icon={<ZapIcon />}
            />
          </div>

        </div>
      </section>

      {/* Interactive Features */}
      <section style={{ padding: '120px 24px', backgroundColor: '#0F1117', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
            
            {/* Feature 1: Fast Transfer */}
            <div className="feature-row" style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-flex', padding: '6px 12px', backgroundColor: 'rgba(34, 211, 238, 0.1)', color: '#22D3EE', borderRadius: '8px', fontWeight: 700, fontSize: '13px', marginBottom: '24px' }}>Vitesse Éclair</div>
                <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.02em', marginBottom: '24px' }}>Des transferts qui arrivent avant de dire "Fait".</h3>
                <p style={{ fontSize: '18px', color: '#A1A1AA', lineHeight: 1.6, marginBottom: '32px' }}>
                  Fini les attentes interminables. Grâce à notre infrastructure de pointe, vos fonds sont crédités sur le compte du bénéficiaire en moins de 3 secondes, 24h/24 et 7j/7.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#E4E4E7', fontWeight: 500 }}><span style={{ color: '#22D3EE' }}><CheckIcon /></span> Notification instantanée</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#E4E4E7', fontWeight: 500 }}><span style={{ color: '#22D3EE' }}><CheckIcon /></span> Reçu de transaction généré</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#E4E4E7', fontWeight: 500 }}><span style={{ color: '#22D3EE' }}><CheckIcon /></span> Suivi en temps réel</li>
                </ul>
              </div>
              
              <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(9,9,11,0) 70%)', zIndex: 0 }}></div>
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '340px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '24px', backdropFilter: 'blur(10px)' }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <CheckIcon />
                    </div>
                    <h4 style={{ color: '#FAFAFA', fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0' }}>Transfert Réussi</h4>
                    <p style={{ color: '#A1A1AA', margin: 0, fontSize: '14px' }}>À Mariama B.</p>
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: '#FAFAFA', textAlign: 'center', marginBottom: '32px' }}>
                    - 50 000 FCFA
                  </div>
                  <div style={{ height: '48px', backgroundColor: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px', border: '1px dashed #22D3EE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22D3EE', fontWeight: 600, fontSize: '14px' }}>
                    Reçu #DP-000492
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Feature 2: Global */}
            <div className="feature-row-reverse" style={{ display: 'flex', alignItems: 'center', gap: '64px', flexWrap: 'wrap-reverse' }}>
              
              <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(108,92,231,0.2) 0%, rgba(9,9,11,0) 70%)', zIndex: 0 }}></div>
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '380px' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>XOF</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#FAFAFA' }}>Franc CFA</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>EUR</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#FAFAFA' }}>Euro</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>USD</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#FAFAFA' }}>Dollar US</div>
                    </div>
                    <div style={{ background: 'rgba(108,92,231,0.1)', border: '1px solid rgba(108,92,231,0.3)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ color: '#818CF8', fontWeight: 700 }}>+5 Autres</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-flex', padding: '6px 12px', backgroundColor: 'rgba(108, 92, 231, 0.1)', color: '#818CF8', borderRadius: '8px', fontWeight: 700, fontSize: '13px', marginBottom: '24px' }}>Multi-Devises</div>
                <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.02em', marginBottom: '24px' }}>Votre argent parle toutes les langues.</h3>
                <p style={{ fontSize: '18px', color: '#A1A1AA', lineHeight: 1.6, marginBottom: '32px' }}>
                  Convertissez vos fonds instantanément avec les meilleurs taux du marché. Idéal pour les freelances, les entreprises ou simplement pour voyager l'esprit léger.
                </p>
                <Link href="/connexion" style={{ color: '#818CF8', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Découvrir la conversion <ArrowRightIcon />
                </Link>
              </div>
              
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="temoignages" style={{ padding: '120px 24px', backgroundColor: '#09090B' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 40px)', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.02em', marginBottom: '16px' }}>Ils l'utilisent tous les jours.</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <TestimonialCard 
              quote="DuniyaPay a complètement changé la façon dont je paie mes fournisseurs. C'est instantané et l'interface est juste sublime."
              name="Amadou Diallo"
              role="Entrepreneur, Dakar"
              initials="AD"
            />
            <TestimonialCard 
              quote="Je reçois mon salaire de freelance directement dessus. La conversion en FCFA se fait à un taux imbattable sans frais cachés."
              name="Sophie Traoré"
              role="Designer UX/UI"
              initials="ST"
            />
            <TestimonialCard 
              quote="L'application la plus fluide que j'ai utilisée depuis des années. Le mode sombre est parfait, chaque détail est soigné."
              name="Marc K."
              role="Développeur Web"
              initials="MK"
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 24px 120px', backgroundColor: '#09090B' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'linear-gradient(135deg, #1A1D27, #0F1117)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '40px', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(9,9,11,0) 70%)', zIndex: 0 }}></div>
          
          <h2 style={{ position: 'relative', zIndex: 1, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.02em', marginBottom: '24px' }}>Prêt à prendre le contrôle ?</h2>
          <p style={{ position: 'relative', zIndex: 1, color: '#A1A1AA', fontSize: '18px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>Rejoignez des milliers d'utilisateurs qui ont déjà fait le choix de la simplicité et de l'élégance.</p>
          
          <Link href="/inscription" className="btn-glow" style={{ position: 'relative', zIndex: 1, padding: '20px 48px', backgroundColor: '#22D3EE', color: '#09090B', borderRadius: '16px', fontSize: '18px', fontWeight: 800, textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 30px rgba(34, 211, 238, 0.3)' }}>
            Créer mon compte
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F1117', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '64px 24px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', gridColumn: '1 / -1', maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #22D3EE, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px' }}>D</div>
              <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: '#FAFAFA' }}>DuniyaPay</span>
            </div>
            <p style={{ color: '#71717A', fontSize: '14px', lineHeight: 1.6 }}>La plateforme financière nouvelle génération pour une Afrique sans frontières.</p>
          </div>

          <div>
            <h4 style={{ color: '#FAFAFA', fontWeight: 700, marginBottom: '24px', fontSize: '16px' }}>Produit</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>Transferts</a></li>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>Conversion</a></li>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>Sécurité</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#FAFAFA', fontWeight: 700, marginBottom: '24px', fontSize: '16px' }}>Entreprise</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>À propos</a></li>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>Carrières</a></li>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FAFAFA', fontWeight: 700, marginBottom: '24px', fontSize: '16px' }}>Légal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>CGU</a></li>
              <li><a href="#" style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: '14px' }}>Confidentialité</a></li>
            </ul>
          </div>

        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ color: '#71717A', fontSize: '14px' }}>© 2026 DuniyaPay. Tous droits réservés.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
             <GlobeIcon />
          </div>
        </div>
      </footer>

      {/* Global CSS for this page specifically */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(34, 211, 238, 0.4) !important;
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .feature-row { flex-direction: column !important; }
          .feature-row-reverse { flex-direction: column-reverse !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}} />

    </div>
  );
}

function StepCard({ num, title, desc, icon }: { num: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ padding: '40px 32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ fontSize: '80px', fontWeight: 900, color: 'rgba(255,255,255,0.03)', position: 'absolute', top: -10, right: 10, lineHeight: 1 }}>
        {num}
      </div>
      <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(34, 211, 238, 0.1)', color: '#22D3EE', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        {icon}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FAFAFA', marginBottom: '12px' }}>{title}</h3>
        <p style={{ color: '#A1A1AA', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ quote, name, role, initials }: { quote: string, name: string, role: string, initials: string }) {
  return (
    <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <p style={{ color: '#E4E4E7', fontSize: '16px', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '32px' }}>
        "{quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 'bold' }}>
          {initials}
        </div>
        <div>
          <div style={{ color: '#FAFAFA', fontWeight: 700, fontSize: '15px' }}>{name}</div>
          <div style={{ color: '#71717A', fontSize: '13px' }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

const WalletMockIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const CheckIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowRightIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const ShieldIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const ZapIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const GlobeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const CloseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
