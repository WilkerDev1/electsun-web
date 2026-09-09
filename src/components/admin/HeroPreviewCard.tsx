'use client';

import React from 'react';

interface HeroPreviewCardProps {
  headline: string;
  subtitle: string;
  ctaText: string;
  bgImageUrl?: string | null;
  badgeText?: string | null;
}

export default function HeroPreviewCard({
  headline,
  subtitle,
  ctaText,
  bgImageUrl,
  badgeText,
}: HeroPreviewCardProps) {
  const defaultBg = '/images/hero-solar-clean.jpg';
  const background = bgImageUrl || defaultBg;

  return (
    <div
      className="adm-hero-preview-box"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="adm-hero-preview-overlay" />
      <div className="adm-hero-preview-content">
        {badgeText && (
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
        <h2 className="adm-hero-preview-title">{headline || 'Future of Energy'}</h2>
        <p className="adm-hero-preview-subtitle">
          {subtitle || 'Sustainable solutions designed for modern infrastructure.'}
        </p>
        <button type="button" className="adm-hero-preview-btn">
          {ctaText || 'EXPLORE SOLUTIONS'}
        </button>
      </div>
    </div>
  );
}
