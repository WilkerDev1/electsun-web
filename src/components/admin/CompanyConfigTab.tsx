'use client';

import { useState } from 'react';
import type { SiteConfig } from '@/generated/prisma/client';

interface CompanyConfigTabProps {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export default function CompanyConfigTab({
  config,
  setConfig,
  showToast,
}: CompanyConfigTabProps) {
  const [formData, setFormData] = useState({
    companyName: config.companyName || 'Electsun',
    tagline: config.tagline || 'Energía Solar y Soluciones Renovables',
    email: config.email || 'contacto@electsun.es',
    phone: config.phone || '+34 910 000 111',
    address: config.address || 'Parque Empresarial Tecnológico, Madrid',
    bio: config.bio || '',
    aboutText: config.aboutText || '',
    stat1Value: config.stat1Value || '650+',
    stat1Label: config.stat1Label || 'Instalaciones Realizadas',
    stat2Value: config.stat2Value || '18.5 MWp',
    stat2Label: config.stat2Label || 'Potencia Total Instalada',
    stat3Value: config.stat3Value || '85%',
    stat3Label: config.stat3Label || 'Ahorro Medio en Factura',
    stat4Value: config.stat4Value || '25 Años',
    stat4Label: config.stat4Label || 'Garantía de Rendimiento',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al guardar configuración');

      const updated = await res.json();
      setConfig(updated);
      showToast('Datos de la empresa y métricas guardados correctamente');
    } catch {
      showToast('Error al guardar la información de la empresa', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2 className="admin-section__title">Identidad Corporativa y Métricas de Rendimiento</h2>
          <p className="admin-section__subtitle">
            Personaliza el nombre de la empresa, eslogan, datos de contacto oficiales y los contadores destacados de la web.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form-container">
        {/* Company Identity */}
        <div className="admin-card-group">
          <h3 className="admin-card-group__title">🏢 Datos de Empresa</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-label">Nombre Comercial</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Eslogan / Subtítulo</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Email de Contacto</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Teléfono de Atención</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group admin-form-group--full">
              <label className="admin-label">Dirección / Sede</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group admin-form-group--full">
              <label className="admin-label">Propuesta de Valor / Misión Corta</label>
              <textarea
                rows={2}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="admin-textarea"
              />
            </div>

            <div className="admin-form-group admin-form-group--full">
              <label className="admin-label">Texto Sobre Electsun (Historia y Compromiso)</label>
              <textarea
                rows={4}
                value={formData.aboutText}
                onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                className="admin-textarea"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Key Performance Indicators (KPIs) */}
        <div className="admin-card-group" style={{ marginTop: '24px' }}>
          <h3 className="admin-card-group__title">📊 Cifras y Métricas Clave (Portada)</h3>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-label">Métrica 1 (Valor)</label>
              <input
                type="text"
                value={formData.stat1Value}
                onChange={(e) => setFormData({ ...formData, stat1Value: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Métrica 1 (Etiqueta)</label>
              <input
                type="text"
                value={formData.stat1Label}
                onChange={(e) => setFormData({ ...formData, stat1Label: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Métrica 2 (Valor)</label>
              <input
                type="text"
                value={formData.stat2Value}
                onChange={(e) => setFormData({ ...formData, stat2Value: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Métrica 2 (Etiqueta)</label>
              <input
                type="text"
                value={formData.stat2Label}
                onChange={(e) => setFormData({ ...formData, stat2Label: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Métrica 3 (Valor)</label>
              <input
                type="text"
                value={formData.stat3Value}
                onChange={(e) => setFormData({ ...formData, stat3Value: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Métrica 3 (Etiqueta)</label>
              <input
                type="text"
                value={formData.stat3Label}
                onChange={(e) => setFormData({ ...formData, stat3Label: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Métrica 4 (Valor)</label>
              <input
                type="text"
                value={formData.stat4Value}
                onChange={(e) => setFormData({ ...formData, stat4Value: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Métrica 4 (Etiqueta)</label>
              <input
                type="text"
                value={formData.stat4Label}
                onChange={(e) => setFormData({ ...formData, stat4Label: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>
        </div>

        <div className="admin-form-actions" style={{ marginTop: '24px' }}>
          <button type="submit" disabled={isSaving} className="btn btn--primary">
            {isSaving ? 'Guardando...' : 'Guardar Datos de Empresa'}
          </button>
        </div>
      </form>
    </div>
  );
}
