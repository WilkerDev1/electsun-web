'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface HeroMediaAssetsProps {
  currentHeroUrl: string | null;
  onSelectHero: (url: string) => void;
  onUploadSuccess: (url: string) => void;
}

const DEFAULT_HERO_ASSETS = [
  { id: 'clean', url: '/images/hero-solar-clean.jpg', label: 'Clean Architecture' },
  { id: 'premium', url: '/images/hero-solar-premium.jpg', label: 'Solar Rooftop' },
  { id: 'sunset', url: '/images/hero-solar-sunset.jpg', label: 'Sunset Grid' },
  { id: 'commercial', url: '/images/project-commercial.jpg', label: 'Commercial Plant' },
];

export default function HeroMediaAssets({
  currentHeroUrl,
  onSelectHero,
  onUploadSuccess,
}: HeroMediaAssetsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        onUploadSuccess(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="adm-card">
      <div className="adm-card-header">
        <h3 className="adm-card-title" style={{ fontSize: '1rem' }}>Media Assets</h3>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          style={{
            background: 'none',
            border: 'none',
            color: '#D97706',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          {isUploading ? 'Uploading...' : '+ Upload'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png,image/jpeg,image/webp"
          style={{ display: 'none' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
        {DEFAULT_HERO_ASSETS.map((asset) => {
          const isActive = (currentHeroUrl || DEFAULT_HERO_ASSETS[0].url) === asset.url;
          return (
            <div
              key={asset.id}
              onClick={() => onSelectHero(asset.url)}
              style={{
                position: 'relative',
                height: '90px',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isActive ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                boxShadow: isActive ? '0 0 0 2px rgba(245, 158, 11, 0.2)' : 'none',
              }}
            >
              <Image
                src={asset.url}
                alt={asset.label}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                style={{ objectFit: 'cover' }}
              />
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    background: '#F59E0B',
                    color: '#0F172A',
                    fontWeight: 800,
                    fontSize: '0.625rem',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px',
                    letterSpacing: '0.04em',
                  }}
                >
                  ACTIVE
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
