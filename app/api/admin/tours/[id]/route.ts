import { NextResponse } from 'next/server';
import { guard, jsonError, parseId, parseTourForm } from '@/lib/admin-api';
import { prisma } from '@/lib/prisma';
import { updateTour } from '@/lib/tours';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  const denied = await guard(request);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return jsonError('Touri nuk u gjet.', 404);

  const parsed = await parseTourForm(request);
  if ('error' in parsed) return jsonError(parsed.error, 400);

  try {
    const result = await updateTour(id, parsed.input, parsed.uploads, parsed.order);
    if (result === false) return jsonError('Touri nuk u gjet.', 404);
    if (typeof result === 'string') return jsonError(result, 400);
    return NextResponse.json({ id });
  } catch (error) {
    console.error('[admin] update tour failed', error);
    return jsonError('Ndryshimet nuk u ruajtën. Provoni përsëri.', 500);
  }
}

/** Quick toggles from the tour list: publish / hide and featured. */
export async function PATCH(request: Request, { params }: Ctx) {
  const denied = await guard(request);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return jsonError('Touri nuk u gjet.', 404);

  const body = (await request.json().catch(() => null)) as { published?: unknown; featured?: unknown } | null;
  const data: { published?: boolean; featured?: boolean } = {};
  if (typeof body?.published === 'boolean') data.published = body.published;
  if (typeof body?.featured === 'boolean') data.featured = body.featured;
  if (Object.keys(data).length === 0) return jsonError('Asgjë për t’u ndryshuar.', 400);

  const tour = await prisma.tour.findUnique({ where: { id }, select: { isPremium: true } });
  if (!tour) return jsonError('Touri nuk u gjet.', 404);
  if (tour.isPremium) delete data.featured;

  await prisma.tour.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const denied = await guard(request);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return jsonError('Touri nuk u gjet.', 404);

  const { count } = await prisma.tour.deleteMany({ where: { id } }); // photos are removed with it (cascade)
  if (count === 0) return jsonError('Touri nuk u gjet.', 404);
  return NextResponse.json({ ok: true });
}
