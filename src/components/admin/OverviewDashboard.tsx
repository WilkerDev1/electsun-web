'use client';

import React from 'react';
import type { AdminTab } from './AdminSidebar';
import SystemStatusCard from './SystemStatusCard';

interface OverviewDashboardProps {
  projectsCount: number;
  testimonialsCount: number;
  partnersCount: number;
  setActiveTab: (tab: AdminTab) => void;
  onOpenNewProject: () => void;
}

export default function OverviewDashboard({
  projectsCount,
  testimonialsCount,
  partnersCount,
  setActiveTab,
  onOpenNewProject,
}: OverviewDashboardProps) {
  return (
    <div className="adm-content-container">
      <div className="adm-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="adm-page-title">Overview Dashboard</h1>
          <p className="adm-page-subtitle">Manage and monitor your primary site content.</p>
        </div>
        <button
          type="button"
          onClick={onOpenNewProject}
          style={{ background: 'none', border: 'none', color: '#0F172A', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>+</span> NEW CONTENT
        </button>
      </div>

      {/* 4 Metric Cards (Reference 1) */}
      <div className="adm-metrics-grid">
        <div className="adm-metric-card" onClick={() => setActiveTab('banner')} style={{ cursor: 'pointer' }}>
          <div className="adm-metric-header"><span className="adm-metric-label">Active Banners</span></div>
          <div className="adm-metric-body">
            <span className="adm-metric-number">4</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
        </div>

        <div className="adm-metric-card" onClick={() => setActiveTab('milestones')} style={{ cursor: 'pointer' }}>
          <div className="adm-metric-header"><span className="adm-metric-label">Milestones</span></div>
          <div className="adm-metric-body">
            <span className="adm-metric-number">4</span>
            <span className="adm-metric-badge">Latest: 2026</span>
          </div>
        </div>

        <div className="adm-metric-card" onClick={() => setActiveTab('commercial')} style={{ cursor: 'pointer' }}>
          <div className="adm-metric-header"><span className="adm-metric-label">Gallery Items</span></div>
          <div className="adm-metric-body">
            <span className="adm-metric-number">{projectsCount}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        </div>

        <div className="adm-metric-card" onClick={() => setActiveTab('testimonials')} style={{ cursor: 'pointer' }}>
          <div className="adm-metric-header"><span className="adm-metric-label">Testimonials</span></div>
          <div className="adm-metric-body">
            <span className="adm-metric-number">{testimonialsCount}</span>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#D97706', textDecoration: 'underline' }}>Review Active</span>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="adm-two-col-grid">
        {/* Left: Recent Updates */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h2 className="adm-card-title">Recent Updates</h2>
            <button
              type="button"
              onClick={() => setActiveTab('commercial')}
              style={{ background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: 700, color: '#D97706', cursor: 'pointer', textDecoration: 'underline' }}
            >
              View All
            </button>
          </div>

          <div className="adm-feed-list">
            <div className="adm-feed-item">
              <div className="adm-feed-icon" style={{ background: '#EFF6FF', color: '#3B82F6' }}>🖼</div>
              <div className="adm-feed-info">
                <div className="adm-feed-text">Updated Hero Banner multimedia narrative for homepage.</div>
                <div className="adm-feed-meta">Active on live homepage hero</div>
              </div>
              <button type="button" onClick={() => setActiveTab('banner')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>✎</button>
            </div>

            <div className="adm-feed-item">
              <div className="adm-feed-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>💬</div>
              <div className="adm-feed-info">
                <div className="adm-feed-text">Verified {testimonialsCount} customer testimonials & client reviews.</div>
                <div className="adm-feed-meta">Published on Enterprise Section</div>
              </div>
              <button type="button" onClick={() => setActiveTab('testimonials')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>✎</button>
            </div>

            <div className="adm-feed-item">
              <div className="adm-feed-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>🏷</div>
              <div className="adm-feed-info">
                <div className="adm-feed-text">Verified {partnersCount} Tier 1 manufacturer partners.</div>
                <div className="adm-feed-meta">Published & verified on live production</div>
              </div>
              <button type="button" onClick={() => setActiveTab('partners')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>✎</button>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div>
          <div className="adm-card">
            <h2 className="adm-card-title" style={{ marginBottom: '1rem' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div onClick={() => setActiveTab('banner')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Upload Media</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Images or Videos</div>
                </div>
                <span>⬆</span>
              </div>
              <div onClick={() => setActiveTab('contact')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Update Contact Info</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Global settings</div>
                </div>
                <span>📍</span>
              </div>
            </div>
          </div>
          <SystemStatusCard />
        </div>
      </div>
    </div>
  );
}
