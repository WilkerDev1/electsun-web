'use client';

import React from 'react';

interface HeroPreviewCardProps {
  headline: string;
  subtitle: string;
  ctaText: string;
  bgImageUrl?: string | null;
  badgeText?: string | null;
  overlayOpacity?: number | null;
  titleColor?: string | null;
  mediaType?: string | null;
}

export default function HeroPreviewCard({
  headline,
  subtitle,
  ctaText,
  bgImageUrl,
  badgeText,
  overlayOpacity = 60,
  titleColor = '#FFFFFF',
  mediaType = 'image',
}: HeroPreviewCardProps) {
  const defaultBg = '/images/hero-solar-clean.jpg';
  const background = bgImageUrl || defaultBg;
  const isVideo =
    mediaType === 'video' ||
    (background ? /\.(mp4|webm|ogg|mov)$/i.test(background) : false);

  const opacityVal = typeof overlayOpacity === 'number' ? overlayOpacity / 100 : 0.6;

  return (
    <div
      className="adm-hero-preview-box"
      style={!isVideo ? { backgroundImage: `url(${background})` } : { position: 'relative' }}
    >
      {isVideo && (
        <video
          key={background}
          src={background}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      <div className="adm-hero-preview-overlay" style={{ opacity: opacityVal }} />
      <div className="adm-hero-preview-content">
        {badgeText?.trim() && (
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(0, 229, 153, 0.2)',
              color: '#00E599',
              fontSize: '0.6875rem',
              fontWeight: 800,
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.75rem',
              backdropFilter: 'blur(4px)',
            }}
          >
            {badgeText}
          </div>
        )}
        {headline?.trim() && (
          <h2 className="adm-hero-preview-title" style={{ color: titleColor || '#FFFFFF' }}>
            {headline}
          </h2>
        )}
        {subtitle?.trim() && (
          <p className="adm-hero-preview-subtitle">
            {subtitle}
          </p>
        )}
        {ctaText?.trim() && (
          <button type="button" className="adm-hero-preview-btn">
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
}
