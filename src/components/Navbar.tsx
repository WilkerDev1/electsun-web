'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide Navbar on Admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { label: 'Residential', href: '/#why-solar' },
    { label: 'Commercial', href: '/proyectos' },
    { label: 'Technology', href: '/#services' },
    { label: 'Impact', href: '/#stats' },
    { label: 'About', href: '/proyectos' },
  ];

  return (
    <nav
      id="main-nav"
      className={`main-nav ${isScrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="nav-container">
        {/* Official Electsun Logo */}
        <Link href="/" className="nav-logo" aria-label="Electsun Inicio">
          <Image
            src="/images/electsun-logo-color.svg"
            alt="Electsun - El sol a tu favor"
            width={180}
            height={46}
            style={{ width: 'auto', height: '40px', objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Admin Quick Access */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/proyectos#lead-form" className="btn-gold">
            Solicitar Cotización
          </Link>

          {/* Admin Lock Icon (Reliable SVG) */}
          <Link
            href="/admin"
            title="Panel de Administración"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'rgba(10, 25, 47, 0.06)',
              color: 'var(--deep-navy)',
              transition: 'all 0.2s ease',
            }}
            aria-label="Panel Admin"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </Link>

          {/* Mobile Menu Toggle (Reliable SVG) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--deep-navy)',
            }}
            className="md:hidden"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link"
              style={{ fontSize: '14px', padding: '8px 0' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/proyectos#lead-form"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-gold"
            style={{ marginTop: '12px', width: '100%' }}
          >
            Solicitar Cotización
          </Link>
        </div>
      )}
    </nav>
  );
}
