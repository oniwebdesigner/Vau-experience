import { NextResponse } from 'next/server';
import { clientIp } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim().slice(0, max) : '';

/** Contact form on /kontakt: stored in the database and shown in the admin under "Mesazhet". */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  // Hidden "website" field: real visitors never fill it. Pretend success so bots move on.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  if (!rateLimit(`contact:${clientIp(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'rate' }, { status: 429 });
  }

  const name = text(body.name, 160);
  const email = text(body.email, 200);
  const message = text(body.message, 4000);
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const guests = Number(body.guests);
  const lang = body.lang === 'en' || body.lang === 'it' ? body.lang : 'sq';

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        lang,
        tour: text(body.tour, 300) || null,
        date: text(body.date, 40) || null,
        guests: Number.isInteger(guests) && guests > 0 && guests < 1000 ? guests : null,
      },
    });
  } catch (error) {
    console.error('[contact] could not store message', error);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
