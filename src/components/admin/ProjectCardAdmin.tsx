'use client';

import React from 'react';
import Image from 'next/image';
import type { Project } from '@/generated/prisma/client';

interface ProjectCardAdminProps {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (p: Project) => void;
}

export default function ProjectCardAdmin({
  project,
  onEdit,
  onDelete,
  onToggleFeatured,
}: ProjectCardAdminProps) {
  const imageSrc = project.imageUrl || '/images/project-residential.jpg';

  return (
    <div className="adm-project-card">
      <div className="adm-project-thumb-box">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="adm-project-thumb-img"
        />
        {project.powerKw && (
          <span className="adm-power-tag">
            {project.powerKw}
          </span>
        )}
        <button
          type="button"
          onClick={() => onDelete(project.id)}
          title="Delete project"
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'rgba(239, 68, 68, 0.85)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '4px',
            width: '26px',
            height: '26px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
          }}
        >
          🗑
        </button>
      </div>

      <div className="adm-project-body">
        <div className="adm-project-meta-row">
          <span>{project.category || 'Residencial'}</span>
          <span style={{ color: '#94A3B8' }}>{project.completedYear || '2024'}</span>
        </div>

        <h3 className="adm-project-title">{project.title}</h3>
        <p className="adm-project-desc">{project.description || 'Sin descripción detallada.'}</p>

        <div className="adm-project-footer">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={project.featured}
              onChange={() => onToggleFeatured(project)}
            />
            <span>Featured on Frontpage</span>
          </label>

          <button
            type="button"
            onClick={() => onEdit(project)}
            style={{
              background: '#F1F5F9',
              border: 'none',
              padding: '0.35rem 0.65rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
