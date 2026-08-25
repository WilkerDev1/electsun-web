import type { Metadata } from 'next';
import MaintenanceClient from '@/components/MaintenanceClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mantenimiento y Monitoreo Inteligente - Electsun',
  description:
    'Asegure el máximo rendimiento de su inversión solar con nuestro servicio proactivo. Supervisión en tiempo real y mantenimiento preventivo especializado.',
};

export const dynamic = 'force-dynamic';

export default function MaintenancePage() {
  return (
    <>
      <MaintenanceClient />
      <Footer />
    </>
  );
}
