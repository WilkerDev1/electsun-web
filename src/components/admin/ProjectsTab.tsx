'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/generated/prisma/client';

interface ProjectsTabProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onEdit: (project: Project) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export default function ProjectsTab({
  projects,
  setProjects,
  onEdit,
  showToast,
}: ProjectsTabProps) {
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = ['Todos', 'Residencial', 'Industrial', 'Baterías', 'Puntos de Recarga', 'Agrícola'];

  const filteredProjects = projects.filter((project) => {
    const matchesCat =
      filterCategory === 'Todos' ||
      project.category.toLowerCase() === filterCategory.toLowerCase() ||
      project.systemType.toLowerCase() === filterCategory.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.client && project.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.location && project.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.powerKw && project.powerKw.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const handleToggleFeatured = async (project: Project) => {
    const updatedFeatured = !project.featured;
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: updatedFeatured }),
      });

      if (!res.ok) throw new Error('Error al actualizar');

      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, featured: updated.featured } : p))
      );
      showToast(
        updatedFeatured
          ? 'Proyecto marcado como destacado'
          : 'Proyecto retirado de destacados'
      );
    } catch {
      showToast('No se pudo actualizar el estado de destacado', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este proyecto de instalación?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Proyecto eliminado correctamente');
    } catch {
      showToast('Error al eliminar el proyecto', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2 className="admin-section__title">Instalaciones y Proyectos Solares</h2>
          <p className="admin-section__subtitle">
            Administra el catálogo de proyectos ejecutados por Electsun, filtra por categoría o edita especificaciones técnicas.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-filter-bar">
        <div className="admin-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Buscar por título, cliente, potencia o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="admin-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`admin-pill ${filterCategory === cat ? 'admin-pill--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="admin-empty-state">
          <p>No se encontraron proyectos con los filtros aplicados.</p>
        </div>
      ) : (
        <div className="admin-projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="admin-project-card">
              <div className="admin-project-card__image-wrap">
                <Image
                  src={project.thumbnailUrl || project.imageUrl}
                  alt={project.title}
                  fill
                  className="admin-project-card__image"
                  sizes="(max-width: 768px) 100vw, 350px"
                  unoptimized
                />
                <span className="admin-project-card__category-badge">
                  {project.systemType || project.category}
                </span>
                {project.powerKw && (
                  <span className="admin-project-card__power-badge">
                    ⚡ {project.powerKw}
                  </span>
                )}
              </div>

              <div className="admin-project-card__body">
                <h3 className="admin-project-card__title">{project.title}</h3>
                
                {project.location && (
                  <p className="admin-project-card__meta">
                    📍 {project.location} {project.client ? `· ${project.client}` : ''}
                  </p>
                )}

                {project.savingsPercent && (
                  <p className="admin-project-card__savings">
                    🌱 {project.savingsPercent}
                  </p>
                )}

                <div className="admin-project-card__footer">
                  <button
                    onClick={() => handleToggleFeatured(project)}
                    className={`btn-icon ${project.featured ? 'btn-icon--featured' : ''}`}
                    title={project.featured ? 'Destacado en portada' : 'No destacado'}
                  >
                    ★
                  </button>

                  <div className="admin-project-card__actions">
                    <button
                      onClick={() => onEdit(project)}
                      className="btn btn--secondary btn--sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="btn btn--danger btn--sm"
                    >
                      {deletingId === project.id ? '...' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
