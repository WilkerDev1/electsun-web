'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import type { Project } from '@/generated/prisma/client';

interface ProjectEditModalProps {
  project: Project | null;
  onClose: () => void;
  onSuccess: (updated: Project) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export default function ProjectEditModal({ project, onClose, onSuccess, showToast }: ProjectEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: project?.title ?? '',
    description: project?.description ?? '',
    client: project?.client ?? '',
    location: project?.location ?? '',
    powerKw: project?.powerKw ?? '',
    systemType: project?.systemType ?? 'Residencial',
    savingsPercent: project?.savingsPercent ?? '',
    imageUrl: project?.imageUrl ?? '/images/project-residential.jpg',
    featured: project?.featured ?? false,
    order: project?.order ?? 0,
    completedYear: project?.completedYear ?? new Date().getFullYear().toString(),
  });

  if (!project) return null;

  const handleImageReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      if (!res.ok) throw new Error();
      const result = await res.json();
      setFormData((prev) => ({ ...prev, imageUrl: result.url }));
      showToast('Imagen actualizada en WebP');
    } catch {
      showToast('Error al procesar la nueva imagen', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('El título es requerido', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, category: formData.systemType, order: Number(formData.order) }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      showToast('Proyecto actualizado con éxito');
      onSuccess(updated);
      onClose();
    } catch {
      showToast('Error al actualizar el proyecto', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="adm-modal-backdrop" onClick={onClose}>
      <div className="adm-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-header">
          <h3 className="adm-modal-title">Editar Instalación: {project.title}</h3>
          <button type="button" onClick={onClose} className="adm-modal-close" aria-label="Cerrar">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="adm-modal-body">
          {/* Image preview & replace */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ position: 'relative', width: '90px', height: '60px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
              <Image src={formData.imageUrl} alt="Project thumb" fill sizes="90px" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageReplace} style={{ display: 'none' }} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="adm-btn adm-btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                {isUploading ? 'Subiendo...' : 'Cambiar Fotografía'}
              </button>
            </div>
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Título del Proyecto *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="adm-input" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">Categoría</label>
              <select value={formData.systemType} onChange={(e) => setFormData({ ...formData, systemType: e.target.value })} className="adm-input">
                <option value="Residencial">Residencial</option>
                <option value="Industrial">Industrial</option>
                <option value="Comercial">Comercial</option>
                <option value="Baterías">Baterías</option>
                <option value="Agrícola">Agrícola</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Potencia (ej. 1.2 MWp / 250 kWp)</label>
              <input type="text" value={formData.powerKw} onChange={(e) => setFormData({ ...formData, powerKw: e.target.value })} className="adm-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">Cliente / Titular</label>
              <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="adm-input" />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Ubicación</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="adm-input" />
            </div>
          </div>

          <div className="adm-form-group">
            <label className="adm-label">Descripción Técnica</label>
            <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="adm-textarea" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="modal-featured-chk" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
            <label htmlFor="modal-featured-chk" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              Destacar en la portada principal (Featured on Frontpage)
            </label>
          </div>

          <div className="adm-modal-actions">
            <button type="button" onClick={onClose} className="adm-btn adm-btn-outline">Cancelar</button>
            <button type="submit" disabled={isSubmitting || isUploading} className="adm-btn adm-btn-primary">
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
