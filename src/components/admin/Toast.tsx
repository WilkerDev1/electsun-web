'use client';

interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export default function Toast({ show, message, type }: ToastProps) {
  if (!show) return null;

  return (
    <div
      role="alert"
      className={`admin-toast admin-toast--${type}`}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        padding: '14px 24px',
        borderRadius: '12px',
        backgroundColor: type === 'success' ? '#064e3b' : '#7f1d1d',
        color: '#ffffff',
        border: `1px solid ${type === 'success' ? '#10b981' : '#ef4444'}`,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.95rem',
        fontWeight: 500,
        zIndex: 9999,
        animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span>{type === 'success' ? '✓' : '⚠️'}</span>
      <span>{message}</span>
    </div>
  );
}
