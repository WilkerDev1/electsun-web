import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let config = await prisma.siteConfig.findUnique({
      where: { id: 'main' },
    });

    if (!config) {
      config = await prisma.siteConfig.create({
        data: { id: 'main' },
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to fetch config:', error);
    return NextResponse.json({ error: 'Error al obtener la configuración' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const {
      companyName,
      tagline,
      email,
      phone,
      address,
      bio,
      aboutText,
      stat1Value,
      stat1Label,
      stat2Value,
      stat2Label,
      stat3Value,
      stat3Label,
      stat4Value,
      stat4Label,
      heroImageUrl,
      logoUrl,
      heroTitle,
      heroSubtitle,
      heroCtaText,
      heroCtaUrl,
      heroBadge,
      commercialEmail,
      commercialPhone,
      commercialAddress,
      commercialDirector,
      commercialReceiptMsg,
      commercialMapUrl,
    } = body;

    const config = await prisma.siteConfig.upsert({
      where: { id: 'main' },
      update: {
        ...(companyName !== undefined && { companyName }),
        ...(tagline !== undefined && { tagline }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
        ...(bio !== undefined && { bio }),
        ...(aboutText !== undefined && { aboutText }),
        ...(stat1Value !== undefined && { stat1Value }),
        ...(stat1Label !== undefined && { stat1Label }),
        ...(stat2Value !== undefined && { stat2Value }),
        ...(stat2Label !== undefined && { stat2Label }),
        ...(stat3Value !== undefined && { stat3Value }),
        ...(stat3Label !== undefined && { stat3Label }),
        ...(stat4Value !== undefined && { stat4Value }),
        ...(stat4Label !== undefined && { stat4Label }),
        ...(heroImageUrl !== undefined && { heroImageUrl }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(heroTitle !== undefined && { heroTitle }),
        ...(heroSubtitle !== undefined && { heroSubtitle }),
        ...(heroCtaText !== undefined && { heroCtaText }),
        ...(heroCtaUrl !== undefined && { heroCtaUrl }),
        ...(heroBadge !== undefined && { heroBadge }),
        ...(commercialEmail !== undefined && { commercialEmail }),
        ...(commercialPhone !== undefined && { commercialPhone }),
        ...(commercialAddress !== undefined && { commercialAddress }),
        ...(commercialDirector !== undefined && { commercialDirector }),
        ...(commercialReceiptMsg !== undefined && { commercialReceiptMsg }),
        ...(commercialMapUrl !== undefined && { commercialMapUrl }),
      },
      create: {
        id: 'main',
        companyName: companyName || 'Electsun',
        tagline: tagline || 'Energía Solar y Soluciones Renovables',
        email: email || 'contacto@electsun.es',
        phone: phone || '+34 910 000 111',
        address: address || 'Parque Empresarial Tecnológico, Madrid',
        bio: bio || null,
        aboutText: aboutText || null,
        stat1Value: stat1Value || '650+',
        stat1Label: stat1Label || 'Instalaciones Realizadas',
        stat2Value: stat2Value || '18.5 MWp',
        stat2Label: stat2Label || 'Potencia Total Instalada',
        stat3Value: stat3Value || '85%',
        stat3Label: stat3Label || 'Ahorro Medio en Factura',
        stat4Value: stat4Value || '25 Años',
        stat4Label: stat4Label || 'Garantía de Rendimiento',
        heroImageUrl: heroImageUrl || null,
        logoUrl: logoUrl || null,
        heroTitle: heroTitle || 'Future of Energy',
        heroSubtitle: heroSubtitle || 'Sustainable solutions designed for modern infrastructure.',
        heroCtaText: heroCtaText || 'EXPLORE SOLUTIONS',
        heroCtaUrl: heroCtaUrl || '/comercial',
        heroBadge: heroBadge || 'Tecnología Tier 1 Certificada',
        commercialEmail: commercialEmail || 'commercial.contracts@electsun.net',
        commercialPhone: commercialPhone || '+1 (809) 378-6590',
        commercialAddress: commercialAddress || 'Electsun Center, Suite 1400, Santo Domingo, RD',
        commercialDirector: commercialDirector || 'Dr. Elena Vance, PE',
        commercialReceiptMsg: commercialReceiptMsg || 'Thank you for submitting your commercial facility parameters.',
        commercialMapUrl: commercialMapUrl || 'Santo Domingo, República Dominicana',
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to update config:', error);
    return NextResponse.json({ error: 'Error al actualizar la configuración' }, { status: 500 });
  }
}
