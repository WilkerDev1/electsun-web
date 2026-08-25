'use client';

import { useState } from 'react';

export default function ConsultingClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    service: 'Auditoría Energética',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const corporateServices = [
    {
      title: 'Auditoría Energética',
      desc: 'Análisis exhaustivo del consumo y la infraestructura actual para identificar ineficiencias y proponer soluciones óptimas de integración renovable, maximizando el ROI.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Ingeniería a Medida',
      desc: 'Diseño y desarrollo de sistemas fotovoltaicos complejos adaptados a los requerimientos técnicos y arquitectónicos específicos de instalaciones industriales y comerciales.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      title: 'Desarrollo de Parques Solares',
      desc: 'Gestión integral de proyectos Utility-Scale, desde la viabilidad y permisos hasta la construcción, puesta en marcha y operación de grandes plantas de generación.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M7 16l2.5-6h5l2.5 6H7z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Top Banner with Local High-Resolution Image */}
      <section className="consulting-banner">
        <div
          className="consulting-banner-bg"
          style={{ backgroundImage: "url('/images/consulting-banner.jpg')" }}
        />
        <div className="consulting-banner-content">
          <h1>Consultoría y Proyectos Especiales</h1>
          <p>
            Soluciones de ingeniería a medida y asesoramiento estratégico para proyectos de energía renovable a gran escala.
          </p>
        </div>
      </section>

      {/* Main Two-Column Content */}
      <div className="container-max">
        <div className="consulting-main-grid">
          {/* Left Column (Services & Testimonials) */}
          <div>
            {/* Corporate Services */}
            <div style={{ marginBottom: '56px' }}>
              <h2
                className="font-headline-lg"
                style={{
                  color: 'var(--deep-navy)',
                  marginBottom: '32px',
                  borderLeft: '4px solid var(--energy-gold)',
                  paddingLeft: '16px',
                }}
              >
                Nuestros Servicios Corporativos
              </h2>

              <div>
                {corporateServices.map((item, idx) => (
                  <div key={idx} className="corp-service-card">
                    <div className="corp-service-card-inner">
                      <div className="corp-icon-box">
                        {item.icon}
                      </div>
                      <div>
                        <h3
                          className="font-headline-sm"
                          style={{ color: 'var(--deep-navy)', marginBottom: '8px' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="font-body-md"
                          style={{ color: 'var(--secondary)', lineHeight: '1.65' }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div style={{ paddingTop: '40px', borderTop: '1px solid var(--glass-border)' }}>
              <h2
                className="font-headline-sm"
                style={{ color: 'var(--deep-navy)', marginBottom: '24px' }}
              >
                Casos de Éxito Corporativo
              </h2>

              <div
                style={{
                  background: '#FFFFFF',
                  padding: '28px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 2px 8px rgba(13,44,94,0.04)',
                }}
              >
                {/* 5 SVG Gold Stars */}
                <div style={{ display: 'flex', gap: '4px', color: 'var(--energy-gold)', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#FFB800"
                      stroke="#FFB800"
                      strokeWidth="1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p
                  className="font-body-md"
                  style={{
                    color: 'var(--on-surface-variant)',
                    fontStyle: 'italic',
                    marginBottom: '24px',
                    lineHeight: '1.6',
                  }}
                >
                  &ldquo;La auditoría de Electsun nos permitió reducir nuestros costos operativos en un 40% durante el primer año. Su enfoque de ingeniería fue preciso y altamente profesional.&rdquo;
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'var(--surface-container-high)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--deep-navy)',
                      fontWeight: '700',
                      fontSize: '14px',
                    }}
                  >
                    JD
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '14px', color: 'var(--deep-navy)' }}>
                      Javier Domínguez
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--secondary)' }}>
                      Director de Operaciones, Logística Sur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Lead Form) */}
          <div id="lead-form">
            <div className="lead-form-card">
              <h3 className="font-headline-sm" style={{ color: 'var(--deep-navy)', marginBottom: '8px' }}>
                Inicie su Proyecto
              </h3>
              <p className="font-body-md" style={{ color: 'var(--secondary)', fontSize: '14px', marginBottom: '24px' }}>
                Complete el formulario y un consultor senior se pondrá en contacto a la brevedad.
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
                  <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>¡Solicitud Recibida!</h4>
                  <p style={{ fontSize: '14px', color: 'var(--secondary)' }}>
                    Nos pondremos en contacto con usted en menos de 24 horas laborables.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label
                      htmlFor="company"
                      style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}
                    >
                      Empresa *
                    </label>
                    <input
                      id="company"
                      required
                      type="text"
                      placeholder="Nombre de su empresa"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: 'var(--surface)',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}
                    >
                      Nombre del Contacto *
                    </label>
                    <input
                      id="name"
                      required
                      type="text"
                      placeholder="Su nombre y apellidos"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: 'var(--surface)',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}
                    >
                      Correo Corporativo *
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="nombre@empresa.es"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: 'var(--surface)',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}
                    >
                      Servicio de Interés
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: 'var(--surface)',
                        fontSize: '14px',
                      }}
                    >
                      <option value="Auditoría Energética">Auditoría Energética</option>
                      <option value="Ingeniería a Medida">Ingeniería a Medida</option>
                      <option value="Desarrollo de Parques Solares">Desarrollo de Parques Solares</option>
                      <option value="Baterías y Respaldo">Baterías y Respaldo</option>
                      <option value="Puntos de Recarga VE">Puntos de Recarga VE</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--deep-navy)', marginBottom: '6px' }}
                    >
                      Detalles del Proyecto
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Describa brevemente su ubicación, consumo o potencia estimada..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: '1px solid var(--outline-variant)',
                        background: 'var(--surface)',
                        fontSize: '14px',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ width: '100%', marginTop: '6px', padding: '14px 20px', borderRadius: '8px' }}
                  >
                    Solicitar Asesoría
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
