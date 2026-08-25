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
              Architecting a sustainable future through intelligent solar technology and uncompromising design.
            </p>
            <div className="footer-copyright">
              © {currentYear} Electsun Renewable Energy. All rights reserved.
            </div>
          </div>

          {/* Categorized Navigation Columns */}
          <div className="footer-nav-cols">
            <div className="footer-col">
              <Link href="/#why-solar" className="footer-link">
                Residential Solutions
              </Link>
              <Link href="/proyectos" className="footer-link">
                Commercial Infrastructure
              </Link>
              <Link href="/#services" className="footer-link">
                Advanced Photovoltaics
              </Link>
            </div>

            <div className="footer-col">
              <Link href="/#stats" className="footer-link">
                Sustainability Impact
              </Link>
              <Link href="/#about" className="footer-link">
                Corporate Vision
              </Link>
              <Link href="/proyectos#lead-form" className="footer-link">
                Career Portal
              </Link>
            </div>

            <div className="footer-col">
              <Link href="/proyectos#lead-form" className="footer-link">
                Contact Support
              </Link>
              <Link href="/#why-solar" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/#why-solar" className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
