import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminConfigured, clientIp, passwordMatches, sameOrigin, sessionCookieOptions, sessionToken } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Kërkesa u refuzua.' }, { status: 403 });
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'Paneli nuk është konfiguruar. Vendosni ADMIN_PASSWORD dhe AUTH_SECRET në server.' },
      { status: 503 },
    );
  }
  if (!rateLimit(`login:${clientIp(request)}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Shumë përpjekje. Provoni pas 15 minutash.' }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: 'Fjalëkalimi është i gabuar.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, sessionToken(), sessionCookieOptions);
  return response;
}
