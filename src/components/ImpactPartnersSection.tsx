'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { SiteConfig, Partner } from '@/generated/prisma/client';

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

interface ImpactPartnersSectionProps {
  config?: SiteConfig | null;
  partners?: Partner[];
}

export default function ImpactPartnersSection({ config, partners: initialPartners }: ImpactPartnersSectionProps) {
  const defaultPartners = [
    { name: 'Huawei Solar', category: 'Inversores Smart' },
    { name: 'Canadian Solar', category: 'Módulos Tier 1' },
    { name: 'SMA Energy', category: 'Sistemas Híbridos' },
    { name: 'Longi Solar', category: 'Células Fotovoltaicas' },
    { name: 'Western Digital', category: 'Almacenamiento Tech' },
    { name: 'TRU-TEST', category: 'Sistemas Industriales' },
    { name: 'PSEG', category: 'Infraestructura' },
  ];

  const partnersList = (initialPartners && initialPartners.length > 0)
    ? initialPartners
        .filter((p) => p.visible !== false)
        .map((p) => ({ name: p.name || '', category: p.category || '', logoUrl: p.logoUrl }))
    : defaultPartners.map((p) => ({ ...p, logoUrl: null as string | null }));

  return (
    <section id="impact" className="impact-partners-section">
      {/* Top Half: Eco Technology Integration & Huge KPIs */}
      <div className="impact-top-container watermark-section">
        <div className="watermark-emblem-right" aria-hidden="true" />

        <div className="container-max" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div className="impact-header-grid">
            <div>
              <h2 className="impact-title">
                Nuestros Hitos<br />y Experiencia
              </h2>
            </div>
            <div>
              <p className="impact-subtitle">
                {config?.bio ||
                  'Respaldamos a organizaciones líderes y hogares con soluciones solares de alto impacto, reduciendo costos operativos y asegurando máxima sostenibilidad y rendimiento a largo plazo.'}
              </p>
            </div>
          </div>

          <div className="impact-kpi-grid">
            {/* Left Metric */}
            <div className="impact-kpi-col">
              <div className="impact-kpi-number">
                {config?.stat2Value ? (
                  <span>{config.stat2Value}</span>
                ) : (
                  <AnimatedCounter end={390} suffix="MW+" />
                )}
              </div>
              <h3 className="impact-kpi-label">
                {config?.stat2Label || 'Energía Limpia Generada'}
              </h3>
              <p className="impact-kpi-desc">
                Producción masiva de energía renovable continua suministrada a miles de empresas y hogares.
              </p>
            </div>

            {/* Central Vertical Divider */}
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

            {/* Right Metric */}
            <div className="impact-kpi-col">
              <div className="impact-kpi-number">
                {config?.stat1Value ? (
                  <span>{config.stat1Value}</span>
                ) : (
                  <AnimatedCounter end={1050} prefix="" suffix="+" />
                )}
              </div>
              <h3 className="impact-kpi-label">
                {config?.stat1Label || 'Empresas & Clientes Impulsados'}
              </h3>
              <p className="impact-kpi-desc">
                Respaldamos a organizaciones líderes en la reducción de costos y el cumplimiento de metas de sostenibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Half: Infinite Horizontal Marquee */}
      <div className="partners-marquee-container">
        <div className="container-max" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 className="partners-marquee-title">
            Empresas que Confían en Nuestra Calidad y Rendimiento
          </h3>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track">
            {partnersList.map((partner, idx) => {
              const hasName = Boolean(partner.name && partner.name.trim());
              const hasCategory = Boolean(partner.category && partner.category.trim());
              const isLogoOnly = Boolean(partner.logoUrl && !hasName && !hasCategory);

              return (
                <div
                  key={`partner-1-${idx}`}
                  className="partner-logo-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: isLogoOnly ? '0' : '0.6rem',
                    padding: isLogoOnly ? '10px 22px' : '12px 24px',
                  }}
                >
                  {partner.logoUrl && (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name || 'Partner logo'}
                      width={isLogoOnly ? 80 : 46}
                      height={isLogoOnly ? 28 : 20}
                      unoptimized
                      style={{
                        maxHeight: isLogoOnly ? '30px' : '20px',
                        maxWidth: isLogoOnly ? '90px' : '46px',
                        objectFit: 'contain',
                        opacity: 0.95,
                      }}
                    />
                  )}
                  {hasName && <span className="partner-name">{partner.name}</span>}
                  {hasName && hasCategory && <span className="partner-dot">•</span>}
                  {hasCategory && <span className="partner-tag">{partner.category}</span>}
                </div>
              );
            })}
            {partnersList.map((partner, idx) => {
              const hasName = Boolean(partner.name && partner.name.trim());
              const hasCategory = Boolean(partner.category && partner.category.trim());
              const isLogoOnly = Boolean(partner.logoUrl && !hasName && !hasCategory);

              return (
                <div
                  key={`partner-2-${idx}`}
                  className="partner-logo-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: isLogoOnly ? '0' : '0.6rem',
                    padding: isLogoOnly ? '10px 22px' : '12px 24px',
                  }}
                >
                  {partner.logoUrl && (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name || 'Partner logo'}
                      width={isLogoOnly ? 80 : 46}
                      height={isLogoOnly ? 28 : 20}
                      unoptimized
                      style={{
                        maxHeight: isLogoOnly ? '30px' : '20px',
                        maxWidth: isLogoOnly ? '90px' : '46px',
                        objectFit: 'contain',
                        opacity: 0.95,
                      }}
                    />
                  )}
                  {hasName && <span className="partner-name">{partner.name}</span>}
                  {hasName && hasCategory && <span className="partner-dot">•</span>}
                  {hasCategory && <span className="partner-tag">{partner.category}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
