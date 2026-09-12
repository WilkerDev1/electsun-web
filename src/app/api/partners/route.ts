import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Failed to fetch partners:', error);
    return NextResponse.json({ error: 'Error al obtener partners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { name, logoUrl, category, visible, order } = body;

    if (!logoUrl && !name) {
      return NextResponse.json({ error: 'Debes proporcionar al menos un logotipo o nombre' }, { status: 400 });
    }

    const partner = await prisma.partner.create({
      data: {
        name: name !== undefined ? name.trim() : '',
        logoUrl: logoUrl ? logoUrl.trim() : '',
        category: category !== undefined ? category.trim() : '',
        visible: visible !== undefined ? Boolean(visible) : true,
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Failed to create partner:', error);
    return NextResponse.json({ error: 'Error al crear partner' }, { status: 500 });
  }
}
