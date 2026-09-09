'use client';

import React from 'react';

interface AdminToastProps {
  message: string | null;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export default function AdminToast({ message, type = 'success', onClose }: AdminToastProps) {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      case 'info':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l2.5 2.5L16 9" />
          </svg>
        );
    }
  };

  return (
    <div className="adm-toast">
      {getIcon()}
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', marginLeft: '0.5rem' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
