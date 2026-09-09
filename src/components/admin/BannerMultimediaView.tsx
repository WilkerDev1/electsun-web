'use client';

import React from 'react';
import type { SiteConfig } from '@/generated/prisma/client';
import HeroPreviewCard from './HeroPreviewCard';
import HeroMediaAssets from './HeroMediaAssets';

interface BannerMultimediaViewProps {
  config: SiteConfig;
  onChange: (updated: Partial<SiteConfig>) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export default function BannerMultimediaView({
  config,
  onChange,
  onSave,
  isSaving,
}: BannerMultimediaViewProps) {
  const headline = config.heroTitle || 'Future of Energy';
  const subtitle = config.heroSubtitle || 'Sustainable solutions designed for modern infrastructure.';
  const ctaText = config.heroCtaText || 'EXPLORE SOLUTIONS';
  const badge = config.heroBadge || 'Tecnología Tier 1 Certificada';
  const heroImage = config.heroImageUrl;

  return (
    <div className="adm-content-container">
      <div className="adm-page-header">
        <h1 className="adm-page-title">Manage Hero Banner</h1>
        <p className="adm-page-subtitle">Configure the primary visual narrative for the homepage.</p>
      </div>

      {/* Live Preview Card */}
      <HeroPreviewCard
        headline={headline}
        subtitle={subtitle}
        ctaText={ctaText}
        bgImageUrl={heroImage}
        badgeText={badge}
      />

      {/* Two Column Form Properties and Media */}
      <div className="adm-two-col-grid">
        <div className="adm-card">
          <h3 className="adm-card-title" style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>
            Content Properties
          </h3>

          <div className="adm-form-group">
            <label className="adm-label">Headline</label>
            <input
              type="text"
              className="adm-input"
              value={headline}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              placeholder="e.g. Future of Energy"
            />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Subheadline / Narrative</label>
            <textarea
              className="adm-textarea"
              rows={3}
              value={subtitle}
              onChange={(e) => onChange({ heroSubtitle: e.target.value })}
              placeholder="e.g. Sustainable solutions designed for modern infrastructure."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">CTA Button Label</label>
              <input
                type="text"
                className="adm-input"
                value={ctaText}
                onChange={(e) => onChange({ heroCtaText: e.target.value })}
              />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">CTA Destination URL</label>
              <input
                type="text"
                className="adm-input"
                value={config.heroCtaUrl || '/comercial'}
                onChange={(e) => onChange({ heroCtaUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Badge Announcement</label>
            <input
              type="text"
              className="adm-input"
              value={badge}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              className="adm-publish-btn"
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Banner Properties'}
            </button>
          </div>
        </div>

        <div>
          <HeroMediaAssets
            currentHeroUrl={heroImage}
            onSelectHero={(url) => onChange({ heroImageUrl: url })}
            onUploadSuccess={(url) => onChange({ heroImageUrl: url })}
          />
        </div>
      </div>
    </div>
  );
}
