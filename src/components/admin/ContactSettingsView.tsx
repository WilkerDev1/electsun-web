'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import type { SiteConfig, SocialLink } from '@/generated/prisma/client';
import SocialNetworksManager from './SocialNetworksManager';

interface ContactSettingsViewProps {
  config: SiteConfig;
  socialLinks: SocialLink[];
  onSaveConfig: (updated: Partial<SiteConfig>) => Promise<void>;
  onSocialLinksChange: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function ContactSettingsView({
  config,
  socialLinks,
  onSaveConfig,
  onSocialLinksChange,
  showToast,
}: ContactSettingsViewProps) {
  const [formData, setFormData] = useState({
    companyName: config.companyName || 'Electsun',
    tagline: config.tagline || '',
    email: config.email || '',
    phone: config.phone || '',
    address: config.address || '',
    bio: config.bio || '',
    logoUrl: config.logoUrl || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingLogo(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFormData((prev) => ({ ...prev, logoUrl: data.url }));
      showToast('Logotipo institucional cargado');
    } catch {
      showToast('Error al subir logotipo', 'error');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSaveIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveConfig(formData);
      showToast('Información corporativa guardada');
    } catch {
      showToast('Error al guardar datos de contacto', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="adm-content-container">
      <div className="adm-page-header">
        <h1 className="adm-page-title">Global Contact & Brand Settings</h1>
        <p className="adm-page-subtitle">Configura la identidad institucional, logotipo oficial y redes de contacto.</p>
      </div>

      <div className="adm-two-col-grid">
        {/* Contact & Brand Info Form */}
        <form onSubmit={handleSaveIdentity} className="adm-card">
          <h2 className="adm-card-title">Canales Institucionales y Marca</h2>
          <div className="adm-form-group">
            <label className="adm-label">Nombre de la Empresa <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 400 }}>(Opcional si usas logotipo)</span></label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="adm-input"
              placeholder="Electsun (o dejar vacío si el logo es suficiente)"
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Eslogan / Tagline <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 400 }}>(Opcional)</span></label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="adm-input"
              placeholder="Ej: Energía Solar y Soluciones Renovables (o dejar vacío)"
            />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Logotipo Oficial (Cabecera y Marca)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <div style={{ position: 'relative', width: '70px', height: '36px', background: '#0F172A', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {formData.logoUrl ? (
                  <Image
                    src={formData.logoUrl}
                    alt="Logo"
                    width={64}
                    height={30}
                    unoptimized
                    style={{ maxHeight: '30px', maxWidth: '64px', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Default</span>
                )}
              </div>
              <input ref={logoInputRef} type="file" accept="image/*" onChange={handleUploadLogo} style={{ display: 'none' }} />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="adm-btn adm-btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                {isUploadingLogo ? 'Subiendo...' : 'Subir Logotipo'}
              </button>
            </div>
            <input
              type="text"
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              className="adm-input"
              placeholder="URL o subir archivo..."
            />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Email Oficial</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="adm-input"
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Teléfono Directo</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="adm-input"
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Dirección Física</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="adm-input"
            />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Bio Institucional (Footer)</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="adm-textarea"
            />
          </div>
          <button type="submit" disabled={isSaving} className="adm-btn adm-btn-primary" style={{ marginTop: '0.5rem' }}>
            {isSaving ? 'Guardando...' : 'Guardar Información'}
          </button>
        </form>

        {/* Social Networks Modular Component */}
        <SocialNetworksManager
          socialLinks={socialLinks}
          onSocialLinksChange={onSocialLinksChange}
          showToast={showToast}
        />
      </div>
    </div>
  );
}
