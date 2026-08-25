'use client';

import Link from 'next/link';

interface HeroSectionProps {
  tagline?: string;
  bio?: string;
}

export default function HeroSection({ tagline, bio }: HeroSectionProps) {
  return (
    <header className="hero-header">
      {/* Background Image (Local High-Resolution Golden Hour Solar Farm) */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: "url('/images/hero-solar.jpg')",
        }}
      />

      {/* Darkening Layer for enhanced contrast and luxury warmth */}
      <div className="hero-overlay" />

      {/* Hero Content (Centered Windore Inspired Layout) */}
      <div className="hero-content">
        {/* Frosted Pill Badge */}
        <div className="hero-pill-badge">
          <span className="hero-pill-dot" />
          <span>El sol a tu favor · Energía Solar Inteligente</span>
        </div>

        {/* Rounded Headline with warm champagne tones */}
        <h1 className="font-display-xl hero-title">
          {tagline ? (
            tagline
          ) : (
            <>
              Energía Solar<br />y Soluciones Renovables
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="font-body-lg hero-desc">
          {bio ||
            'Diseñamos e implementamos infraestructura fotovoltaica de alto rendimiento y almacenamiento inteligente para empresas líderes y hogares sostenibles.'}
        </p>

        {/* Actions (Pill CTA Buttons) */}
        <div className="hero-actions">
          <Link href="/proyectos#lead-form" className="btn-champagne">
            Get a Free Quote
          </Link>

          <Link href="/proyectos" className="btn-cyan-outline">
            <span>Explore Solutions</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Majestic Bottom Watermark 'Electsun' */}
      <div className="hero-watermark">
        Electsun
      </div>
    </header>
  );
}
