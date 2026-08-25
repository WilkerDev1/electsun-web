import prisma from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import WhySolarSection from '@/components/WhySolarSection';
import ServicesSection from '@/components/ServicesSection';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

async function getSiteConfig() {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { id: 'main' },
    });
    return config;
  } catch (error) {
    console.error('Error loading site config:', error);
    return null;
  }
}

export default async function HomePage() {
  const config = await getSiteConfig();

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection
        tagline={config?.tagline || 'Energía Solar para tu Futuro'}
        bio={
          config?.bio ||
          'Diseñamos la infraestructura del mañana con soluciones fotovoltaicas de alta eficiencia, adaptadas a empresas visionarias y hogares modernos.'
        }
      />

      {/* 2. Floating Stats KPI Section */}
      <StatsSection
        stat1Value={config?.stat1Value || '50MW+'}
        stat1Label={config?.stat1Label || 'Energía Generada'}
        stat2Value={config?.stat2Value || '10k+'}
        stat2Label={config?.stat2Label || 'Clientes Satisfechos'}
        stat3Value={config?.stat4Value || '15'}
        stat3Label={config?.stat4Label || 'Años de Experiencia'}
      />

      {/* 3. Asymmetric Why Choose Solar Panels (Full Screen) */}
      <WhySolarSection />

      {/* 4. Deep Navy Services Section (Full Screen) */}
      <ServicesSection />

      {/* 5. Trust Badges / Client Logos */}
      <TrustSection />

      {/* 6. Corporate Footer */}
      <Footer />
    </>
  );
}
