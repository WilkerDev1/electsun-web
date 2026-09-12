'use client';

import { useState, useEffect } from 'react';
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
  config?: {
    commercialEmail?: string | null;
    commercialPhone?: string | null;
    commercialAddress?: string | null;
    commercialDirector?: string | null;
    commercialReceiptMsg?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null;
}

interface GalleryModalData {
  title: string;
  subtitle?: string;
  category?: string;
  imageUrl: string;
  powerKw?: string;
  location?: string;
  savingsPercent?: string;
  description?: string;
  specs?: string;
}

const defaultKeyProjects = [
  {
    id: 'macao-solar',
    title: 'Planta Solar Macao',
    category: 'Industrial',
    categoryBadge: 'INDUSTRIAL',
    badgeGold: false,
    powerTag: '2.4 MWp',
    yearLocation: '2024 · PUNTA CANA',
    description: '3.4 GWh/Año de generación limpia con 4,800 módulos bifaciales N-Type y retorno estimado de 3.2 años.',
    minimalDesc: '3.4 GWh/Año • 4,800 módulos bifaciales',
    imageUrl: '/images/gallery/macao-solar.jpg',
    powerKw: '2.4 MWp',
    location: 'Punta Cana, La Altagracia',
    savingsPercent: '88%',
    specs: '4,800 Módulos Bifaciales N-Type • 16 Inversores Centrales',
  },
  {
    id: 'torre-solarium',
    title: 'Torre Solarium',
    category: 'Corporativo',
    categoryBadge: 'CORPORATIVO',
    badgeGold: false,
    powerTag: '950 kWp',
    yearLocation: '2023 · SANTO DOMINGO',
    description: '1.2 GWh/Año con marquesinas solares integradas y 12 estaciones de recarga rápida para vehículos eléctricos.',
    minimalDesc: '1.2 GWh/Año • Marquesinas y 12 cargadores VE',
    imageUrl: '/images/gallery/torre-solarium.jpg',
    powerKw: '950 kWp',
    location: 'Distrito Nacional, Santo Domingo',
    savingsPercent: '75%',
    specs: 'Marquesinas Solares BIPV • 12 Cargadores Rápidos Nivel 3',
  },
  {
    id: 'microred-terrenas',
    title: 'Microred Las Terrenas',
    category: 'Microred / BESS',
    categoryBadge: 'MICRORED / BESS',
    badgeGold: true,
    powerTag: '45 kWp',
    yearLocation: '2023 · SAMANÁ',
    description: 'Sistema 100% Off-Grid continuo con 80 kWh en almacenamiento de litio LiFePO4 para operación en entorno marino.',
    minimalDesc: '100% Off-Grid • Banco Litio LFP 80 kWh',
    imageUrl: '/images/gallery/microred-terrenas.jpg',
    powerKw: '45 kWp / 80 kWh',
    location: 'Las Terrenas, Samaná',
    savingsPercent: '100% Off-Grid',
    specs: 'Inversores Híbridos Grado Marino • Almacenamiento LiFePO4',
  },
];

