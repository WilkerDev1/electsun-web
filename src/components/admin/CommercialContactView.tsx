'use client';

import React from 'react';
import type { SiteConfig } from '@/generated/prisma/client';

interface CommercialContactViewProps {
  config: SiteConfig;
  onChange: (updated: Partial<SiteConfig>) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export default function CommercialContactView({
  config,
  onChange,
  onSave,
  isSaving,
}: CommercialContactViewProps) {
  const email = config.commercialEmail || 'commercial.contracts@electsun.net';
  const phone = config.commercialPhone || '+1 (809) 378-6590';
  const address = config.commercialAddress || 'Electsun Center, Suite 1400, Santo Domingo, RD';
  const director = config.commercialDirector || 'Dr. Elena Vance, PE';
  const receiptMsg = config.commercialReceiptMsg || 'Thank you for submitting your commercial facility parameters. Our senior grid engineer will analyze local feeder capacities and provide preliminary feasibility analysis within 48 business hours.';
  const mapUrl = config.commercialMapUrl || 'Santo Domingo, República Dominicana';

  return (
    <div className="adm-card" style={{ marginTop: '2rem' }}>
      <div className="adm-card-header">
        <div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D97706' }}>
            Enterprise Channel
          </span>
          <h2 className="adm-card-title" style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>
            Commercial Inquiries & Liaison Setup
          </h2>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
          Direct routing to the Institutional RFP Committee
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div className="adm-form-group">
          <label className="adm-label">✉ Official Institutional Inquiries Email</label>
          <input
            type="email"
            className="adm-input"
            value={email}
            onChange={(e) => onChange({ commercialEmail: e.target.value })}
            placeholder="commercial.contracts@electsun.net"
          />
          <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>All institutional requests and tender proposals are routed to this address.</span>
        </div>

        <div className="adm-form-group">
          <label className="adm-label">📞 Dedicated RFP Hot-Line (Toll-Free)</label>
          <input
            type="text"
            className="adm-input"
            value={phone}
            onChange={(e) => onChange({ commercialPhone: e.target.value })}
            placeholder="+1 (809) 378-6590"
          />
          <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Mon-Fri 07:00 - 19:00 EST for immediate technical dispatch.</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div className="adm-form-group">
          <label className="adm-label">🏢 Commercial Engineering Headquarters</label>
          <input
            type="text"
            className="adm-input"
            value={address}
            onChange={(e) => onChange({ commercialAddress: e.target.value })}
            placeholder="Electsun Center, Suite 1400, Santo Domingo, RD"
          />
        </div>

        <div className="adm-form-group">
          <label className="adm-label">👨‍💼 Lead Technical Director</label>
          <input
            type="text"
            className="adm-input"
            value={director}
            onChange={(e) => onChange({ commercialDirector: e.target.value })}
            placeholder="Dr. Elena Vance, PE"
          />
        </div>
      </div>

      <div className="adm-form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <label className="adm-label" style={{ marginBottom: 0 }}>💬 Automated Submission Receipt Message (Client View)</label>
          <span style={{ fontSize: '0.6875rem', color: receiptMsg.length > 250 ? '#EF4444' : '#94A3B8', fontWeight: 600 }}>
            {receiptMsg.length} / 250 CHARACTERS
          </span>
        </div>
        <textarea
          className="adm-textarea"
          rows={3}
          maxLength={250}
          value={receiptMsg}
          onChange={(e) => onChange({ commercialReceiptMsg: e.target.value })}
        />
      </div>

      <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.25rem' }}>📍</span>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Interactive Office Map Linked</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Displaying: {mapUrl}</div>
          </div>
        </div>
        <input
          type="text"
          className="adm-input"
          style={{ width: '240px' }}
          value={mapUrl}
          onChange={(e) => onChange({ commercialMapUrl: e.target.value })}
          placeholder="Santo Domingo, RD"
        />
      </div>

      <div>
        <button
          type="button"
          className="adm-publish-btn"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? 'Deploying...' : 'Deploy Commercial Inquiries Setup'}
        </button>
      </div>
    </div>
  );
}
