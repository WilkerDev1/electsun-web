import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const projects = await prisma.project.findMany({
      where: {
        ...(category && category !== 'All' && category !== 'Todos' ? { category } : {}),
        ...(featured === 'true' ? { featured: true } : {}),
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Error al obtener proyectos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
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

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'El título y la imagen del proyecto son obligatorios' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description: description || null,
        client: client || null,
        location: location || null,
        powerKw: powerKw || null,
        systemType: systemType || category || 'Residencial',
        savingsPercent: savingsPercent || null,
        imageUrl,
        thumbnailUrl: thumbnailUrl || null,
        category: category || 'Residencial',
        tags: typeof tags === 'string' ? tags : JSON.stringify(tags || []),
        featured: featured === true,
        order: Number(order) || 0,
        completedYear: completedYear || new Date().getFullYear().toString(),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 });
  }
}
