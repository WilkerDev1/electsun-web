'use client';

import React, { useRef, useState } from 'react';

interface MediaUploadZoneProps {
  onUploadComplete: (url: string) => void;
}

export default function MediaUploadZone({ onUploadComplete }: MediaUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onUploadComplete(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className="adm-dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        style={{ display: 'none' }}
      />
      <div className="adm-dropzone-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <h3 className="adm-dropzone-title">Drag & Drop High-Resolution Project Photography</h3>
      <p className="adm-dropzone-sub">
        Upload RAW architectural renders or high-altitude aerial captures. We automatically process lossless WebP versions optimized for institutional bandwidth.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#E2E8F0', borderRadius: '4px', color: '#475569' }}>
          PNG, JPG, WEBP
        </span>
        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#E2E8F0', borderRadius: '4px', color: '#475569' }}>
          Max 20MB / file
        </span>
        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', background: '#DCFCE7', borderRadius: '4px', color: '#166534' }}>
          Sharp WebP Auto-Compress
        </span>
      </div>

      <button
        type="button"
        disabled={isUploading}
        style={{
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '0.65rem 1.5rem',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '0.8125rem',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isUploading ? 'COMPRESSING & UPLOADING...' : 'SELECT LOCAL FILES'}
      </button>
    </div>
  );
}
