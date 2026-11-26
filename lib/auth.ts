import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * Admin sign-in: one password (ADMIN_PASSWORD) and a server secret (AUTH_SECRET).
 * The cookie holds SHA-256(password:secret). Changing either value signs everyone out.
 * If either variable is missing, the admin is disabled (it never falls back to a default).
 */
export const ADMIN_COOKIE = 'vau_admin';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sha256(value: string): Buffer {
  return createHash('sha256').update(value).digest();
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET);
}

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.AUTH_SECRET) return false;
  // Compare digests so the length of the password never leaks through timing.
  return safeEqual(sha256(`pw:${input}`), sha256(`pw:${expected}`));
}

export function sessionToken(): string {
  return sha256(`${process.env.ADMIN_PASSWORD}:${process.env.AUTH_SECRET}`).toString('hex');
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MAX_AGE,
};

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  return safeEqual(Buffer.from(value), Buffer.from(sessionToken()));
}

/** Blocks cross-site requests to the admin API (works together with the SameSite cookie). */
export function sameOrigin(request: Request): boolean {
  if (request.headers.get('sec-fetch-site') === 'same-origin') return true;
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
