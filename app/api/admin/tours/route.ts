import { NextResponse } from 'next/server';
import { guard, jsonError, parseTourForm } from '@/lib/admin-api';
import { createTour } from '@/lib/tours';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;

  const parsed = await parseTourForm(request);
  if ('error' in parsed) return jsonError(parsed.error, 400);

  try {
    const id = await createTour(parsed.input, parsed.uploads, parsed.order);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error('[admin] create tour failed', error);
    return jsonError('Touri nuk u ruajt. Provoni përsëri.', 500);
  }
}
