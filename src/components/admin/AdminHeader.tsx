'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface AdminHeaderProps {
  companyName: string;
}

export default function AdminHeader({ companyName }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div className="admin-header__brand">
        <Link href="/" className="admin-header__logo-link">
          <Image
            src="/images/electsun-logo-white.svg"
            alt={companyName}
            width={160}
            height={40}
            style={{ width: 'auto', height: '36px' }}
          />
        </Link>
      </div>

      <div className="admin-header__actions">
        <Link href="/" target="_blank" className="btn btn--secondary btn--sm">
          <span>Ver Sitio Web</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="btn btn--danger btn--sm"
          title="Cerrar sesión"
        >
          <span>Cerrar Sesión</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
