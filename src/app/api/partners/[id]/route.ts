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
    const { name, logoUrl, category, visible, order } = body;

    const partner = await prisma.partner.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(category !== undefined && { category }),
        ...(visible !== undefined && { visible: Boolean(visible) }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    return NextResponse.json(partner);
  } catch (error) {
    console.error('Failed to update partner:', error);
    return NextResponse.json({ error: 'Error al actualizar partner' }, { status: 500 });
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
    await prisma.partner.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete partner:', error);
    return NextResponse.json({ error: 'Error al eliminar partner' }, { status: 500 });
  }
}
