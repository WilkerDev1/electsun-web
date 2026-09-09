'use client';

import React from 'react';
import type { AdminTab } from './AdminSidebar';

interface AdminTopBarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onPublishAll: () => Promise<void>;
  isSaving: boolean;
}

export default function AdminTopBar({
  activeTab,
  setActiveTab,
  onPublishAll,
  isSaving,
}: AdminTopBarProps) {
  const topTabs: { id: AdminTab; label: string }[] = [
    { id: 'overview', label: 'Dashboard' },
    { id: 'milestones', label: 'Content' },
    { id: 'banner', label: 'Multimedia' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'contact', label: 'Settings' },
  ];

  return (
    <header className="adm-topbar">
      <nav className="adm-topbar-tabs">
        {topTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`adm-tab-link ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#64748B',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <span>View Live Page</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        <button
          type="button"
          className="adm-publish-btn"
          onClick={onPublishAll}
          disabled={isSaving}
        >
          {isSaving ? 'PUBLISHING...' : 'PUBLISH CHANGES'}
        </button>
      </div>
    </header>
  );
}
