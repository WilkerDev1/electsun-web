import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Electsun - Energía Solar Inteligente',
  description:
    'Diseñamos la infraestructura del mañana con soluciones fotovoltaicas de alta eficiencia, adaptadas a empresas visionarias y hogares modernos.',
  openGraph: {
    title: 'Electsun - Energía Solar Inteligente',
    description:
      'Soluciones fotovoltaicas de alta eficiencia, autoconsumo, baterías y recarga de vehículos eléctricos.',
    siteName: 'Electsun',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electsun - Energía Solar Inteligente',
    description:
      'Soluciones fotovoltaicas de alta eficiencia para empresas y hogares.',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
