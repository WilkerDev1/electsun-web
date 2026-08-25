'use client';

import { useState } from 'react';

export default function MaintenanceClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    systemType: 'Residencial',
    panelsCount: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const maintenanceFeatures = [
    {
      title: 'Limpieza Especializada',
      desc: 'Remoción técnica de polvo y residuos que pueden disminuir hasta un 20% la captación solar. Utilizamos equipos y agua desmineralizada que protegen el recubrimiento de los paneles.',
      iconBg: 'rgba(0, 212, 255, 0.12)',
      iconColor: '#00D4FF',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="M20 12h-4" />
          <path d="m19.07 4.93-2.83 2.83" />
          <path d="M14 14l3-3 4 4-3 3z" />
          <path d="M3 21l8-8" />
        </svg>
      ),
      isFeatured: false,
    },
    {
      title: 'Monitoreo 24/7',
      desc: 'Centro de control operativo que supervisa la generación de energía en tiempo real, detectando anomalías y caídas de tensión antes de que afecten su rendimiento mensual.',
      iconBg: 'rgba(255, 184, 0, 0.15)',
      iconColor: '#FFB800',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M6 12l3-3 3 3 5-5" />
        </svg>
      ),
      isFeatured: true,
    },
    {
      title: 'Revisión de Inversores',
      desc: 'Diagnóstico profundo del cerebro de su sistema solar. Actualizaciones de firmware, verificación de cableado y calibración térmica para máxima conversión de energía.',
      iconBg: 'rgba(0, 212, 255, 0.12)',
      iconColor: '#00D4FF',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      isFeatured: false,
    },
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* 1. Maintenance Hero Banner */}
      <section className="maintenance-hero">
        <div
          className="maintenance-hero-bg"
          style={{ backgroundImage: "url('/images/maintenance-banner.jpg')" }}
        />
        <div className="maintenance-hero-overlay" />

        <div className="container-max" style={{ position: 'relative', zIndex: 10 }}>
          <div className="maintenance-hero-content">
            {/* Pill Badge */}
            <div className="maintenance-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Servicio Premium</span>
            </div>

            {/* Title */}
            <h1 className="font-display-xl maintenance-title">
              Mantenimiento y Monitoreo Inteligente
            </h1>

            {/* Subtitle */}
            <p className="font-body-lg maintenance-desc">
              Asegure el máximo rendimiento de su inversión solar con nuestro servicio proactivo. Supervisión en tiempo real y mantenimiento preventivo especializado.
            </p>

            {/* CTA Button */}
            <div>
              <a href="#solicitar-revision" className="btn-navy-action">
                Solicitar Revisión
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Cuidado Integral de su Sistema (3 Cards Grid) */}
      <section className="maintenance-cards-section watermark-section">
        <div className="watermark-emblem-right" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Heading */}
          <div className="maintenance-section-header">
            <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)', marginBottom: '14px' }}>
              Cuidado Integral de su Sistema
            </h2>
            <p className="font-body-md" style={{ color: 'var(--secondary)', maxWidth: '640px', margin: '0 auto' }}>
              Nuestra metodología combina tecnología avanzada con experiencia técnica para garantizar eficiencia sostenida.
            </p>
          </div>

          {/* 3 Maintenance Cards */}
          <div className="maintenance-grid">
            {maintenanceFeatures.map((item, idx) => (
              <div
                key={idx}
                className={`maint-card ${item.isFeatured ? 'maint-card-featured' : ''}`}
              >
                {/* Translucent Energy Bolt Watermark for Featured Card */}
                {item.isFeatured && (
                  <div className="maint-watermark-bolt">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="rgba(10, 25, 47, 0.04)" stroke="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                )}

                {/* Icon Box */}
                <div
                  className="maint-icon-circle"
                  style={{ background: item.iconBg }}
                >
                  {item.icon}
                </div>

                <h3 className="maint-card-title">{item.title}</h3>
                <p className="maint-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Revision Booking Form & Direct Contact */}
      <section id="solicitar-revision" className="maintenance-form-section watermark-section">
        <div className="watermark-emblem-left" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="maintenance-form-grid">
            {/* Left text */}
            <div>
              <span className="hero-eyebrow" style={{ color: 'var(--energy-gold)' }}>
                DIAGNÓSTICO EN SITIO
              </span>
              <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>
                Agende una inspección técnica de su instalación solar
              </h2>
              <p className="font-body-md" style={{ color: 'var(--secondary)', marginBottom: '28px' }}>
                Nuestros técnicos calificados evaluarán el estado de sus paneles, cableado, inversores y protecciones eléctricas en toda la República Dominicana.
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

            {/* Right form card */}
            <div className="lead-form-card" style={{ background: '#FFFFFF', boxShadow: '0 8px 30px rgba(10, 25, 47, 0.08)' }}>
              <h3 className="font-headline-sm" style={{ color: 'var(--deep-navy)', marginBottom: '8px' }}>
                Solicitar Cotización de Mantenimiento
              </h3>
              <p style={{ color: 'var(--secondary)', fontSize: '14px', marginBottom: '22px' }}>
                Complete los datos y le responderemos con un plan adaptado a su capacidad instalada.
              </p>

              {formSubmitted ? (
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
                  <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>¡Solicitud Registrada!</h4>
                  <p style={{ fontSize: '14px', color: 'var(--secondary)' }}>
                    Un especialista técnico se comunicará con usted para confirmar la fecha de la revisión.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                      Nombre Completo *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Ing. Carlos Santana"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                        Tipo de Sistema
                      </label>
                      <select
                        value={formData.systemType}
                        onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '6px',
                          border: '1px solid var(--outline-variant)',
                          background: '#FFFFFF',
                          fontSize: '14px',
                        }}
                      >
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                      Correo Electrónico *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="nombre@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      Detalles o Ubicación de la Instalación
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Indique si tiene problemas actuales de producción, fecha de última limpieza, etc."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: '#FFFFFF',
                        fontSize: '14px',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ width: '100%', marginTop: '6px', padding: '14px 20px', borderRadius: '6px' }}
                  >
                    Enviar Solicitud de Revisión
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
