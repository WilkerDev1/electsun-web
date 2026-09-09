'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import type { Partner } from '@/generated/prisma/client';

interface PartnersViewProps {
  partners: Partner[];
  onRefresh: () => Promise<void>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function PartnersView({ partners, onRefresh, showToast }: PartnersViewProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [category, setCategory] = useState('Tier 1 Manufacturer');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLogoUrl(data.url);
      showToast('Logo cargado y optimizado en WebP');
    } catch {
      showToast('Error al subir imagen de logotipo', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !logoUrl.trim()) {
      showToast('Nombre y logotipo son obligatorios', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, logoUrl, category, visible: true }),
      });
      if (!res.ok) throw new Error();
      showToast('Partner añadido exitosamente');
      setIsAdding(false);
      setName('');
      setLogoUrl('');
      await onRefresh();
    } catch {
      showToast('Error al guardar partner', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleVisible = async (partner: Partner) => {
    try {
      await fetch(`/api/partners/${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !partner.visible }),
      });
      showToast(partner.visible ? 'Partner ocultado' : 'Partner visible en portada');
      await onRefresh();
    } catch {
      showToast('Error al actualizar visibilidad', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar este partner?')) return;
    try {
      await fetch(`/api/partners/${id}`, { method: 'DELETE' });
      showToast('Partner eliminado');
      await onRefresh();
    } catch {
      showToast('Error al eliminar partner', 'error');
    }
  };

  return (
    <div className="adm-content-container">
      <div className="adm-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="adm-page-title">Partner Logos & Tier 1 Manufacturers</h1>
          <p className="adm-page-subtitle">Gestiona logotipos y fabricantes de tecnología fotovoltaica certificados en la web.</p>
        </div>
        <button type="button" className="adm-publish-btn" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancelar' : '+ Subir Partner Logo'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="adm-card" style={{ marginBottom: '2rem' }}>
          <h3 className="adm-card-title" style={{ fontSize: '1.05rem', marginBottom: '1.25rem' }}>Nuevo Fabricante / Partner</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">Nombre Comercial *</label>
              <input type="text" className="adm-input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Huawei FusionSolar" />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Especialidad / Categoría</label>
              <input type="text" className="adm-input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ej: Inversores Industriales" />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Subir Logotipo (PNG / SVG / JPG / WebP) *</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="adm-btn adm-btn-outline" style={{ width: '100%', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                {isUploading ? 'Subiendo...' : logoUrl ? '✓ Cambiar Archivo' : '📁 Seleccionar Imagen Local'}
              </button>
            </div>
          </div>

          {logoUrl && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', width: '80px', height: '40px', background: '#FFFFFF', borderRadius: '4px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <Image src={logoUrl} alt="Logo preview" fill sizes="80px" style={{ objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>Logotipo cargado y listo para vincular</span>
            </div>
          )}

          <button type="submit" className="adm-publish-btn" disabled={isSubmitting || isUploading || !logoUrl}>
            {isSubmitting ? 'Guardando...' : 'Publicar Partner'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {partners.map((p) => (
          <div key={p.id} className="adm-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '60px', height: '48px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', overflow: 'hidden', flexShrink: 0 }}>
              <Image src={p.logoUrl} alt={p.name} fill sizes="60px" style={{ objectFit: 'contain', padding: '4px' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.category}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
              <button type="button" onClick={() => handleToggleVisible(p)} style={{ background: p.visible ? '#ECFDF5' : '#F1F5F9', color: p.visible ? '#059669' : '#64748B', border: 'none', padding: '0.35rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>
                {p.visible ? 'Visible' : 'Oculto'}
              </button>
              <button type="button" onClick={() => handleDelete(p.id)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '0.35rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>
                ✕
              </button>
            </div>
          </div>
        ))}
        {partners.length === 0 && (
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>No hay partners registrados todavía.</p>
        )}
      </div>
    </div>
  );
}
