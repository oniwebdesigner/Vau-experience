import { NextResponse } from 'next/server';
import { guard, jsonError } from '@/lib/admin-api';
import { importSampleTours } from '@/lib/tours';

export const dynamic = 'force-dynamic';

/** Adds the demo tours from the approved design (skips any that already exist). */
export async function POST(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    return NextResponse.json({ created: await importSampleTours() });
  } catch (error) {
    console.error('[admin] sample import failed', error);
    return jsonError('Toure shembull nuk u ngarkuan.', 500);
  }
}