const galleryItems = [
  {
    id: 'parque-tier1',
    title: 'Parque Fotovoltaico Tier 1',
    subtitle: '5.2 MWp · Punta Cana',
    imageUrl: '/images/gallery/parque-tier1.jpg',
    badgeTop: 'SCADA · UTILITY SCALE',
    badgeTopAmber: true,
    badgeBottom: 'MONITOREO ACTIVO',
    badgeBottomCyan: true,
    category: 'Utility Scale',
    powerKw: '5.2 MWp',
    location: 'Punta Cana, RD',
    specs: 'SCADA SolarSim Pro • Subestación 34.5 kV',
    description: 'Planta solar a gran escala con monitoreo satelital en tiempo real de irradiancia, despacho continuo a la red y tracking biaxial de alta precisión.',
  },
  {
    id: 'anclajes-c5',
    title: 'Anclajes Anticorrosión C5',
    subtitle: 'Aluminio anodizado AL6005-T5',
    imageUrl: '/images/gallery/anclajes-c5.jpg',
    badgeTop: 'ESTRUCTURAS',
    badgeBottom: 'GRADO COSTERO',
    badgeBottomCyan: true,
    category: 'Estructuras',
    powerKw: 'Cubierta C&I',
    location: 'Zona Portuaria, Haina',
    specs: 'Aluminio AL6005-T5 • Resistencia a Viento 240 km/h',
    description: 'Sistemas de anclaje de fijación no penetrante con protección marina C5 contra niebla salina, preservando intacta la membrana impermeable del techo.',
  },
  {
    id: 'modulos-ntype',
    title: 'Módulos N-Type TOPCon',
    subtitle: 'TOPCon 580W · Eficiencia 22.4%',
    imageUrl: '/images/gallery/modulos-ntype.jpg',
    badgeTop: 'TIER 1',
    badgeBottom: '22.4% EFICIENCIA',
    badgeBottomGreen: true,
    category: 'Tecnología Tier 1',
    powerKw: '580W TOPCon',
    location: 'Laboratorio de Calidad',
    specs: 'Eficiencia 22.4% • Coef. Temperatura -0.30%/°C',
    description: 'Paneles de última generación tipo N con tecnología TOPCon, garantizando un rendimiento un 15% superior en altas temperaturas tropicales.',
  },
  {
    id: 'smart-grid',
    title: 'Smart Grid Media Tensión',
    subtitle: 'Interconexión Nacional 12.8 kV',
    imageUrl: '/images/gallery/smart-grid.jpg',
    badgeTop: 'INFRAESTRUCTURA',
    badgeBottom: '12.8 kV',
    badgeBottomGreen: true,
    category: 'Infraestructura',
    powerKw: '12.8 kV',
    location: 'Interconexión Nacional',
    specs: 'Celdas SF6 • Protocolo DNP3 / IEC 61850',
    description: 'Plataforma inteligente de inyección a red con reguladores estáticos de voltaje y reconectadores automatizados para estabilidad energética.',
  },
  {
    id: 'bess-inversores',
    title: 'BESS & Inversores Híbridos',
    subtitle: 'Tableros C-Ind · Litio LFP 48V',
    imageUrl: '/images/gallery/bess-inversores.jpg',
    badgeTop: 'ALMACENAMIENTO',
    badgeBottom: 'LFP 80 kWh',
    badgeBottomGreen: true,
    category: 'Almacenamiento',
    powerKw: 'LiFePO4 80 kWh',
    location: 'Sala Técnica Industrial',
    specs: 'Baterías Fosfato de Hierro Litio • Conmutación 0ms',
    description: 'Sistema centralizado de almacenamiento con bancos LFP modulares y gestión térmica activa para operación ininterrumpida ante contingencias.',
  },
  {
    id: 'supervision-nec',
    title: 'Supervisión e Inspección NEC',
    subtitle: 'Cumplimiento Retie & NFPA 70',
    imageUrl: '/images/gallery/supervision-nec.jpg',
    badgeTop: 'QA/QC',
    statusBadge: 'EN OBRA',
    category: 'QA / QC',
    powerKw: 'Inspección en Terreno',
    location: 'Todas las Zonas',
    specs: 'Ingenieros Certificados NABCEP • Normativa NFPA 70',
    description: 'Fiscalización y auditoría continua en obra asegurando cableado fotovoltaico de calibre óptimo, pruebas de rigidez dieléctrica y puesta a tierra según código NEC.',
  },
  {
    id: 'macao-solar-loop',
    title: 'Parque Industrial Macao',
    subtitle: 'Generación Anual 3.4 GWh',
    imageUrl: '/images/gallery/macao-solar.jpg',
    badgeTop: 'INDUSTRIAL',
    badgeBottom: '2.4 MWp',
    badgeBottomGreen: true,
    category: 'Industrial',
    powerKw: '2.4 MWp',
    location: 'Punta Cana, La Altagracia',
    specs: '4,800 Módulos N-Type • 16 Inversores Centrales',
    description: 'Parque fotovoltaico industrial a gran escala suministrando energía limpia continua al sector manufacturero y turístico.',
  },
  {
    id: 'torre-solarium-loop',
    title: 'Marquesinas Torre Solarium',
    subtitle: 'BIPV & 12 Cargadores Nivel 3',
    imageUrl: '/images/gallery/torre-solarium.jpg',
    badgeTop: 'CORPORATIVO',
    badgeBottom: '950 kWp',
    badgeBottomCyan: true,
    category: 'Corporativo',
    powerKw: '950 kWp',
    location: 'Santo Domingo, DN',
    specs: 'Marquesinas Solares BIPV • 12 Cargadores Nivel 3',
    description: 'Marquesinas solares integradas con estaciones de carga rápida para flota vehicular corporativa y ahorro de demanda en hora pico.',
  },
  {
    id: 'microred-terrenas-loop',
    title: 'Microred Samaná',
    subtitle: 'Respaldo Litio 100% Off-Grid',
    imageUrl: '/images/gallery/microred-terrenas.jpg',
    badgeTop: 'MICRORED',
    badgeBottom: '100% OFF-GRID',
    badgeBottomGreen: true,
    category: 'Microred Híbrida',
    powerKw: '45 kWp / 80 kWh',
    location: 'Las Terrenas, Samaná',
    specs: 'Inversores Híbridos • Banco LiFePO4 Marino',
    description: 'Microred aislada con almacenamiento inteligente garantizando confiabilidad energética absoluta en áreas costeras sin red.',
  },
];

