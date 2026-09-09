import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import CommercialClient from '@/components/CommercialClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Instalación Profesional y Proyectos Comerciales - Electsun',
  description:
    'Transformamos su techo en una fuente de energía limpia con precisión técnica y los más altos estándares de calidad de la industria.',
};

export const dynamic = 'force-dynamic';

async function getCommercialData() {
  try {
    const [projects, config] = await Promise.all([
      prisma.project.findMany({ orderBy: { order: 'asc' } }),
      prisma.siteConfig.findUnique({ where: { id: 'main' } }),
    ]);
    return { projects, config };
  } catch (error) {
    console.error('Error loading commercial data:', error);
    return { projects: [], config: null };
  }
}

export default async function CommercialPage() {
  const { projects, config } = await getCommercialData();

  return (
    <>
      <CommercialClient projects={projects} config={config} />
      <Footer />
    </>
  );
}
