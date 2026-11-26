import { NextResponse } from 'next/server';
import { guard, jsonError, parseId } from '@/lib/admin-api';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  const denied = await guard(request);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return jsonError('Mesazhi nuk u gjet.', 404);
  const body = (await request.json().catch(() => null)) as { read?: unknown } | null;
  if (typeof body?.read !== 'boolean') return jsonError('Kërkesa nuk është e vlefshme.', 400);

  const { count } = await prisma.contactMessage.updateMany({ where: { id }, data: { read: body.read } });
  if (count === 0) return jsonError('Mesazhi nuk u gjet.', 404);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const denied = await guard(request);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return jsonError('Mesazhi nuk u gjet.', 404);
  const { count } = await prisma.contactMessage.deleteMany({ where: { id } });
  if (count === 0) return jsonError('Mesazhi nuk u gjet.', 404);
  return NextResponse.json({ ok: true });
}
