import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AdminDashboard from '@/components/admin/AdminDashboard';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Panel de Control | Electsun',
  description: 'Gestión de proyectos, instalaciones solares, canales de contacto y datos corporativos.',
};

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch initial data on the server for instant loading
  const [projects, socialLinks, siteConfig, testimonials, partners] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.socialLink.findMany({ orderBy: { order: 'asc' } }),
    prisma.siteConfig.findUnique({ where: { id: 'main' } }),
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
    prisma.partner.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <AdminDashboard
      initialProjects={projects}
      initialSocialLinks={socialLinks}
      initialTestimonials={testimonials}
      initialPartners={partners}
      initialSiteConfig={
        siteConfig || {
          id: 'main',
          companyName: 'Electsun',
          tagline: 'Energía Solar y Soluciones Renovables',
          email: 'contacto@electsun.es',
          phone: '+34 910 000 111',
          address: 'Parque Empresarial Tecnológico, Madrid',
          bio: 'Especialistas en ingeniería, instalación y mantenimiento de sistemas fotovoltaicos y almacenamiento inteligente para hogares y empresas.',
          aboutText:
            'En Electsun lideramos la transición hacia un modelo energético sostenible y eficiente. Con más de 10 años de experiencia en el sector de las energías renovables, diseñamos soluciones llave en mano con componentes de máxima calidad (Tier 1) y garantías de hasta 25 años.',
          stat1Value: '650+',
          stat1Label: 'Instalaciones Realizadas',
          stat2Value: '18.5 MWp',
          stat2Label: 'Potencia Total Instalada',
          stat3Value: '85%',
          stat3Label: 'Ahorro Medio en Factura',
          stat4Value: '25 Años',
          stat4Label: 'Garantía de Rendimiento',
          heroImageUrl: null,
          logoUrl: null,
          heroTitle: 'Future of Energy',
          heroSubtitle: 'Sustainable solutions designed for modern infrastructure.',
          heroCtaText: 'EXPLORE SOLUTIONS',
          heroCtaUrl: '/servicios',
          heroBadge: 'INNOVACIÓN FOTOVOLTAICA 2026',
          commercialEmail: 'commercial.contracts@solaradmin-studio.com',
          commercialPhone: '+1(800) 542-SOLAR [Ext. 402]',
          commercialAddress: 'SolarAdmin Center, Suite 1400, 450 Lexington Avenue, New York, NY 10017',
          commercialDirector: 'Dr. Elena Vance, PE',
          commercialReceiptMsg: 'Thank you for submitting your commercial facility parameters. Our senior grid engineer will analyze local feeder capacities and provide preliminary feasibility analysis within 48 business hours.',
          commercialMapUrl: null,
        }
      }
    />
  );
}
