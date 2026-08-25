import type { Metadata } from 'next';
import TechnologyClient from '@/components/TechnologyClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ecosistema Tecnológico & Software SolarSim - Electsun',
  description:
    'Soluciones digitales y hardware de vanguardia para la independencia energética. Simulador SolarSim, monitoreo inteligente y equipamiento solar Tier 1.',
};

export const dynamic = 'force-dynamic';

export default function TechnologyPage() {
  return (
    <>
      <TechnologyClient />
      <Footer />
    </>
  );
}
