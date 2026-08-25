'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * end);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ImpactPartnersSection() {
  const partners = [
    { name: 'g.print', tag: 'Gráfica & Impresión' },
    { name: 'AOL MUSIC', tag: 'Entretenimiento' },
    { name: 'TRU-TEST', tag: 'Sistemas Industriales' },
    { name: 'PSEG', tag: 'Infraestructura' },
    { name: 'Western Digital', tag: 'Almacenamiento Tech' },
    { name: 'Master-G', tag: 'Electrónica' },
    { name: 'Huawei Solar', tag: 'Inversores Smart' },
    { name: 'Canadian Solar', tag: 'Módulos Tier 1' },
    { name: 'SMA Energy', tag: 'Sistemas Híbridos' },
    { name: 'Longi Solar', tag: 'Células Fotovoltaicas' },
  ];

  return (
    <section id="impact" className="impact-partners-section">
      {/* Top Half: Eco Technology Integration & Huge KPIs (Warm Sand Surface) */}
      <div className="impact-top-container watermark-section">
        {/* Brand Emblem Watermark */}
        <div className="watermark-emblem-right" aria-hidden="true" />

        <div className="container-max" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* Section Header: 2 Columns */}
          <div className="impact-header-grid">
            <div>
              <h2 className="impact-title">
                Nuestros Hitos<br />y Experiencia
              </h2>
            </div>
            <div>
              <p className="impact-subtitle">
                Respaldamos a organizaciones líderes y hogares con soluciones solares de alto impacto, reduciendo costos operativos y asegurando máxima sostenibilidad y rendimiento a largo plazo.
              </p>
            </div>
          </div>

          {/* Huge KPI Metrics Grid with Central Divider Badge */}
          <div className="impact-kpi-grid">
            {/* Left Metric: 390MW+ */}
            <div className="impact-kpi-col">
              <div className="impact-kpi-number">
                <AnimatedCounter end={390} suffix="MW+" />
              </div>
              <h3 className="impact-kpi-label">
                Energía Limpia Generada
              </h3>
              <p className="impact-kpi-desc">
                Producción masiva de energía renovable continua suministrada a miles de empresas y hogares.
              </p>
            </div>

            {/* Central Vertical Divider with Leaf / Sun Monogram */}
            <div className="impact-divider-wrapper">
              <div className="impact-divider-line" />
              <div className="impact-divider-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div className="impact-divider-line" />
            </div>

            {/* Right Metric: 1,050+ */}
            <div className="impact-kpi-col">
              <div className="impact-kpi-number">
                <AnimatedCounter end={1050} prefix="" suffix="+" />
              </div>
              <h3 className="impact-kpi-label">
                Empresas & Clientes Impulsados
              </h3>
              <p className="impact-kpi-desc">
                Respaldamos a organizaciones líderes en la reducción de costos y el cumplimiento de metas de sostenibilidad.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Half: Trusted for Quality & Infinite Horizontal Marquee (Deep Dark Bar) */}
      <div className="partners-marquee-container">
        <div className="container-max" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 className="partners-marquee-title">
            Empresas que Confían en Nuestra Calidad y Rendimiento
          </h3>
        </div>

        {/* Infinite Moving Carousel */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {/* First Set of Logos */}
            {partners.map((partner, idx) => (
              <div key={`partner-1-${idx}`} className="partner-logo-pill">
                <span className="partner-name">{partner.name}</span>
                <span className="partner-dot">•</span>
                <span className="partner-tag">{partner.tag}</span>
              </div>
            ))}

            {/* Duplicate Set for Seamless Loop */}
            {partners.map((partner, idx) => (
              <div key={`partner-2-${idx}`} className="partner-logo-pill">
                <span className="partner-name">{partner.name}</span>
                <span className="partner-dot">•</span>
                <span className="partner-tag">{partner.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
