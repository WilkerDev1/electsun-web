'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import type { Partner } from '@/generated/prisma/client';

interface EditPartnerModalProps {
  partner: Partner;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function EditPartnerModal({
  partner,
  onClose,
  onSuccess,
  showToast,
}: EditPartnerModalProps) {
  const [name, setName] = useState(partner.name);
  const [category, setCategory] = useState(partner.category || '');
  const [logoUrl, setLogoUrl] = useState(partner.logoUrl);
  const [order, setOrder] = useState(partner.order);
  const [visible, setVisible] = useState(partner.visible);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
      showToast('Nuevo logotipo cargado');
    } catch {
      showToast('Error al subir logotipo', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoUrl.trim() && !name.trim()) {
      showToast('Debes ingresar al menos el logotipo o el nombre', 'error');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch(`/api/partners/${partner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          category: category.trim(),
          logoUrl: logoUrl.trim(),
          order: Number(order),
          visible,
        }),
      });
      if (!res.ok) throw new Error();
      showToast('Partner actualizado');
      await onSuccess();
      onClose();
    } catch {
      showToast('Error al actualizar el partner', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="adm-modal-backdrop" onClick={onClose}>
      <div className="adm-modal" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-header">
          <h2 className="adm-modal-title">Editar Partner / Fabricante</h2>
          <button type="button" className="adm-modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
          <div className="adm-form-group">
            <label className="adm-label">Nombre Comercial <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 400 }}>(Opcional si usas logotipo)</span></label>
            <input type="text" className="adm-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Huawei FusionSolar (o dejar vacío si solo es logo)" />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Especialidad / Categoría <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 400 }}>(Opcional)</span></label>
            <input type="text" className="adm-input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ej: Inversores Inteligentes (o dejar vacío)" />
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Logotipo de la Marca</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <div style={{ position: 'relative', width: '80px', height: '42px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid #E2E8F0', overflow: 'hidden', flexShrink: 0 }}>
                {logoUrl && <Image src={logoUrl} alt={name || 'Partner logo'} fill sizes="80px" style={{ objectFit: 'contain', padding: '3px' }} />}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="adm-btn adm-btn-outline" style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }} disabled={isUploading}>
                {isUploading ? 'Subiendo...' : 'Reemplazar Logotipo...'}
              </button>
            </div>
            <input type="text" className="adm-input" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="URL del logotipo" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">Orden</label>
              <input type="number" className="adm-input" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
            <div className="adm-form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <label className="adm-label">Visibilidad</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.8125rem' }}>
                <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} style={{ accentColor: '#00E599', width: '16px', height: '16px' }} />
                <span>Visible en Portada</span>
              </label>
            </div>
          </div>

          <div className="adm-modal-footer" style={{ marginTop: '0.5rem' }}>
            <button type="button" className="adm-btn adm-btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="adm-publish-btn" disabled={isSaving || isUploading}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
