'use client';

import { useState } from 'react';
import type { SocialLink } from '@/generated/prisma/client';

interface SocialLinksTabProps {
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export default function SocialLinksTab({
  socialLinks,
  setSocialLinks,
  showToast,
}: SocialLinksTabProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({
    platform: 'whatsapp',
    label: '',
    url: '',
    handle: '',
  });

  const platformOptions = [
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'x', label: 'X / Twitter' },
    { value: 'youtube', label: 'YouTube' },
  ];

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.url.trim() || !newLink.label.trim()) {
      showToast('La etiqueta y el enlace son obligatorios', 'error');
      return;
    }

    try {
      const res = await fetch('/api/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: newLink.platform,
          label: newLink.label,
          url: newLink.url,
          handle: newLink.handle || newLink.label,
          icon: newLink.platform,
          order: socialLinks.length + 1,
          visible: true,
        }),
      });

      if (!res.ok) throw new Error('Error al añadir canal');

      const created = await res.json();
      setSocialLinks((prev) => [...prev, created]);
      setNewLink({ platform: 'whatsapp', label: '', url: '', handle: '' });
      setIsAdding(false);
      showToast('Canal de contacto añadido');
    } catch {
      showToast('Error al añadir el canal de contacto', 'error');
    }
  };

  const handleToggleVisible = async (link: SocialLink) => {
    try {
      const res = await fetch(`/api/social-links/${link.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !link.visible }),
      });

      if (!res.ok) throw new Error('Error al cambiar visibilidad');

      const updated = await res.json();
      setSocialLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      showToast(updated.visible ? 'Canal visible en la web' : 'Canal ocultado');
    } catch {
      showToast('Error al actualizar visibilidad', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar este canal de contacto?')) return;

    try {
      const res = await fetch(`/api/social-links/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setSocialLinks((prev) => prev.filter((l) => l.id !== id));
      showToast('Canal eliminado correctamente');
    } catch {
      showToast('Error al eliminar el canal', 'error');
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2 className="admin-section__title">Canales de Contacto y Redes Corporativas</h2>
          <p className="admin-section__subtitle">
            Administra los accesos directos de atención al cliente (WhatsApp, LinkedIn, teléfono directo y correo).
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn--primary btn--sm"
        >
          {isAdding ? 'Cancelar' : '+ Añadir Canal'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddLink} className="admin-card-group" style={{ marginBottom: '24px' }}>
          <h3 className="admin-card-group__title">Nuevo Canal de Contacto</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-label">Plataforma</label>
              <select
                value={newLink.platform}
                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                className="admin-select"
              >
                {platformOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Etiqueta Visible</label>
              <input
                type="text"
                required
                placeholder="Ej: WhatsApp Comercial, LinkedIn Empresa"
                value={newLink.label}
                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">URL o Enlace</label>
              <input
                type="text"
                required
                placeholder="Ej: https://wa.me/34910000111 o tel:+34910000111"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Texto Secundario / Handle</label>
              <input
                type="text"
                placeholder="Ej: +34 910 000 111, @electsun_solar"
                value={newLink.handle}
                onChange={(e) => setNewLink({ ...newLink, handle: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-actions" style={{ marginTop: '16px' }}>
            <button type="submit" className="btn btn--primary btn--sm">
              Guardar Canal
            </button>
          </div>
        </form>
      )}

      <div className="admin-social-list">
        {socialLinks.map((link) => (
          <div key={link.id} className="admin-social-item">
            <div className="admin-social-item__info">
              <span className="admin-social-item__icon-badge">
                {link.platform === 'whatsapp' ? '💬' : link.platform === 'linkedin' ? '💼' : link.platform === 'phone' ? '📞' : '🔗'}
              </span>
              <div>
                <strong className="admin-social-item__label">{link.label || link.platform}</strong>
                <span className="admin-social-item__url">{link.url}</span>
              </div>
            </div>

            <div className="admin-social-item__actions">
              <button
                onClick={() => handleToggleVisible(link)}
                className={`btn btn--sm ${link.visible ? 'btn--secondary' : 'btn--outline'}`}
              >
                {link.visible ? 'Visible' : 'Oculto'}
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="btn btn--danger btn--sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
