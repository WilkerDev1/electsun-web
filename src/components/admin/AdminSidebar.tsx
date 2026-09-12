'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

export type AdminTab =
  | 'overview'
  | 'banner'
  | 'milestones'
  | 'partners'
  | 'contact'
  | 'testimonials'
  | 'commercial';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onPublishAll?: () => Promise<void>;
  isSaving?: boolean;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  onPublishAll,
  isSaving = false,
}: AdminSidebarProps) {
  const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: 'Overview Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="adm-nav-icon">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: 'banner',
      label: 'Banner & Multimedia',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="adm-nav-icon">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      id: 'milestones',
      label: 'Corporate Milestones',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="adm-nav-icon">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      ),
    },
    {
      id: 'partners',
      label: 'Partner Logos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="adm-nav-icon">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact Info',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="adm-nav-icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="adm-nav-icon">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 'commercial',
      label: 'Commercial Gallery',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="adm-nav-icon">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="adm-sidebar">
      <div className="adm-sidebar-header">
        <div className="adm-brand">
          Electsun <span>Admin</span>
        </div>
      </div>

      <nav className="adm-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`adm-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="adm-sidebar-footer">
        {onPublishAll && (
          <button
            type="button"
            className="adm-publish-btn"
            style={{ width: '100%', marginBottom: '0.65rem' }}
            onClick={onPublishAll}
            disabled={isSaving}
          >
            {isSaving ? 'PUBLISHING...' : 'PUBLISH CHANGES'}
          </button>
        )}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="adm-live-btn"
        >
          <span>View Live Page</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        <button
          type="button"
          className="adm-signout-btn"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>SIGN OUT</span>
        </button>
      </div>
    </aside>
  );
}
