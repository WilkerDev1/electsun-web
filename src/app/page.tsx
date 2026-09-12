import prisma from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import WhySolarSection from '@/components/WhySolarSection';
import ServicesSection from '@/components/ServicesSection';
import ImpactPartnersSection from '@/components/ImpactPartnersSection';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const [config, partners] = await Promise.all([
      prisma.siteConfig.findUnique({ where: { id: 'main' } }),
      prisma.partner.findMany({ orderBy: { order: 'asc' } }),
    ]);
    return { config, partners };
  } catch (error) {
    console.error('Error loading page data:', error);
    return { config: null, partners: [] };
  }
}

export default async function HomePage() {
  const { config, partners } = await getData();

  return (
    <>
      {/* 1. Hero Section (100vh) */}
      <HeroSection
        tagline={config?.heroTitle !== undefined ? config.heroTitle : (config?.tagline || 'Energía Solar para tu Futuro')}
        bio={
          config?.heroSubtitle !== undefined
            ? config.heroSubtitle
            : (config?.bio || 'Diseñamos la infraestructura del mañana con soluciones fotovoltaicas de alta eficiencia, adaptadas a empresas visionarias y hogares modernos.')
        }
        badge={config?.heroBadge !== undefined ? config.heroBadge : 'EL SOL A TU FAVOR'}
        ctaText={config?.heroCtaText !== undefined ? config.heroCtaText : 'Explorar Soluciones'}
        ctaUrl={config?.heroCtaUrl || '/comercial'}
        bgImage={config?.heroImageUrl || '/images/hero-solar.jpg'}
        overlayOpacity={config?.heroOverlayOpacity ?? 60}
        titleColor={config?.heroTitleColor ?? '#FFFFFF'}
        mediaType={config?.heroMediaType ?? 'image'}
      />

      {/* 2. Asymmetric Why Choose Solar Panels (100vh) */}
      <WhySolarSection />

      {/* 3. Deep Navy Services Section (100vh) */}
      <ServicesSection />

      {/* 4. Eco Technology Integration & Partners Marquee */}
      <ImpactPartnersSection config={config} partners={partners} />

      {/* 5. Corporate Footer */}
      <Footer />
    </>
  );
}
