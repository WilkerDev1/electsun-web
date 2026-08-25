'use client';

import { useState } from 'react';
import type { Project, SocialLink, SiteConfig } from '@/generated/prisma/client';
import AdminHeader from './AdminHeader';
import AdminTabs, { AdminTabType } from './AdminTabs';
import ProjectsTab from './ProjectsTab';
import ProjectUploadTab from './ProjectUploadTab';
import ProjectEditModal from './ProjectEditModal';
import CompanyConfigTab from './CompanyConfigTab';
import SocialLinksTab from './SocialLinksTab';
import Toast from './Toast';

interface AdminDashboardProps {
  initialProjects: Project[];
  initialSocialLinks: SocialLink[];
  initialSiteConfig: SiteConfig;
}

export default function AdminDashboard({
  initialProjects,
  initialSocialLinks,
  initialSiteConfig,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTabType>('projects');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const handleProjectCreated = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject].sort((a, b) => a.order - b.order));
    setActiveTab('projects');
  };

  const handleProjectUpdated = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p)).sort((a, b) => a.order - b.order)
    );
  };

  return (
    <div className="admin-layout">
      {/* Top Header */}
      <AdminHeader companyName={siteConfig.companyName || 'Electsun'} />

      {/* Main Admin Content Container */}
      <div className="admin-container">
        {/* Tab Navigation */}
        <AdminTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          projectCount={projects.length}
        />

        {/* Tab Views */}
        <main className="admin-main">
          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              setProjects={setProjects}
              onEdit={(proj) => setEditingProject(proj)}
              showToast={showToast}
            />
          )}

          {activeTab === 'upload' && (
            <ProjectUploadTab
              onSuccess={handleProjectCreated}
              showToast={showToast}
            />
          )}

          {activeTab === 'config' && (
            <CompanyConfigTab
              config={siteConfig}
              setConfig={setSiteConfig}
              showToast={showToast}
            />
          )}

          {activeTab === 'social' && (
            <SocialLinksTab
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Project Edit Modal */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={handleProjectUpdated}
          showToast={showToast}
        />
      )}

      {/* Reusable Toast */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}
