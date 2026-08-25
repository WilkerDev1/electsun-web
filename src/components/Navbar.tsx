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
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#why-solar' },
    { label: 'Product', href: '/#services' },
    { label: 'Services', href: '/proyectos' },
    { label: 'Benefits', href: '/#why-solar' },
  ];

  return (
    <nav
      id="main-nav"
      className={`main-nav ${isScrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="nav-container">
        {/* Official White Electsun Logo */}
        <Link href="/" className="nav-logo" aria-label="Electsun Inicio">
          <Image
            src="/images/electsun-logo-white.svg"
            alt="Electsun - El sol a tu favor"
            width={185}
            height={48}
            style={{ width: 'auto', height: '42px', objectFit: 'contain' }}
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

        {/* Action Buttons & Admin Access */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/proyectos#lead-form"
            className="btn-champagne"
            style={{ padding: '10px 22px', fontSize: '12px' }}
          >
            Contact us
          </Link>

          <Link
            href="/proyectos#lead-form"
            className="btn-cyan-outline"
            style={{ padding: '10px 20px', fontSize: '12px' }}
          >
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
              width: '36px',
              height: '36px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--champagne)',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
            aria-label="Panel Admin"
          >
            <svg
              width="16"
              height="16"
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
              width: '36px',
              height: '36px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--champagne)',
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
            className="btn-champagne"
            style={{ marginTop: '12px', width: '100%' }}
          >
            Solicitar Cotización
          </Link>
        </div>
      )}
    </nav>
  );
}
