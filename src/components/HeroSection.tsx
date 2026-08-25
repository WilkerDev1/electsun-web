'use client';

import Link from 'next/link';

interface HeroSectionProps {
  tagline?: string;
  bio?: string;
}

export default function HeroSection({ tagline, bio }: HeroSectionProps) {
  return (
    <header className="hero-header">
      {/* Background Image (Local High-Resolution Solar Farm) */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: "url('/images/hero-solar.jpg')",
        }}
      />

      {/* Darkened Gradient Layer focused on Left Text Area */}
      <div className="hero-overlay" />

      {/* Hero Content (Left Aligned matching reference image) */}
      <div className="hero-content">
        <div className="hero-left-box">
          <span className="hero-eyebrow">
            EL SOL A TU FAVOR
          </span>

          <h1 className="font-display-xl hero-title">
            {tagline || 'Energía Solar para tu Futuro'}
          </h1>

          <p className="font-body-lg hero-desc">
            {bio ||
              'Diseñamos la infraestructura del mañana con soluciones fotovoltaicas de alta eficiencia, adaptadas a empresas visionarias y hogares modernos.'}
          </p>

          <div className="hero-actions">
            <Link href="/proyectos" className="btn-gold">
              Explore Solutions
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
              View Technology
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
