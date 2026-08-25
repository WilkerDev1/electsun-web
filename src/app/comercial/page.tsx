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

async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    return projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export default async function CommercialPage() {
  const projects = await getFeaturedProjects();

  return (
    <>
      <CommercialClient projects={projects} />
      <Footer />
    </>
  );
}
