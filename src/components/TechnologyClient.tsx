'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TechnologyClient() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Software SolarSim',
    message: '',
  });

  const solarsim = {
    name: 'SolarSim AI',
    subtitle: 'Simulador Solar & Generador de Cotizaciones Inteligentes',
    desc: 'Software especializado que ayuda a generar cotizaciones técnico-financieras de forma automática e inteligente. Cuenta con un avanzado sistema de IA y simulaciones realistas de producción y consumo energético, basadas en datos fiables de radiación solar del lugar y en las curvas reales de eficiencia del sistema.',
    image: '/images/solarsim-logo.svg',
    badge: 'Software Destacado',
    highlights: [
      'Generación inteligente y 100% automatizada de cotizaciones',
      'Simulaciones realistas de producción y consumo con IA',
      'Datos fiables de radiación solar geográfica y meteorología',
      'Dimensionamiento exacto basado en la eficiencia del sistema',
    ],
    actionText: 'Solicitar Demo de SolarSim',
  };

  const hardwareList = [
    {
      title: 'Paneles de Alta Eficiencia',
      desc: 'Módulos monocristalinos N-Type TOPCon y Bifaciales de última generación con potencias de 450W a 650W+ y eficiencia superior al 22.5%.',
      image: '/images/hardware-panels.jpg',
      specs: ['Tier 1 (Longi, Canadian Solar, Jinko)', 'Eficiencia > 22.5%', 'Garantía lineal de 25-30 años'],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M7 16l2.5-6h5l2.5 6H7z" />
        </svg>
      ),
    },
    {
      title: 'Inversores Inteligentes',
      desc: 'Inversores de red, híbridos y microinversores con algoritmos MPPT avanzados, protecciones AFCI anti-arco eléctrico y conectividad WiFi.',
      image: '/images/hardware-inverters.jpg',
      specs: ['Huawei Solar, Growatt, SMA, Solax', 'Eficiencia hasta 98.6%', 'Protección contra sobretensiones DC/AC'],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: 'Almacenamiento de Energía',
      desc: 'Bancos de baterías modulares de litio ferrofosfato (LiFePO4) de alto voltaje con backup instantáneo anti-apagones.',
      image: '/images/hardware-batteries.jpg',
      specs: ['Huawei LUNA2000, Pylontech, Solax', '> 6,000 ciclos de vida útil', 'Escalable desde 5 kWh hasta 100+ kWh'],
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="16" height="12" rx="2" />
          <line x1="22" y1="11" x2="22" y2="15" />
        </svg>
      ),
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Hero Banner: Ecosistema Tecnológico Electsun */}
      <section className="tech-hero">
        <div
          className="tech-hero-bg"
          style={{ backgroundImage: "url('/images/tech-hero.jpg')" }}
        />
        <div className="tech-hero-overlay" />

        <div className="container-max" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="tech-hero-content">
            <span className="hero-eyebrow" style={{ color: 'var(--cyan)', letterSpacing: '0.2em' }}>
              INNOVACIÓN DIGITAL & EQUIPOS TIER 1
            </span>
            <h1 className="font-display-xl tech-title">
              Ecosistema Tecnológico Electsun
            </h1>
            <p className="font-body-lg tech-desc">
              Soluciones digitales y hardware de vanguardia para la independencia energética.
            </p>

            {/* Quick Metrics Badges Bar */}
            <div className="tech-badges-bar">
              <div className="tech-badge-item">
                <span className="tech-badge-dot green" />
                <span>SOFTWARE INTELIGENTE SOLARSIM</span>
              </div>
              <div className="tech-badge-item">
                <span className="tech-badge-dot gold" />
                <span>COTIZACIONES AUTOMATIZADAS</span>
              </div>
              <div className="tech-badge-item">
                <span className="tech-badge-dot cyan" />
                <span>HARDWARE TIER 1 CERTIFICADO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Software & Digital Solutions (Dark Navy Background) */}
      <section className="tech-software-section">
        <div className="container-max">
          <div className="tech-section-header-dark">
            <span className="hero-eyebrow" style={{ color: 'var(--energy-gold)' }}>
              SOLUCIONES DIGITALES & SOFTWARE
            </span>
            <h2 className="font-headline-lg" style={{ color: '#FFFFFF', marginBottom: '0' }}>
              Nuestras Soluciones de Software
            </h2>
          </div>

          {/* Centered SolarSim Main Card (White Body with Dark Logo Header) */}
          <div className="solarsim-centered-wrap">
            <div className="solarsim-white-card">
              <div className="solarsim-img-wrap">
                <Image
                  src={solarsim.image}
                  alt={solarsim.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 580px"
                  priority
                />
                <div className="software-badge-pill">
                  {solarsim.badge}
                </div>
              </div>

              <div className="solarsim-body">
                <h3 className="solarsim-title">{solarsim.name}</h3>
                <h4 className="solarsim-subtitle">{solarsim.subtitle}</h4>
                <p className="solarsim-desc">{solarsim.desc}</p>

                <ul className="solarsim-highlights">
                  {solarsim.highlights.map((h, i) => (
                    <li key={i}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B87A" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto-tech"
                  className="btn-gold"
                  style={{ width: '100%', marginTop: '20px', padding: '13px', borderRadius: '8px', textAlign: 'center', display: 'block' }}
                >
                  ⚡ {solarsim.actionText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Hardware de Vanguardia (Paneles, Inversores, Baterías) */}
      <section className="tech-hardware-section watermark-section">
        <div className="watermark-emblem-right" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="commercial-section-header">
            <span className="hero-eyebrow" style={{ color: 'var(--deep-navy)' }}>
              SUMINISTRO & DISTRIBUCIÓN
            </span>
            <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)', marginBottom: '14px' }}>
              Hardware de Vanguardia
            </h2>
            <p className="font-body-md" style={{ color: 'var(--secondary)', maxWidth: '640px', margin: '0 auto' }}>
              Equipamiento solar de las marcas más confiables del mundo. Electsun provee e integra tecnología fotovoltaica certificada con máxima durabilidad.
            </p>
          </div>

          <div className="hardware-grid">
            {hardwareList.map((hw, idx) => (
              <div key={idx} className="hardware-card">
                <div className="hardware-img-wrap">
                  <Image
                    src={hw.image}
                    alt={hw.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="hardware-icon-float">
                    {hw.icon}
                  </div>
                </div>

                <div className="hardware-body">
                  <h3 className="hardware-title">{hw.title}</h3>
                  <p className="hardware-desc">{hw.desc}</p>

                  <div className="hardware-specs-list">
                    {hw.specs.map((spec, i) => (
                      <div key={i} className="hardware-spec-tag">
                        <span className="spec-bullet" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Software & Hardware Inquiry Form */}
      <section id="contacto-tech" className="tech-contact-section watermark-section">
        <div className="watermark-emblem-left" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="maintenance-form-grid">
            <div>
              <span className="hero-eyebrow" style={{ color: 'var(--energy-gold)' }}>
                DISTRIBUCIÓN & LICENCIAMIENTO
              </span>
              <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)', marginBottom: '18px' }}>
                Equipe su Proyecto con Tecnología Solar de Punta
              </h2>
              <p className="font-body-md" style={{ color: 'var(--secondary)', marginBottom: '28px' }}>
                Electsun distribuye equipos solares certificados a nivel nacional y ofrece licenciamiento corporativo del software <strong>SolarSim</strong> para instaladores, consultores y empresas energéticas.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  href="tel:8093786590"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--deep-navy)', fontWeight: '700', fontSize: '15px' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 184, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFB800' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span>809-378-6590</span>
                </a>

                <a
                  href="mailto:servicioalcliente@electsun.do"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--secondary)', fontSize: '15px' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00D4FF' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <span>servicioalcliente@electsun.do</span>
                </a>
              </div>
            </div>

            <div className="lead-form-card" style={{ background: '#FFFFFF', boxShadow: '0 8px 30px rgba(10, 25, 47, 0.08)' }}>
              <h3 className="font-headline-sm" style={{ color: 'var(--deep-navy)', marginBottom: '8px' }}>
                Solicitud de Equipos / Software
              </h3>
              <p style={{ color: 'var(--secondary)', fontSize: '14px', marginBottom: '22px' }}>
                Indíquenos los equipos o licencias de software que requiere y le enviaremos la ficha técnica y cotización formal.
              </p>

              {inquirySubmitted ? (
                <div
                  style={{
                    padding: '24px',
                    borderRadius: '8px',
                    background: 'rgba(0, 229, 153, 0.1)',
                    border: '1px solid rgba(0, 229, 153, 0.4)',
                    color: 'var(--deep-navy)',
                    textAlign: 'center',
                  }}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00B87A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ margin: '0 auto 12px' }}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>¡Solicitud Recibida!</h4>
                  <p style={{ fontSize: '14px', color: 'var(--secondary)' }}>
                    Un especialista técnico se pondrá en contacto a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                      Nombre y Empresa *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Su nombre o empresa"
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: '#FFFFFF',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="809-000-0000"
                        value={inquiryData.phone}
                        onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '6px',
                          border: '1px solid var(--outline-variant)',
                          background: '#FFFFFF',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                        Interés Principal
                      </label>
                      <select
                        value={inquiryData.interest}
                        onChange={(e) => setInquiryData({ ...inquiryData, interest: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '6px',
                          border: '1px solid var(--outline-variant)',
                          background: '#FFFFFF',
                          fontSize: '14px',
                        }}
                      >
                        <option value="Software SolarSim">Software SolarSim (Licencia / Demo)</option>
                        <option value="Paneles Solares Tier 1">Paneles Solares Tier 1 (Mayorista)</option>
                        <option value="Inversores Inteligentes">Inversores Híbridos / Centrales</option>
                        <option value="Baterías de Litio">Baterías de Litio LiFePO4</option>
                        <option value="Nuevas Soluciones">Nuevas Soluciones en Desarrollo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                      Detalles o Requerimientos *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describa la capacidad o tipo de proyecto..."
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: '#FFFFFF',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ width: '100%', marginTop: '6px', padding: '14px 20px', borderRadius: '6px' }}
                  >
                    Enviar Solicitud Técnica
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
