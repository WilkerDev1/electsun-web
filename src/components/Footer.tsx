'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-max">
        <div className="footer-grid">
          {/* Brand & Official White Logo */}
          <div className="footer-brand">
            <Link href="/" aria-label="Electsun">
              <Image
                src="/images/electsun-logo-white.svg"
                alt="Electsun - El sol a tu favor"
                width={200}
                height={52}
                style={{ width: 'auto', height: '46px', marginBottom: '20px' }}
              />
            </Link>
            <p>
              Diseñando e implementando el futuro de la energía solar con tecnología fotovoltaica inteligente y soporte continuo.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="tel:8093786590"
                style={{ color: 'var(--champagne)', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                809-378-6590
              </a>
              <a
                href="mailto:servicioalcliente@electsun.do"
                style={{ color: 'rgba(224, 227, 229, 0.85)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                servicioalcliente@electsun.do
              </a>
            </div>
            <div className="footer-copyright" style={{ marginTop: '20px' }}>
              © {currentYear} Electsun Dominicana. Todos los derechos reservados.
            </div>
          </div>

          {/* Categorized Navigation Columns */}
          <div className="footer-nav-cols">
            <div className="footer-col">
              <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--champagne)' }}>
                Soluciones
              </span>
              <Link href="/#why-solar" className="footer-link">
                Residencial
              </Link>
              <Link href="/proyectos" className="footer-link">
                Comercial e Industrial
              </Link>
              <Link href="/#services" className="footer-link">
                Baterías y Respaldo
              </Link>
            </div>

            <div className="footer-col">
              <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--champagne)' }}>
                Empresa
              </span>
              <Link href="/#stats" className="footer-link">
                Impacto y Experiencia
              </Link>
              <Link href="/#why-solar" className="footer-link">
                Beneficios Solares
              </Link>
              <Link href="/proyectos#lead-form" className="footer-link">
                Consultoría y Proyectos
              </Link>
            </div>

            <div className="footer-col">
              <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--champagne)' }}>
                Atención
              </span>
              <a href="https://wa.me/18093786590" target="_blank" rel="noopener noreferrer" className="footer-link">
                WhatsApp Directo
              </a>
              <Link href="/proyectos#lead-form" className="footer-link">
                Solicitar Cotización
              </Link>
              <Link href="/admin" className="footer-link">
                Acceso Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
