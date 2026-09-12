'use client';

import React, { useState } from 'react';
import type { Project, SocialLink, SiteConfig, Testimonial, Partner } from '@/generated/prisma/client';
import AdminSidebar, { AdminTab } from './AdminSidebar';
import OverviewDashboard from './OverviewDashboard';
import BannerMultimediaView from './BannerMultimediaView';
import MilestonesView from './MilestonesView';
import PartnersView from './PartnersView';
import ContactSettingsView from './ContactSettingsView';
import TestimonialsView from './TestimonialsView';
import CommercialGalleryView from './CommercialGalleryView';
import ProjectEditModal from './ProjectEditModal';
import AdminToast from './AdminToast';

interface AdminDashboardProps {
  initialProjects: Project[];
  initialSocialLinks: SocialLink[];
  initialSiteConfig: SiteConfig;
  initialTestimonials: Testimonial[];
  initialPartners: Partner[];
}

export default function AdminDashboard({
  initialProjects,
  initialSocialLinks,
  initialSiteConfig,
  initialTestimonials,
  initialPartners,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => setToast({ message, type });

  const handleSaveConfig = async (partialConfig: Partial<SiteConfig> = {}) => {
    setIsSaving(true);
    try {
      const merged = { ...siteConfig, ...partialConfig };
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Error al guardar la configuración');
      }
      const updated = await res.json();
      setSiteConfig(updated);
      showToast('Configuración actualizada con éxito');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar la configuración';
      showToast(msg, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      showToast(updated.featured ? 'Featured on homepage' : 'Removed from featured');
    } catch {
      showToast('Error toggling featured status', 'error');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this installation?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Project deleted successfully');
    } catch {
      showToast('Error deleting project', 'error');
    }
  };

  const handleUploadProjectImageSuccess = async (imageUrl: string) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Nueva Instalación Solar',
          description: 'Descripción del sistema y paneles solares.',
          systemType: 'Industrial',
          imageUrl,
          powerKw: '1.2 MWp',
          order: projects.length + 1,
          featured: true,
        }),
      });
      if (!res.ok) throw new Error();
      const newProj = await res.json();
      setProjects((prev) => [newProj, ...prev]);
      setEditingProject(newProj);
      showToast('Image uploaded! Adjust project details.');
    } catch {
      showToast('Error creating project with image', 'error');
    }
  };

  const handleRefreshPartners = async () => {
    const res = await fetch('/api/partners');
    if (res.ok) setPartners(await res.json());
  };

  const handleRefreshTestimonials = async () => {
    const res = await fetch('/api/testimonials');
    if (res.ok) setTestimonials(await res.json());
  };

  return (
    <div className="adm-layout">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPublishAll={() => handleSaveConfig({})}
        isSaving={isSaving}
      />
      <div className="adm-main">
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'overview' && (
            <OverviewDashboard
              projectsCount={projects.length}
              testimonialsCount={testimonials.length}
              partnersCount={partners.length}
              setActiveTab={setActiveTab}
              onOpenNewProject={() => setActiveTab('commercial')}
            />
          )}
          {activeTab === 'banner' && (
            <BannerMultimediaView
              config={siteConfig}
              onChange={(upd) => setSiteConfig((prev) => ({ ...prev, ...upd }))}
              onSave={(bannerData) => handleSaveConfig(bannerData)}
              isSaving={isSaving}
            />
          )}
          {activeTab === 'milestones' && <MilestonesView config={siteConfig} onUpdateConfig={handleSaveConfig} isSaving={isSaving} />}
          {activeTab === 'partners' && <PartnersView partners={partners} onRefresh={handleRefreshPartners} showToast={showToast} />}
          {activeTab === 'contact' && (
            <ContactSettingsView
              config={siteConfig}
              socialLinks={socialLinks}
              onSaveConfig={handleSaveConfig}
              onSocialLinksChange={setSocialLinks}
              showToast={showToast}
            />
          )}
          {activeTab === 'testimonials' && (
            <TestimonialsView testimonials={testimonials} onRefresh={handleRefreshTestimonials} showToast={showToast} />
          )}
          {activeTab === 'commercial' && (
            <CommercialGalleryView
              projects={projects}
              config={siteConfig}
              onEditProject={(p) => setEditingProject(p)}
              onDeleteProject={handleDeleteProject}
              onToggleFeatured={handleToggleFeatured}
              onUploadImageSuccess={handleUploadProjectImageSuccess}
              onUpdateConfig={handleSaveConfig}
              isSaving={isSaving}
            />
          )}
        </main>
      </div>

      {editingProject && (
        <ProjectEditModal
          key={editingProject.id}
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={(upd) => setProjects((prev) => prev.map((p) => (p.id === upd.id ? upd : p)))}
          showToast={showToast}
        />
      )}

      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