const bentoSlots = [
  'bento-slot-1',
  'bento-slot-2',
  'bento-slot-3',
  'bento-slot-4',
  'bento-slot-5',
  'bento-slot-6',
  'bento-slot-7',
  'bento-slot-8',
];

export default function CommercialClient({ projects, config }: CommercialClientProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalItem, setModalItem] = useState<GalleryModalData | null>(null);

  useEffect(() => {
    if (!modalItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalItem]);

  const displayKeyProjects = (projects && projects.length >= 3)
    ? projects.slice(0, 3).map((p, idx) => ({
        id: p.id,
        title: p.title,
        category: p.category || defaultKeyProjects[idx]?.category || 'Comercial',
        categoryBadge: (p.category || defaultKeyProjects[idx]?.categoryBadge || 'COMERCIAL').toUpperCase(),
        badgeGold: idx === 2,
        powerTag: p.powerKw || defaultKeyProjects[idx]?.powerTag || 'Tier 1',
        yearLocation: p.location ? `RD · ${p.location.toUpperCase()}` : defaultKeyProjects[idx]?.yearLocation || 'REPÚBLICA DOMINICANA',
        description: p.description || defaultKeyProjects[idx]?.description || '',
        minimalDesc: defaultKeyProjects[idx]?.minimalDesc || (p.powerKw ? `${p.powerKw} • ${p.location || 'República Dominicana'}` : p.description?.slice(0, 48) || ''),
        imageUrl: p.imageUrl || defaultKeyProjects[idx]?.imageUrl || '/images/project-commercial.jpg',
        powerKw: p.powerKw || defaultKeyProjects[idx]?.powerKw,
        location: p.location || defaultKeyProjects[idx]?.location,
        savingsPercent: p.savingsPercent || defaultKeyProjects[idx]?.savingsPercent,
        specs: defaultKeyProjects[idx]?.specs,
      }))
    : defaultKeyProjects;
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

      {/* 2. Nuestro Proceso Técnico (Compact 3 Cards Grid) */}
      <section className="commercial-process-section watermark-section">
        <div className="watermark-emblem-right" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="commercial-section-header">
            <h2 className="font-headline-lg" style={{ color: 'var(--deep-navy)', marginBottom: '8px' }}>
              Nuestro Proceso Técnico
            </h2>
            <p className="font-body-md" style={{ color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '14px' }}>
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

      {/* 3. Proyectos Clave (70% Imagen Vertical, Bordes Afilados, Texto Mínimo) */}
      <section id="proyectos-clave" className="commercial-projects-section watermark-section">
        <div className="watermark-emblem-left" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="portfolio-header-badge">PORTAFOLIO</span>
            <h2 className="portfolio-main-title">Proyectos Clave</h2>
          </div>

          <div className="portfolio-grid">
            {displayKeyProjects.map((item) => (
              <div
                key={item.id}
                className="portfolio-card"
                onClick={() =>
                  setModalItem({
                    title: item.title,
                    subtitle: item.yearLocation,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    powerKw: item.powerKw || item.powerTag,
                    location: item.location,
                    savingsPercent: item.savingsPercent,
                    description: item.description,
                    specs: item.specs,
                  })
                }
              >
                {/* 70% del espacio vertical para la imagen */}
                <div className="portfolio-card-media">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="portfolio-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.1) 40%, rgba(24,34,52,0.85) 100%)',
                    }}
                  />
                  <span className={`portfolio-badge-tag ${item.badgeGold ? 'portfolio-badge-gold' : ''}`}>
                    {item.categoryBadge || item.category}
                  </span>
                  <span className="portfolio-power-tag">{item.powerTag}</span>
                </div>

                {/* 30% del espacio vertical para título y texto mínimo */}
                <div className="portfolio-card-body">
                  <div>
                    <h3 className="portfolio-title">{item.title}</h3>
                    <p className="portfolio-desc-minimal">
                      {item.minimalDesc || item.description}
                    </p>
                  </div>
                  <div className="portfolio-link-row">
                    <span className="portfolio-link">
                      Ver Proyecto <span>↗</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Galería de Instalación (Cuadrícula Bento - Inspirada en Referencia 2) */}
      <section id="galeria" className="installation-gallery-section watermark-section">
        <div className="watermark-emblem-right" aria-hidden="true" />
        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bento-gallery-header">
            <div>
              <div className="bento-gallery-badge">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#F59E0B' }}
                >
                  <rect width="18" height="18" x="3" y="3" rx="1" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span>HIGHLIGHTS • EN TERRENO</span>
              </div>
              <h2 className="bento-gallery-title">NUESTRA GALERÍA</h2>
            </div>

            <button
              type="button"
              className="bento-gallery-full-btn"
              onClick={() => {
                setModalItem({
                  title: 'Galería Completa en Terreno',
                  subtitle: 'Registro Fotográfico de Obras e Instalaciones Industriales',
                  category: 'Portafolio En Terreno',
                  imageUrl: '/images/gallery/parque-tier1.jpg',
                  powerKw: '45+ Frentes de Obra',
                  location: 'República Dominicana',
                  savingsPercent: 'Calidad Tier 1',
                  description:
                    'Auditoría y registro fotográfico en alta resolución de frentes fotovoltaicos ejecutados bajo rigurosos estándares técnicos NEC & NFPA 70.',
                  specs: 'Supervisión Continua • Retie & NFPA 70 • Calidad Certificada',
                });
              }}
            >
              <span>Full Gallery</span>
              <span style={{ fontSize: '15px' }}>→</span>
            </button>
          </div>

          {/* Cuadrícula Bento (3 columnas x 4 filas con bordes afilados e integración armónica) */}
          <div className="bento-mosaic-grid">
            {galleryItems.slice(0, 8).map((item, index) => (
              <div
                key={item.id}
                className={`bento-mosaic-cell ${bentoSlots[index] || ''}`}
                onClick={() =>
                  setModalItem({
                    title: item.title,
                    subtitle: item.subtitle,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    powerKw: item.powerKw,
                    location: item.location,
                    specs: item.specs,
                    description: item.description,
                  })
                }
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="bento-cell-img"
                />
                <div className="bento-cell-overlay">
                  <div className="bento-cell-title">{item.title}</div>
                  <div className="bento-cell-badge">{item.category || item.badgeTop}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Art Gallery Detail Modal */}
      {modalItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(10, 25, 47, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setModalItem(null)}
        >
          <div
            style={{
              background: '#131B2A',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '0px',
              maxWidth: '720px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0,0,0,0.6)',
              color: '#FFFFFF',
              position: 'relative',
              animation: 'fadeScaleIn 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div style={{ position: 'relative', height: '320px', width: '100%', background: '#0B132B' }}>
              <Image
                src={modalItem.imageUrl}
                alt={modalItem.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(19,27,42,0.95) 100%)',
                }}
              />
              <button
                type="button"
                onClick={() => setModalItem(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '0px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  transition: 'background 0.2s',
                  zIndex: 10,
                }}
                aria-label="Cerrar"
              >
                ✕
              </button>

              <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', zIndex: 5 }}>
                {modalItem.category && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--energy-gold, #F59E0B)',
                      background: 'rgba(245, 158, 11, 0.15)',
                      padding: '3px 8px',
                      borderRadius: '0px',
                      display: 'inline-block',
                      marginBottom: '6px',
                    }}
                  >
                    {modalItem.category}
                  </span>
                )}
                <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {modalItem.title}
                </h3>
                {modalItem.subtitle && (
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px', marginBottom: 0 }}>
                    {modalItem.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 28px 28px' }}>
              {modalItem.description && (
                <p style={{ color: '#CBD5E1', fontSize: '14.5px', lineHeight: '1.65', marginBottom: '20px' }}>
                  {modalItem.description}
                </p>
              )}

              {/* Technical Attributes Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '16px',
                  borderRadius: '0px',
                  marginBottom: '24px',
                }}
              >
                {modalItem.powerKw && (
                  <div>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Capacidad / Potencia</span>
                    <strong style={{ fontSize: '14px', color: '#00E599', fontWeight: '700' }}>{modalItem.powerKw}</strong>
                  </div>
                )}
                {modalItem.location && (
                  <div>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ubicación / Entorno</span>
                    <strong style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '600' }}>{modalItem.location}</strong>
                  </div>
                )}
                {modalItem.specs && (
                  <div>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Especificaciones</span>
                    <strong style={{ fontSize: '13px', color: '#38BDF8', fontWeight: '600' }}>{modalItem.specs}</strong>
                  </div>
                )}
                {modalItem.savingsPercent && (
                  <div>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ahorro / Impacto</span>
                    <strong style={{ fontSize: '14px', color: '#F59E0B', fontWeight: '700' }}>{modalItem.savingsPercent}</strong>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalItem(null)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '0px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#E2E8F0',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cerrar
                </button>
                <a
                  href="#agendar-visita"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      notes: `Interesado en solución similar a: ${modalItem.title}`,
                    }));
                    setModalItem(null);
                  }}
                  className="btn-gold"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '0px',
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Solicitar Inspección Técnica
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  href={`tel:${config?.commercialPhone || config?.phone || '8093786590'}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--deep-navy)', fontWeight: '700', fontSize: '15px' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 184, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFB800' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span>{config?.commercialPhone || config?.phone || '809-378-6590'}</span>
                </a>

                <a
                  href={`mailto:${config?.commercialEmail || config?.email || 'servicioalcliente@electsun.do'}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--secondary)', fontSize: '15px' }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 212, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00D4FF' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <span>{config?.commercialEmail || config?.email || 'servicioalcliente@electsun.do'}</span>
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
                    {config?.commercialReceiptMsg || 'Nos pondremos en contacto para confirmar día y hora de su cita.'}
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
