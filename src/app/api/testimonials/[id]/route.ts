import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const params = await props.params;
    const body = await request.json();
    const { clientName, role, company, content, rating, approved, order } = body;

    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        ...(clientName !== undefined && { clientName }),
        ...(role !== undefined && { role }),
        ...(company !== undefined && { company }),
        ...(content !== undefined && { content }),
        ...(rating !== undefined && { rating: Number(rating) }),
        ...(approved !== undefined && { approved: Boolean(approved) }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    return NextResponse.json({ error: 'Error al actualizar testimonio' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const params = await props.params;
    await prisma.testimonial.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    return NextResponse.json({ error: 'Error al eliminar testimonio' }, { status: 500 });
  }
}
