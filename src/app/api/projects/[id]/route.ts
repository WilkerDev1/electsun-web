import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: `Proyecto no encontrado: ${id}` }, { status: 404 });
    }

    const {
      title,
      description,
      client,
      location,
      powerKw,
      systemType,
      savingsPercent,
      imageUrl,
      thumbnailUrl,
      category,
      tags,
      featured,
      order,
      completedYear,
    } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(client !== undefined && { client }),
        ...(location !== undefined && { location }),
        ...(powerKw !== undefined && { powerKw }),
        ...(systemType !== undefined && { systemType }),
        ...(savingsPercent !== undefined && { savingsPercent }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(category !== undefined && { category }),
        ...(tags !== undefined && {
          tags: typeof tags === 'string' ? tags : JSON.stringify(tags),
        }),
        ...(featured !== undefined && { featured }),
        ...(order !== undefined && { order: Number(order) }),
        ...(completedYear !== undefined && { completedYear }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ error: 'Error al actualizar el proyecto' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: `Proyecto no encontrado: ${id}` }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ error: 'Error al eliminar el proyecto' }, { status: 500 });
  }
}
