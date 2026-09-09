'use client';

import React, { useState } from 'react';
import type { Testimonial } from '@/generated/prisma/client';

interface TestimonialsViewProps {
  testimonials: Testimonial[];
  onRefresh: () => Promise<void>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function TestimonialsView({
  testimonials,
  onRefresh,
  showToast,
}: TestimonialsViewProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [clientName, setClientName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !content) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, role, company, content, rating, approved: true }),
      });
      if (res.ok) {
        showToast('Testimonio añadido exitosamente');
        setIsAdding(false);
        setClientName('');
        setRole('');
        setCompany('');
        setContent('');
        await onRefresh();
      } else {
        showToast('Error al añadir testimonio', 'error');
      }
    } catch {
      showToast('Error de conexión', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleApproved = async (item: Testimonial) => {
    try {
      await fetch(`/api/testimonials/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !item.approved }),
      });
      showToast(item.approved ? 'Testimonio despublicado' : 'Testimonio aprobado');
      await onRefresh();
    } catch {
      showToast('Error al cambiar visibilidad', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este testimonio?')) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      showToast('Testimonio eliminado');
      await onRefresh();
    } catch {
      showToast('Error al eliminar', 'error');
    }
  };

  return (
    <div className="adm-content-container">
      <div className="adm-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="adm-page-title">Customer Testimonials</h1>
          <p className="adm-page-subtitle">Review customer feedback to ensure a premium editorial narrative.</p>
        </div>
        <button
          type="button"
          className="adm-publish-btn"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : '+ Add Testimonial'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="adm-card" style={{ marginBottom: '2rem' }}>
          <h3 className="adm-card-title" style={{ fontSize: '1rem', marginBottom: '1rem' }}>New Testimonial</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div className="adm-form-group">
              <label className="adm-label">Client Name *</label>
              <input type="text" className="adm-input" required value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Role / Cargo</label>
              <input type="text" className="adm-input" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Company / Empresa</label>
              <input type="text" className="adm-input" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>
          <div className="adm-form-group">
            <label className="adm-label">Review / Content *</label>
            <textarea className="adm-textarea" rows={3} required value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="adm-form-group" style={{ marginBottom: 0 }}>
              <label className="adm-label">Rating (1-5)</label>
              <select className="adm-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
              </select>
            </div>
            <button type="submit" className="adm-publish-btn" style={{ alignSelf: 'flex-end' }} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Testimonial'}
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {testimonials.map((t) => (
          <div key={t.id} className="adm-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t.clientName}</span>
                {t.company && <span style={{ color: '#64748B', fontSize: '0.8125rem' }}>({t.company})</span>}
                <span style={{ color: '#F59E0B', fontSize: '0.75rem' }}>{'★'.repeat(t.rating)}</span>
                <span style={{ fontSize: '0.625rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', background: t.approved ? '#ECFDF5' : '#FEF3C7', color: t.approved ? '#059669' : '#D97706' }}>
                  {t.approved ? 'APPROVED' : 'PENDING'}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#334155', fontStyle: 'italic', margin: 0 }}>&ldquo;{t.content}&rdquo;</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={() => handleToggleApproved(t)} style={{ background: '#F1F5F9', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                {t.approved ? 'Hide' : 'Approve'}
              </button>
              <button type="button" onClick={() => handleDelete(t.id)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
