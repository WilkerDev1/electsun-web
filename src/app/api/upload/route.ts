import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

/** Maximum longest dimension for generated project thumbnails */
const THUMB_MAX_PX = 1280;
/** WebP compression quality for thumbnails (0–100) */
const THUMB_QUALITY = 85;

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    // type: 'project' | 'hero' | 'logo'
    const uploadType = (formData.get('type') as string | null) ?? 'project';

    if (!file) {
      return NextResponse.json({ error: 'No se ha proporcionado ningún archivo' }, { status: 400 });
    }

    // Validate file type (image or svg)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no válido. Permitidos: JPEG, PNG, WebP, AVIF, SVG' },
        { status: 400 }
      );
    }

    // Generate unique base filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${randomStr}.${ext}`;

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Save original file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    const originalUrl = `/uploads/${filename}`;

    // If SVG, return as-is
    if (file.type === 'image/svg+xml') {
      return NextResponse.json({ url: originalUrl, thumbnailUrl: originalUrl }, { status: 201 });
    }

    // Generate thumbnail for project photos
    if (uploadType === 'project') {
      try {
        const thumbFilename = `thumb-${timestamp}-${randomStr}.webp`;
        const thumbFilepath = path.join(uploadsDir, thumbFilename);

        await sharp(buffer)
          .resize(THUMB_MAX_PX, THUMB_MAX_PX, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: THUMB_QUALITY })
          .toFile(thumbFilepath);

        const thumbnailUrl = `/uploads/${thumbFilename}`;
        return NextResponse.json({ url: originalUrl, thumbnailUrl }, { status: 201 });
      } catch (thumbError) {
        console.error('Error al generar miniatura, usando original:', thumbError);
        return NextResponse.json({ url: originalUrl, thumbnailUrl: originalUrl }, { status: 201 });
      }
    }

    return NextResponse.json({ url: originalUrl }, { status: 201 });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    return NextResponse.json({ error: 'Error al procesar la subida' }, { status: 500 });
  }
}
