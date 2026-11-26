import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/** Serves a tour photo stored in the database. A photo's id never changes its content, so it caches for a year. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) return new Response('Not found', { status: 404 });

  const image = await prisma.tourImage.findUnique({
    where: { id },
    select: { data: true, mimeType: true, url: true },
  });
  if (!image) return new Response('Not found', { status: 404 });
  if (!image.data) {
    return image.url ? Response.redirect(image.url, 302) : new Response('Not found', { status: 404 });
  }

  return new Response(new Uint8Array(image.data), {
    headers: {
      'Content-Type': image.mimeType ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
