'use client';

import React, { useState } from 'react';
import type { SiteConfig } from '@/generated/prisma/client';

interface MilestonesViewProps {
  config: SiteConfig;
  onUpdateConfig: (updated: Partial<SiteConfig>) => Promise<void>;
  isSaving: boolean;
}

export default function MilestonesView({ config, onUpdateConfig, isSaving }: MilestonesViewProps) {
  const [formData, setFormData] = useState({
    stat1Value: config.stat1Value || '1.2 GW',
    stat1Label: config.stat1Label || 'TOTAL ENERGY GENERATED',
    stat2Value: config.stat2Value || '500+',
    stat2Label: config.stat2Label || 'ENTERPRISE CLIENTS',
    stat3Value: config.stat3Value || '85%',
    stat3Label: config.stat3Label || 'AHORRO MEDIO EN FACTURA',
    stat4Value: config.stat4Value || '25 AÑOS',
    stat4Label: config.stat4Label || 'GARANTÍA DE RENDIMIENTO',
  });

  const [activeEditIndex, setActiveEditIndex] = useState<number | null>(null);

  const stats = [
    { key: 1, valField: 'stat1Value', lblField: 'stat1Label' },
    { key: 2, valField: 'stat2Value', lblField: 'stat2Label' },
    { key: 3, valField: 'stat3Value', lblField: 'stat3Label' },
    { key: 4, valField: 'stat4Value', lblField: 'stat4Label' },
  ];

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await onUpdateConfig(formData);
    setActiveEditIndex(null);
  };

  return (
    <div className="adm-content-container">
      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', marginBottom: '0.5rem' }}>
        Content &amp; Feedback Management &gt; Milestones
      </div>

      <div className="adm-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="adm-page-title">Corporate Milestones</h1>
          <p className="adm-page-subtitle">
            Manage corporate milestones, partner integrations, and review customer testimonials to ensure a premium editorial narrative.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActiveEditIndex(0)}
          className="adm-btn adm-btn-outline"
          style={{ borderColor: '#00D4FF', color: '#00D4FF', fontWeight: 700 }}
        >
          + Add Milestone
        </button>
      </div>

      {/* Grid of KPI Cards matching Reference 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((s, idx) => {
          const val = formData[s.valField as keyof typeof formData];
          const lbl = formData[s.lblField as keyof typeof formData];
          const isEditing = activeEditIndex === idx;

          return (
            <div
              key={s.key}
              className="adm-card"
              onClick={() => setActiveEditIndex(isEditing ? null : idx)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '180px',
                textAlign: 'center',
                border: isEditing ? '2px solid #D97706' : '1px solid #E2E8F0',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#92400E', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {val || '0'}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569', marginTop: '0.75rem' }}>
                {lbl}
              </div>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.5rem' }}>
                {isEditing ? '▼ Editando' : '✎ Clic para editar'}
              </span>
            </div>
          );
        })}

        {/* New Statistic Card (Dotted border matching Reference 2) */}
        <div
          onClick={() => setActiveEditIndex(3)}
          className="adm-card"
          style={{
            cursor: 'pointer',
            border: '2px dashed #CBD5E1',
            background: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '180px',
            color: '#64748B',
          }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            +
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            NEW STATISTIC
          </span>
        </div>
      </div>

      {/* Editor Panel when a milestone is selected */}
      {activeEditIndex !== null && (
        <form onSubmit={handleSave} className="adm-card" style={{ marginBottom: '2rem', border: '1px solid #FDE68A', background: '#FFFBEB' }}>
          <h3 className="adm-card-title" style={{ fontSize: '1rem', marginBottom: '1rem', color: '#92400E' }}>
            Editar Hito #{activeEditIndex + 1}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">Valor Destacado (ej. 1.2 GW / 500+)</label>
              <input
                type="text"
                className="adm-input"
                required
                value={formData[stats[activeEditIndex].valField as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [stats[activeEditIndex].valField]: e.target.value })}
              />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Etiqueta Descriptiva</label>
              <input
                type="text"
                className="adm-input"
                required
                value={formData[stats[activeEditIndex].lblField as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [stats[activeEditIndex].lblField]: e.target.value })}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" onClick={() => setActiveEditIndex(null)} className="adm-btn adm-btn-outline">
              Cerrar
            </button>
            <button type="submit" className="adm-publish-btn" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Aplicar y Guardar Hito'}
            </button>
          </div>
        </form>
      )}

      <div>
        <button type="button" className="adm-publish-btn" onClick={() => handleSave()} disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar Todos los Hitos'}
        </button>
      </div>
    </div>
  );
}
