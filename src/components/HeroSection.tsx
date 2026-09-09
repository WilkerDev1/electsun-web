'use client';

import Link from 'next/link';

interface HeroSectionProps {
  tagline?: string;
  bio?: string;
  badge?: string;
  ctaText?: string;
  ctaUrl?: string;
  bgImage?: string;
}

export default function HeroSection({
  tagline,
  bio,
  badge,
  ctaText,
  ctaUrl,
  bgImage,
}: HeroSectionProps) {
  const backgroundUrl = bgImage || '/images/hero-solar.jpg';

  return (
    <header className="hero-header">
      {/* Background Image */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url('${backgroundUrl}')`,
        }}
      />

      {/* Darkened Gradient Layer */}
      <div className="hero-overlay" />

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-left-box">
          <span className="hero-eyebrow">
            {badge || 'EL SOL A TU FAVOR'}
          </span>

          <h1 className="font-display-xl hero-title">
            {tagline || 'Energía Solar para tu Futuro'}
          </h1>

          <p className="font-body-lg hero-desc">
            {bio ||
              'Diseñamos la infraestructura del mañana con soluciones fotovoltaicas de alta eficiencia, adaptadas a empresas visionarias y hogares modernos.'}
          </p>

          <div className="hero-actions">
            <Link href={ctaUrl || '/proyectos'} className="btn-gold">
              {ctaText || 'Explorar Soluciones'}
            </Link>

            <Link href="/#services" className="btn-cyan-outline">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
              Ver Tecnología
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
