import type { Metadata } from 'next';
import ConsultingClient from '@/components/ConsultingClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Consultoría y Proyectos Especiales - Electsun',
  description:
    'Soluciones de ingeniería a medida y asesoramiento estratégico para proyectos de energía renovable a gran escala.',
};

export const dynamic = 'force-dynamic';

export default function ProyectosPage() {
  return (
    <>
      <ConsultingClient />
      <Footer />
    </>
  );
}
