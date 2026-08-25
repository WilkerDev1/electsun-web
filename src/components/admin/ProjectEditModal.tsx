'use client';

import { useState } from 'react';
import type { Project } from '@/generated/prisma/client';

interface ProjectEditModalProps {
  project: Project | null;
  onClose: () => void;
  onSuccess: (updated: Project) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export default function ProjectEditModal({
  project,
  onClose,
  onSuccess,
  showToast,
}: ProjectEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  let initialTags = '';
  if (project?.tags) {
    try {
      const parsed = JSON.parse(project.tags);
      if (Array.isArray(parsed)) {
        initialTags = parsed.join(', ');
      }
    } catch {
      initialTags = project.tags;
    }
  }

  const [formData, setFormData] = useState({
    title: project?.title ?? '',
    description: project?.description ?? '',
    client: project?.client ?? '',
    location: project?.location ?? '',
    powerKw: project?.powerKw ?? '',
    systemType: project?.systemType ?? 'Residencial',
    savingsPercent: project?.savingsPercent ?? '',
    tags: initialTags,
    featured: project?.featured ?? false,
    order: project?.order ?? 0,
    completedYear: project?.completedYear ?? new Date().getFullYear().toString(),
  });

  if (!project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('El título es obligatorio.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          category: formData.systemType,
          tags: tagsArray,
          order: Number(formData.order),
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar el proyecto');

      const updated = await res.json();
      showToast('Proyecto actualizado con éxito');
      onSuccess(updated);
      onClose();
    } catch (err: unknown) {
      console.error(err);
      showToast('Error al guardar los cambios del proyecto', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h3 className="admin-modal__title">Editar Instalación: {project.title}</h3>
          <button onClick={onClose} className="admin-modal__close-btn" aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal__body">
          <div className="admin-form-grid">
            <div className="admin-form-group admin-form-group--full">
              <label className="admin-label">Título del Proyecto *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Tipo de Sistema / Categoría</label>
              <select
                value={formData.systemType}
                onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                className="admin-select"
              >
                <option value="Residencial">Residencial</option>
                <option value="Industrial">Industrial</option>
                <option value="Baterías">Baterías</option>
                <option value="Puntos de Recarga">Puntos de Recarga</option>
                <option value="Agrícola">Agrícola / Bombeo</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Potencia Instalada</label>
              <input
                type="text"
                value={formData.powerKw}
                onChange={(e) => setFormData({ ...formData, powerKw: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Cliente / Titular</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Ubicación</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Ahorro Estimado</label>
              <input
                type="text"
                value={formData.savingsPercent}
                onChange={(e) => setFormData({ ...formData, savingsPercent: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Año de Finalización</label>
              <input
                type="text"
                value={formData.completedYear}
                onChange={(e) => setFormData({ ...formData, completedYear: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group admin-form-group--full">
              <label className="admin-label">Descripción Técnica</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="admin-textarea"
              />
            </div>

            <div className="admin-form-group admin-form-group--full">
              <label className="admin-label">Tags (separados por coma)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group admin-form-group--checkbox">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span>Destacar en la portada principal</span>
              </label>
            </div>
          </div>

          <div className="admin-modal__footer">
            <button type="button" onClick={onClose} className="btn btn--secondary">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn--primary">
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
