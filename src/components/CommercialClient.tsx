'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectItem {
  id: string;
  title: string;
  description?: string | null;
  client?: string | null;
  location?: string | null;
  powerKw?: string | null;
  systemType?: string | null;
  savingsPercent?: string | null;
  imageUrl: string;
  category: string;
}

interface CommercialClientProps {
  projects: ProjectItem[];
}

export default function CommercialClient({ projects }: CommercialClientProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    propertyType: 'Comercial',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const processSteps = [
    {
      title: 'Montaje Estructural',
      desc: 'Evaluación milimétrica y fijación segura utilizando sistemas de anclaje de aluminio anodizado que protegen la integridad de su techo.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Durabilidad Garantizada',
      desc: 'Materiales resistentes a climas extremos y cableado protegido con conductos de grado industrial para asegurar décadas de rendimiento ininterrumpido.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'Conexión Inteligente',
      desc: 'Integración perfecta con su panel eléctrico actual y configuración del sistema de monitoreo en tiempo real vía aplicación móvil.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Hero Banner (Instalación Profesional) */}
      <section className="commercial-hero">
        <div
          className="commercial-hero-bg"
          style={{ backgroundImage: "url('/images/commercial-hero.jpg')" }}
        />
        <div className="commercial-hero-overlay" />

        <div className="container-max" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="commercial-hero-content">
            <h1 className="font-display-xl commercial-title">
              Instalación Profesional
            </h1>

            <p className="font-body-lg commercial-desc">
              Transformamos su techo en una fuente de energía limpia con precisión técnica y los más altos estándares de calidad de la industria.
            </p>

            <div>
              <a href="#agendar-visita" className="btn-gold" style={{ padding: '14px 34px', fontSize: '13px' }}>
                Agendar Visita Técnica
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Nuestro Proceso Técnico (3 Cards Grid) */}
      <section className="commercial-process-section watermark-section">
        <div className="watermark-emblem-right" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="commercial-section-header">
            <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)', marginBottom: '14px' }}>
              Nuestro Proceso Técnico
            </h2>
            <p className="font-body-md" style={{ color: 'var(--secondary)', maxWidth: '640px', margin: '0 auto' }}>
              Cada instalación es ejecutada por expertos certificados, garantizando máxima eficiencia, seguridad y longevidad de su sistema solar.
            </p>
          </div>

          <div className="commercial-process-grid">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-card">
                <div className="process-icon-circle">
                  {step.icon}
                </div>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Proyectos Realizados (Galería de Proyectos Destacados) */}
      <section className="commercial-projects-section watermark-section">
        <div className="watermark-emblem-left" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)' }}>
              Proyectos Realizados
            </h2>
          </div>

          <div className="commercial-projects-grid">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="project-photo-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-photo-wrap">
                    <Image
                      src={project.imageUrl || '/images/project-commercial.jpg'}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="project-photo-overlay">
                      <span className="project-photo-category">{project.category}</span>
                      <h4 className="project-photo-title">{project.title}</h4>
                      {project.powerKw && (
                        <p className="project-photo-power">{project.powerKw} • {project.location || 'RD'}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Fallback Static Cards */
              <>
                <div className="project-photo-card">
                  <div className="project-photo-wrap">
                    <Image
                      src="/images/project-residential.jpg"
                      alt="Instalación Residencial"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="project-photo-card">
                  <div className="project-photo-wrap">
                    <Image
                      src="/images/project-commercial.jpg"
                      alt="Instalación Comercial e Industrial"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="project-photo-card">
                  <div className="project-photo-wrap">
                    <Image
                      src="/images/project-inverters.jpg"
                      alt="Sala de Inversores y Baterías"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(10, 25, 47, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', height: '280px', width: '100%' }}>
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(10, 25, 47, 0.75)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '28px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--energy-gold)' }}>
                {selectedProject.category}
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--deep-navy)', marginTop: '4px', marginBottom: '12px' }}>
                {selectedProject.title}
              </h3>
              <p style={{ color: 'var(--secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                {selectedProject.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#F8FAFC', padding: '14px', borderRadius: '8px' }}>
                {selectedProject.powerKw && (
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--secondary)', display: 'block' }}>Potencia</span>
                    <strong style={{ fontSize: '14px', color: 'var(--deep-navy)' }}>{selectedProject.powerKw}</strong>
                  </div>
                )}
                {selectedProject.location && (
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--secondary)', display: 'block' }}>Ubicación</span>
                    <strong style={{ fontSize: '14px', color: 'var(--deep-navy)' }}>{selectedProject.location}</strong>
                  </div>
                )}
                {selectedProject.savingsPercent && (
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--secondary)', display: 'block' }}>Ahorro Estimado</span>
                    <strong style={{ fontSize: '14px', color: '#00B87A' }}>{selectedProject.savingsPercent}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ¿Listo para el cambio? (Deep Navy Call To Action) */}
      <section className="commercial-cta-section">
        <div className="container-max" style={{ textAlign: 'center' }}>
          <h2 className="font-headline-lg commercial-cta-title">
            ¿Listo para el cambio?
          </h2>
          <p className="font-body-lg commercial-cta-desc">
            Nuestros expertos están listos para evaluar su propiedad y diseñar el sistema solar perfecto para sus necesidades.
          </p>
          <div>
            <a href="#agendar-visita" className="btn-gold" style={{ padding: '14px 36px', fontSize: '13px' }}>
              Agendar Visita Técnica
            </a>
          </div>
        </div>
      </section>

      {/* 5. Agendamiento de Visita Técnica */}
      <section id="agendar-visita" className="commercial-booking-section watermark-section">
        <div className="watermark-emblem-right" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="maintenance-form-grid">
            <div>
              <span className="hero-eyebrow" style={{ color: 'var(--energy-gold)' }}>
                CONTACTO DIRECTO
              </span>
              <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)', marginBottom: '18px' }}>
                Solicite su presupuesto y estudio solar sin costo
              </h2>
              <p className="font-body-md" style={{ color: 'var(--secondary)', marginBottom: '28px' }}>
                Realizamos visitas técnicas presenciales en toda la República Dominicana para evaluar la radiación y estructura de su cubierta.
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
                Formulario de Visita Técnica
              </h3>
              <p style={{ color: 'var(--secondary)', fontSize: '14px', marginBottom: '22px' }}>
                Complete sus datos y un ingeniero se pondrá en contacto para coordinar la inspección.
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
                  <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>¡Visita Solicitada!</h4>
                  <p style={{ fontSize: '14px', color: 'var(--secondary)' }}>
                    Nos pondremos en contacto para confirmar día y hora de su cita.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                      Nombre y Apellidos *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Su nombre"
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
                        Tipo de Inmueble
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '6px',
                          border: '1px solid var(--outline-variant)',
                          background: '#FFFFFF',
                          fontSize: '14px',
                        }}
                      >
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Residencial">Residencial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}>
                      Dirección o Ciudad de la Instalación *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Santo Domingo, Santiago, etc."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                    Confirmar Solicitud de Visita
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
