'use client';

import React, { useState } from 'react';
import type { Project, SiteConfig } from '@/generated/prisma/client';
import ProjectCardAdmin from './ProjectCardAdmin';
import MediaUploadZone from './MediaUploadZone';
import CommercialContactView from './CommercialContactView';

interface CommercialGalleryViewProps {
  projects: Project[];
  config: SiteConfig;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onToggleFeatured: (project: Project) => void;
  onUploadImageSuccess: (url: string) => void;
  onUpdateConfig: (updated: Partial<SiteConfig>) => Promise<void>;
  isSaving: boolean;
}

export default function CommercialGalleryView({
  projects,
  config,
  onEditProject,
  onDeleteProject,
  onToggleFeatured,
  onUploadImageSuccess,
  onUpdateConfig,
  isSaving,
}: CommercialGalleryViewProps) {
  const [subTab, setSubTab] = useState<'gallery' | 'contact'>('gallery');

  return (
    <div className="adm-content-container">
      {/* Top Header & Breadcrumb */}
      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', marginBottom: '0.5rem' }}>
        Admin &gt; Commercial Section &gt; Gallery &amp; Contact
      </div>

      <div className="adm-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="adm-page-title">Commercial Gallery &amp; Contact Settings</h1>
          <p className="adm-page-subtitle">
            Curate high-impact solar installations and configure official commercial enterprise inquiries.
          </p>
        </div>

        <a
          href="/comercial"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#F1F5F9',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#0F172A',
            textDecoration: 'none',
          }}
        >
          View Live Page ↗
        </a>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #E2E8F0', marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={() => setSubTab('gallery')}
          style={{
            background: 'none',
            border: 'none',
            paddingBottom: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            color: subTab === 'gallery' ? '#D97706' : '#64748B',
            borderBottom: subTab === 'gallery' ? '2px solid #D97706' : 'none',
          }}
        >
          Project Gallery
        </button>
        <button
          type="button"
          onClick={() => setSubTab('contact')}
          style={{
            background: 'none',
            border: 'none',
            paddingBottom: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            color: subTab === 'contact' ? '#D97706' : '#64748B',
            borderBottom: subTab === 'contact' ? '2px solid #D97706' : 'none',
          }}
        >
          Commercial Contact Info
        </button>
      </div>

      {subTab === 'gallery' ? (
        <div>
          {/* Subheader */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D97706' }}>
                Curation Suite
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Active Portfolio Assets
              </h2>
            </div>
            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '4px', background: '#F1F5F9', color: '#475569', fontWeight: 700 }}>
              {projects.length} Projects Published
            </span>
          </div>

          {/* Drag & Drop Photo Upload */}
          <MediaUploadZone onUploadComplete={onUploadImageSuccess} />

          {/* Grid of Projects */}
          <div className="adm-projects-grid">
            {projects.map((project) => (
              <ProjectCardAdmin
                key={project.id}
                project={project}
                onEdit={onEditProject}
                onDelete={onDeleteProject}
                onToggleFeatured={onToggleFeatured}
              />
            ))}
          </div>
        </div>
      ) : (
        <CommercialContactView
          config={config}
          onChange={onUpdateConfig}
          onSave={() => onUpdateConfig({})}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
