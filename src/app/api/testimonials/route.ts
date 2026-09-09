import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return NextResponse.json({ error: 'Error al obtener testimonios' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { clientName, role, company, content, rating, approved, order } = body;

    if (!clientName || !content) {
      return NextResponse.json({ error: 'Nombre y contenido son obligatorios' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        role: role || null,
        company: company || null,
        content,
        rating: rating !== undefined ? Number(rating) : 5,
        approved: approved !== undefined ? Boolean(approved) : true,
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    return NextResponse.json({ error: 'Error al crear testimonio' }, { status: 500 });
  }
}
