'use client';

import React, { useState } from 'react';
import type { SiteConfig, SocialLink } from '@/generated/prisma/client';

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
  });

  const [isSaving, setIsSaving] = useState(false);
  const [newLink, setNewLink] = useState({ platform: 'whatsapp', label: '', url: '' });
  const [isAddingLink, setIsAddingLink] = useState(false);

  const handleSaveIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveConfig(formData);
      showToast('Información de contacto corporativa guardada');
    } catch {
      showToast('Error al guardar datos de contacto', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.label || !newLink.url) {
      showToast('Etiqueta y URL son requeridas', 'error');
      return;
    }
    try {
      const res = await fetch('/api/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newLink, handle: newLink.label, order: socialLinks.length + 1, visible: true }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      onSocialLinksChange((prev) => [...prev, created]);
      setNewLink({ platform: 'whatsapp', label: '', url: '' });
      setIsAddingLink(false);
      showToast('Canal añadido');
    } catch {
      showToast('Error al añadir canal', 'error');
    }
  };

  const handleDeleteSocial = async (id: string) => {
    if (!confirm('¿Eliminar este canal?')) return;
    try {
      const res = await fetch(`/api/social-links/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      onSocialLinksChange((prev) => prev.filter((l) => l.id !== id));
      showToast('Canal eliminado');
    } catch {
      showToast('Error al eliminar', 'error');
    }
  };

  return (
    <div className="adm-content-container">
      <div className="adm-page-header">
        <h1 className="adm-page-title">Global Contact & Social Settings</h1>
        <p className="adm-page-subtitle">Configure institutional identity, customer support channels, and official social media.</p>
      </div>

      <div className="adm-two-col-grid">
        {/* Contact Info Form */}
        <form onSubmit={handleSaveIdentity} className="adm-card">
          <h2 className="adm-card-title">Institutional Channels</h2>
          <div className="adm-form-group">
            <label className="adm-label">Company Name</label>
            <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="adm-input" required />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Tagline / Slogan</label>
            <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} className="adm-input" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Official Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="adm-input" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Direct Phone</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="adm-input" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Physical Address</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="adm-input" />
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Company Bio (Footer)</label>
            <textarea rows={2} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="adm-textarea" />
          </div>
          <button type="submit" disabled={isSaving} className="adm-btn adm-btn-primary" style={{ marginTop: '0.5rem' }}>
            {isSaving ? 'Saving...' : 'Save Institutional Data'}
          </button>
        </form>

        {/* Social Networks */}
        <div className="adm-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="adm-card-title" style={{ margin: 0 }}>Social & Direct Networks</h2>
            <button type="button" onClick={() => setIsAddingLink(!isAddingLink)} className="adm-btn adm-btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
              {isAddingLink ? 'Cancel' : '+ Add Channel'}
            </button>
          </div>

          {isAddingLink && (
            <form onSubmit={handleAddSocial} style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
              <div className="adm-form-group">
                <label className="adm-label">Platform</label>
                <select value={newLink.platform} onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })} className="adm-input">
                  <option value="whatsapp">WhatsApp</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="x">X / Twitter</option>
                </select>
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Label</label>
                <input type="text" placeholder="Ej: WhatsApp Atención" value={newLink.label} onChange={(e) => setNewLink({ ...newLink, label: e.target.value })} className="adm-input" required />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Link URL</label>
                <input type="url" placeholder="https://..." value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} className="adm-input" required />
              </div>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%' }}>Create Channel</button>
            </form>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {socialLinks.map((link) => (
              <div key={link.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{link.label}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>{link.platform} • {link.url}</span>
                </div>
                <button type="button" onClick={() => handleDeleteSocial(link.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>✕</button>
              </div>
            ))}
            {socialLinks.length === 0 && <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No channels configured.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
