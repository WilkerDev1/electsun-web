'use client';

import Link from 'next/link';

interface HeroSectionProps {
  tagline?: string | null;
  bio?: string | null;
  badge?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  bgImage?: string | null;
  overlayOpacity?: number | null;
  titleColor?: string | null;
  mediaType?: string | null;
}

export default function HeroSection({
  tagline,
  bio,
  badge,
  ctaText,
  ctaUrl,
  bgImage,
  overlayOpacity = 60,
  titleColor = '#FFFFFF',
  mediaType = 'image',
}: HeroSectionProps) {
  const backgroundUrl = bgImage || '/images/hero-solar.jpg';
  const isVideo =
    mediaType === 'video' ||
    (backgroundUrl ? /\.(mp4|webm|ogg|mov)$/i.test(backgroundUrl) : false);

  const opacityVal = typeof overlayOpacity === 'number' ? overlayOpacity / 100 : 0.6;

  return (
    <header className="hero-header">
      {/* Background Image or Video */}
      {isVideo ? (
        <video
          key={backgroundUrl}
          src={backgroundUrl}
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url('${backgroundUrl}')`,
          }}
        />
      )}

      {/* Darkened Gradient Layer with Custom Opacity */}
      <div className="hero-overlay" style={{ opacity: opacityVal }} />

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-left-box">
          {badge?.trim() && (
            <span className="hero-eyebrow">
              {badge}
            </span>
          )}

          {tagline?.trim() && (
            <h1 className="font-display-xl hero-title" style={{ color: titleColor || '#FFFFFF' }}>
              {tagline}
            </h1>
          )}

          {bio?.trim() && (
            <p className="font-body-lg hero-desc">
              {bio}
            </p>
          )}

          <div className="hero-actions">
            {ctaText?.trim() && (
              <Link href={ctaUrl || '/comercial'} className="btn-gold">
                {ctaText}
              </Link>
            )}

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
              Conocer Servicios
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
