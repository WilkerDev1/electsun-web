'use client';

import React, { useState } from 'react';
import type { SocialLink } from '@/generated/prisma/client';

interface SocialNetworksManagerProps {
  socialLinks: SocialLink[];
  onSocialLinksChange: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function SocialNetworksManager({
  socialLinks,
  onSocialLinksChange,
  showToast,
}: SocialNetworksManagerProps) {
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLink, setNewLink] = useState({ platform: 'whatsapp', label: '', url: '' });

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
    <div className="adm-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 className="adm-card-title" style={{ margin: 0 }}>Social & Direct Networks</h2>
        <button
          type="button"
          onClick={() => setIsAddingLink(!isAddingLink)}
          className="adm-btn adm-btn-outline"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
        >
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
  );
}
