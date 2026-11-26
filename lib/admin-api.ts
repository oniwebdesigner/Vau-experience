import { NextResponse } from 'next/server';
import { isAdmin, sameOrigin } from './auth';
import { readUploads, type Upload } from './images';
import { parseOrder, type OrderToken } from './tours';
import { validateTourInput, type TourInput } from './tour-shared';

export const jsonError = (error: string, status: number) => NextResponse.json({ error }, { status });

/** Every admin API route starts with this: same-origin request + valid admin session. */
export async function guard(request: Request): Promise<NextResponse | null> {
  if (!sameOrigin(request)) return jsonError('Kërkesa u refuzua.', 403);
  if (!(await isAdmin())) return jsonError('Duhet të hyni në panel.', 401);
  return null;
}

export function parseId(value: string): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/** Reads the multipart body sent by the tour form: `data` (JSON), `order` (JSON) and `files`. */
export async function parseTourForm(
  request: Request,
): Promise<{ input: TourInput; uploads: Upload[]; order: OrderToken[] } | { error: string }> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return { error: 'Kërkesa nuk u lexua dot. Provoni me foto më të vogla.' };
  }

  let rawData: unknown;
  let rawOrder: unknown;
  try {
    rawData = JSON.parse(String(form.get('data') ?? ''));
    rawOrder = JSON.parse(String(form.get('order') ?? '[]'));
  } catch {
    return { error: 'Të dhënat nuk janë të vlefshme.' };
  }

  const validated = validateTourInput(rawData);
  if (!validated.ok) return { error: validated.error };

  const read = await readUploads(form.getAll('files'));
  if ('error' in read) return { error: read.error };

  const ordered = parseOrder(rawOrder, read.uploads.length);
  if ('error' in ordered) return { error: ordered.error };

  return { input: validated.data, uploads: read.uploads, order: ordered.order };
}
