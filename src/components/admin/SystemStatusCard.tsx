'use client';

import React from 'react';

export default function SystemStatusCard() {
  return (
    <div className="adm-status-card">
      <div className="adm-status-title">System Status</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div className="adm-status-item">
          <span className="adm-status-dot" />
          <span>All systems operational</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
          Database: PostgreSQL 16 (solarsim-db)
        </div>
        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
          Tunnel: Cloudflare Zero Trust Active
        </div>
        <div style={{ fontSize: '0.75rem', color: '#94A3B8', borderTop: '1px solid #1E293B', paddingTop: '0.5rem' }}>
          Last backup: Automated (14-day retention)
        </div>
      </div>
    </div>
  );
}
