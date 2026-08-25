'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Project } from '@/generated/prisma/client';

interface ProjectUploadTabProps {
  onSuccess: (newProject: Project) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export default function ProjectUploadTab({
  onSuccess,
  showToast,
}: ProjectUploadTabProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    location: '',
    powerKw: '',
    systemType: 'Residencial',
    savingsPercent: '',
    category: 'Residencial',
    tags: '',
    featured: false,
    order: 0,
    completedYear: new Date().getFullYear().toString(),
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      showToast('Por favor, selecciona un archivo de imagen válido.', 'error');
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      showToast('Por favor, sube una imagen del proyecto.', 'error');
      return;
    }

    if (!formData.title.trim()) {
      showToast('El título del proyecto es obligatorio.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload the image
      const uploadBody = new FormData();
      uploadBody.append('file', file);
      uploadBody.append('type', 'project');

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadBody,
      });

      if (!uploadRes.ok) {
        throw new Error('Error al subir el archivo de imagen.');
      }

      const { url, thumbnailUrl } = await uploadRes.json();

      // 2. Create the project record
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const projectRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          category: formData.systemType,
          imageUrl: url,
          thumbnailUrl: thumbnailUrl || url,
          tags: tagsArray,
          order: Number(formData.order),
        }),
      });

      if (!projectRes.ok) {
        throw new Error('Error al guardar el registro del proyecto.');
      }

      const newProject = await projectRes.json();
      showToast('¡Proyecto de instalación publicado con éxito!');
      onSuccess(newProject);

      // Reset form
      setFile(null);
      setPreview(null);
      setFormData({
        title: '',
        description: '',
        client: '',
        location: '',
        powerKw: '',
        systemType: 'Residencial',
        savingsPercent: '',
        category: 'Residencial',
        tags: '',
        featured: false,
        order: 0,
        completedYear: new Date().getFullYear().toString(),
      });
    } catch (err: unknown) {
      console.error(err);
      showToast('Error al publicar el proyecto.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2 className="admin-section__title">Registrar Nueva Instalación Solar</h2>
          <p className="admin-section__subtitle">
            Añade un nuevo proyecto ejecutado con sus especificaciones técnicas, fotografías y métricas de rendimiento.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-upload-form">
        {/* Upload Zone */}
        <div
          className={`admin-dropzone ${isDragOver ? 'admin-dropzone--active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {preview ? (
            <div className="admin-dropzone__preview">
              <div className="admin-dropzone__preview-image-wrap">
                <Image
                  src={preview}
                  alt="Vista previa de la instalación"
                  fill
                  className="admin-dropzone__preview-image"
                  unoptimized
                />
              </div>
              <p className="admin-dropzone__change-hint">
                Haz clic o arrastra otra imagen para reemplazarla
              </p>
            </div>
          ) : (
            <div className="admin-dropzone__placeholder">
              <div className="admin-dropzone__icon">📸</div>
              <p className="admin-dropzone__main-text">
                Arrastra y suelta aquí la fotografía de la instalación
              </p>
              <p className="admin-dropzone__sub-text">
                o haz clic para explorar tus archivos (JPEG, PNG, WebP)
              </p>
            </div>
          )}
        </div>

        {/* Project Details Grid */}
        <div className="admin-form-grid">
          <div className="admin-form-group admin-form-group--full">
            <label className="admin-label">Título del Proyecto *</label>
            <input
              type="text"
              required
              placeholder="Ej: Instalación Solar Fotovoltaica 6.4 kWp con Batería"
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
              <option value="Residencial">Residencial (Hogares / Chalets)</option>
              <option value="Industrial">Industrial & Comercial</option>
              <option value="Baterías">Baterías y Acumulación</option>
              <option value="Puntos de Recarga">Puntos de Recarga VE</option>
              <option value="Agrícola">Bombeo Solar / Agrícola</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Potencia Instalada</label>
            <input
              type="text"
              placeholder="Ej: 5.4 kWp, 120 kWp, 10 kWh"
              value={formData.powerKw}
              onChange={(e) => setFormData({ ...formData, powerKw: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Cliente / Titular</label>
            <input
              type="text"
              placeholder="Ej: Vivienda Unifamiliar, Nave Logística"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Ubicación</label>
            <input
              type="text"
              placeholder="Ej: Pozuelo de Alarcón, Madrid"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Ahorro Estimado / Beneficio</label>
            <input
              type="text"
              placeholder="Ej: 80% de ahorro anual"
              value={formData.savingsPercent}
              onChange={(e) => setFormData({ ...formData, savingsPercent: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Año de Finalización</label>
            <input
              type="text"
              placeholder="Ej: 2024"
              value={formData.completedYear}
              onChange={(e) => setFormData({ ...formData, completedYear: e.target.value })}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group admin-form-group--full">
            <label className="admin-label">Descripción Técnica</label>
            <textarea
              rows={3}
              placeholder="Detalles sobre número de módulos, modelo de inversor, estructura, protecciones y monitorización..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="admin-textarea"
            />
          </div>

          <div className="admin-form-group admin-form-group--full">
            <label className="admin-label">Etiquetas / Tags (separados por coma)</label>
            <input
              type="text"
              placeholder="Ej: Huawei, Tier 1, Autoconsumo, Baterías, Inyección Cero"
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
              <span>Destacar en la página de inicio (Sección Proyectos Destacados)</span>
            </label>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn--primary"
          >
            {isSubmitting ? 'Subiendo y procesando...' : 'Publicar Instalación'}
          </button>
        </div>
      </form>
    </div>
  );
}
