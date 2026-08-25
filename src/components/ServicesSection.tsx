'use client';

import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: 'Instalación Profesional',
      desc: 'Nuestro equipo de ingenieros e instaladores certificados se encarga del montaje integral de tu sistema solar, garantizando una integración perfecta y sin complicaciones.',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
          <path d="M7 16l2.5-6h5l2.5 6H7z" strokeWidth="2" />
        </svg>
      ),
      link: '/proyectos',
    },
    {
      title: 'Mantenimiento y Monitoreo',
      desc: 'Supervisión continua en tiempo real mediante sistemas SCADA y mantenimiento preventivo para asegurar el máximo rendimiento durante más de 25 años.',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M6 12l3-3 3 3 5-5" strokeWidth="2" />
        </svg>
      ),
      link: '/proyectos',
    },
    {
      title: 'Consultoría Energética',
      desc: 'Si no sabes por dónde empezar, nuestro equipo de consultores analiza tus facturas y dimensiona la solución óptima para maximizar tu ahorro desde el primer día.',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M19 11l2 2 4-4" strokeWidth="2" />
        </svg>
      ),
      link: '/proyectos#lead-form',
    },
  ];

  return (
    <section id="services" className="navy-services-section">
      {/* High-Resolution Cinematic Solar Background Image */}
      <div
        className="services-bg"
        style={{
          backgroundImage: "url('/images/services-solar-bg.jpg')",
        }}
      />
      <div className="services-overlay" />

      <div className="container-max" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="navy-services-header">
          <h2 className="font-headline-lg">Nuestros Servicios</h2>
          <p className="font-body-lg">
            Soluciones integrales diseñadas para maximizar tu eficiencia y soberanía energética.
          </p>
        </div>

        {/* 3 White Cards */}
        <div className="services-cards-grid">
          {services.map((service, idx) => (
            <div key={idx} className="service-white-card">
              <div className="service-icon-circle">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <Link href={service.link} className="btn-white-outline">
                Explore Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
