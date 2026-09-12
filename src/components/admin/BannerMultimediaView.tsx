'use client';

import React from 'react';
import type { SiteConfig } from '@/generated/prisma/client';
import HeroPreviewCard from './HeroPreviewCard';
import HeroMediaAssets from './HeroMediaAssets';

interface BannerMultimediaViewProps {
  config: SiteConfig;
  onChange: (updated: Partial<SiteConfig>) => void;
  onSave: (data?: Partial<SiteConfig>) => Promise<void>;
  isSaving: boolean;
}

export default function BannerMultimediaView({
  config,
  onChange,
  onSave,
  isSaving,
}: BannerMultimediaViewProps) {
  const headline = config.heroTitle ?? '';
  const subtitle = config.heroSubtitle ?? '';
  const ctaText = config.heroCtaText ?? '';
  const badge = config.heroBadge ?? '';
  const heroImage = config.heroImageUrl;
  const overlayOpacity = config.heroOverlayOpacity ?? 60;
  const titleColor = config.heroTitleColor ?? '#FFFFFF';
  const mediaType = config.heroMediaType ?? (heroImage && /\.(mp4|webm|ogg|mov)$/i.test(heroImage) ? 'video' : 'image');

  const destinationOptions = [
    { value: '/comercial', label: 'Página: Proyectos Comerciales (/comercial)' },
    { value: '/#services', label: 'Sección: Servicios y Soluciones (/#services)' },
    { value: '/#impact', label: 'Sección: Hitos e Impacto (/#impact)' },
    { value: '/#why-solar', label: 'Sección: Por Qué Elegir Solar (/#why-solar)' },
    { value: '/mantenimiento', label: 'Página: Mantenimiento Solar (/mantenimiento)' },
    { value: '/proyectos#lead-form', label: 'Formulario: Cotización (#lead-form)' },
  ];

  const currentUrl = config.heroCtaUrl ?? '';
  const isPresetUrl = destinationOptions.some((d) => d.value === currentUrl);

  const handleSaveBanner = () => {
    onSave({
      heroTitle: headline,
      heroSubtitle: subtitle,
      heroCtaText: ctaText,
      heroCtaUrl: currentUrl,
      heroBadge: badge,
      heroImageUrl: heroImage,
      heroOverlayOpacity: overlayOpacity,
      heroTitleColor: titleColor,
      heroMediaType: mediaType,
    });
  };

  return (
    <div className="adm-content-container">
      <div className="adm-page-header">
        <h1 className="adm-page-title">Manage Hero Banner</h1>
        <p className="adm-page-subtitle">Personaliza narrativa visual, vídeo o imagen de fondo, oscurecimiento y tipografía.</p>
      </div>

      <HeroPreviewCard
        headline={headline}
        subtitle={subtitle}
        ctaText={ctaText}
        bgImageUrl={heroImage}
        badgeText={badge}
        overlayOpacity={overlayOpacity}
        titleColor={titleColor}
        mediaType={mediaType}
      />

      <div className="adm-two-col-grid">
        <div className="adm-card">
          <h3 className="adm-card-title" style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>Propiedades del Banner</h3>

          <div className="adm-form-group">
            <label className="adm-label">Headline (Título Principal)</label>
            <input type="text" className="adm-input" value={headline} onChange={(e) => onChange({ heroTitle: e.target.value })} placeholder="Dejar vacío para ocultar" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="adm-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="adm-label">Oscuridad de Fondo</label>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706' }}>{overlayOpacity}%</span>
              </div>
              <input type="range" min="0" max="100" value={overlayOpacity} onChange={(e) => onChange({ heroOverlayOpacity: Number(e.target.value) })} style={{ width: '100%', accentColor: '#F59E0B', cursor: 'pointer' }} />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Color de Fuente Título</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <input type="color" value={titleColor} onChange={(e) => onChange({ heroTitleColor: e.target.value })} style={{ width: '36px', height: '36px', padding: 0, border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer' }} />
                {['#FFFFFF', '#00E599', '#F59E0B', '#0EA5E9'].map((col) => (
                  <button key={col} type="button" onClick={() => onChange({ heroTitleColor: col })} style={{ width: '22px', height: '22px', borderRadius: '50%', background: col, border: titleColor === col ? '2px solid #0F172A' : '1px solid #CBD5E1', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Subheadline / Narrativa</label>
            <textarea rows={2} className="adm-textarea" value={subtitle} onChange={(e) => onChange({ heroSubtitle: e.target.value })} placeholder="Dejar vacío para ocultar" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">Botón CTA (Texto)</label>
              <input type="text" className="adm-input" value={ctaText} onChange={(e) => onChange({ heroCtaText: e.target.value })} placeholder="Dejar vacío para ocultar" />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Destino del Enlace</label>
              <select className="adm-input" value={isPresetUrl ? currentUrl : 'custom'} onChange={(e) => { if (e.target.value !== 'custom') onChange({ heroCtaUrl: e.target.value }); }}>
                {destinationOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                <option value="custom">Otro enlace / Personalizado</option>
              </select>
            </div>
          </div>

          {(!isPresetUrl || currentUrl === '') && (
            <div className="adm-form-group">
              <label className="adm-label">URL Personalizada de Destino</label>
              <input type="text" className="adm-input" value={currentUrl} onChange={(e) => onChange({ heroCtaUrl: e.target.value })} placeholder="ej: /contacto o #lead-form" />
            </div>
          )}

          <div className="adm-form-group">
            <label className="adm-label">Badge de Anuncio (Etiqueta)</label>
            <input type="text" className="adm-input" value={badge} onChange={(e) => onChange({ heroBadge: e.target.value })} placeholder="Dejar vacío para ocultar" />
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <button type="button" className="adm-publish-btn" onClick={handleSaveBanner} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Propiedades del Banner'}
            </button>
          </div>
        </div>

        <div>
          <HeroMediaAssets
            currentHeroUrl={heroImage}
            onSelectHero={(url) => {
              const isVid = /\.(mp4|webm|ogg|mov)$/i.test(url);
              onChange({ heroImageUrl: url, heroMediaType: isVid ? 'video' : 'image' });
            }}
            onUploadSuccess={(url) => {
              const isVid = /\.(mp4|webm|ogg|mov)$/i.test(url);
              onChange({ heroImageUrl: url, heroMediaType: isVid ? 'video' : 'image' });
            }}
          />
        </div>
      </div>
    </div>
  );
}
