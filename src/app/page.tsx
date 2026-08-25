import prisma from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import WhySolarSection from '@/components/WhySolarSection';
import ServicesSection from '@/components/ServicesSection';
import ImpactPartnersSection from '@/components/ImpactPartnersSection';
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
      {/* 1. Hero Section (100vh) */}
      <HeroSection
        tagline={config?.tagline || 'Energía Solar para tu Futuro'}
        bio={
          config?.bio ||
          'Diseñamos la infraestructura del mañana con soluciones fotovoltaicas de alta eficiencia, adaptadas a empresas visionarias y hogares modernos.'
        }
      />

      {/* 2. Asymmetric Why Choose Solar Panels (100vh) */}
      <WhySolarSection />

      {/* 3. Deep Navy Services Section (100vh) */}
      <ServicesSection />

      {/* 4. Eco Technology Integration & Partners Marquee (100vh - Directamente debajo de Servicios) */}
      <ImpactPartnersSection />

      {/* 5. Corporate Footer */}
      <Footer />
    </>
  );
}
