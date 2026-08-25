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

  // Pages with a light top banner when not scrolled
  const isLightPage = pathname === '/mantenimiento';
  // When scrolled, we always use the dark frosted glass theme with white text/logo
  const isLightNav = isLightPage && !isScrolled;

  const navLinks = [
    { label: 'Residential', href: '/#why-solar' },
    { label: 'Commercial', href: '/comercial' },
    { label: 'Technology', href: '/#services' },
    { label: 'Impact', href: '/#impact' },
    { label: 'About', href: '/#why-solar' },
  ];

  return (
    <nav
      id="main-nav"
      className={`main-nav ${isScrolled ? 'nav-scrolled' : ''} ${isLightNav ? 'nav-light' : 'nav-dark'}`}
    >
      <div className="nav-container">
        {/* Dynamic Logo (Color on light banner, White on dark banner / scrolled) */}
        <Link href="/" className="nav-logo" aria-label="Electsun Inicio">
          <Image
            src={isLightNav ? '/images/electsun-logo-color.svg' : '/images/electsun-logo-white.svg'}
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
                className={`nav-link ${isLightNav ? 'nav-link-light' : 'nav-link-dark'} ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Admin Access */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/proyectos#lead-form" className="btn-gold">
            Solicitar Cotización
          </Link>

          {/* Admin Lock Icon */}
          <Link
            href="/admin"
            title="Panel de Administración"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '4px',
              background: isLightNav ? 'rgba(10, 25, 47, 0.06)' : 'rgba(255, 255, 255, 0.08)',
              color: isLightNav ? 'var(--deep-navy)' : '#FFFFFF',
              transition: 'all 0.2s ease',
              border: isLightNav ? '1px solid rgba(10, 25, 47, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
            }}
            aria-label="Panel Admin"
          >
            <svg
              width="17"
              height="17"
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

          {/* Mobile Menu Toggle */}
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
              color: isLightNav ? 'var(--deep-navy)' : '#FFFFFF',
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
            background: 'rgba(10, 25, 47, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
              style={{ fontSize: '15px', padding: '8px 0', color: '#FFFFFF' }}
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
