/**
 * Pure helpers shared by the admin form (browser) and the API (server):
 * types, limits, cleaning and validation of tour input. No server-only imports here.
 */
import { categories } from '../data/categories';
import type { Lang } from '../i18n/types';

export const LANG_LIST: Lang[] = ['sq', 'en', 'it'];
export const LANG_LABELS: Record<Lang, string> = { sq: 'Shqip', en: 'English', it: 'Italiano' };

export type L = Record<Lang, string>;
export type LList = Record<Lang, string[]>;

export const emptyL = (): L => ({ sq: '', en: '', it: '' });
export const emptyLList = (): LList => ({ sq: [], en: [], it: [] });

export const CATEGORY_KEYS: string[] = categories.map((c) => c.name);

export const LIMITS = {
  title: 150,
  subtitle: 250,
  summary: 600,
  description: 4000,
  duration: 80,
  location: 120,
  groupSize: 80,
  priceNote: 80,
  highlightItem: 200,
  highlightItems: 12,
  maxPrice: 10_000_000,
  maxImages: 12,
  maxImageBytes: 5 * 1024 * 1024,
} as const;

export interface TourInput {
  isPremium: boolean;
  category: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  price: number;
  pricePerPerson: number;
  title: L;
  subtitle: L;
  summary: L;
  description: L;
  duration: L;
  location: L;
  groupSize: L;
  priceNote: L;
  highlights: LList;
}

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim().slice(0, max) : '';
}

export function cleanL(raw: unknown, max: number): L {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return { sq: str(o.sq, max), en: str(o.en, max), it: str(o.it, max) };
}

export function cleanLList(raw: unknown): LList {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const one = (v: unknown): string[] =>
    (Array.isArray(v) ? v : [])
      .map((item) => str(item, LIMITS.highlightItem))
      .filter(Boolean)
      .slice(0, LIMITS.highlightItems);
  return { sq: one(o.sq), en: one(o.en), it: one(o.it) };
}

/** English / Italian fall back to Albanian when the admin left them empty. */
export function fillL(l: L): L {
  return { sq: l.sq, en: l.en || l.sq, it: l.it || l.sq };
}
export function fillLList(l: LList): LList {
  return { sq: l.sq, en: l.en.length ? l.en : l.sq, it: l.it.length ? l.it : l.sq };
}

function whole(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? Math.round(n) : NaN;
}

export type ValidationResult = { ok: true; data: TourInput } | { ok: false; error: string };

export function validateTourInput(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Të dhënat nuk janë të vlefshme.' };
  const r = raw as Record<string, unknown>;

  const isPremium = r.isPremium === true;
  const data: TourInput = {
    isPremium,
    category: isPremium ? '' : str(r.category, 40),
    featured: !isPremium && r.featured === true,
    published: r.published !== false,
    sortOrder: Math.max(-9999, Math.min(9999, whole(r.sortOrder) || 0)),
    price: whole(r.price),
    pricePerPerson: whole(r.pricePerPerson),
    title: cleanL(r.title, LIMITS.title),
    subtitle: isPremium ? cleanL(r.subtitle, LIMITS.subtitle) : emptyL(),
    summary: isPremium ? emptyL() : cleanL(r.summary, LIMITS.summary),
    description: cleanL(r.description, LIMITS.description),
    duration: cleanL(r.duration, LIMITS.duration),
    location: cleanL(r.location, LIMITS.location),
    groupSize: isPremium ? emptyL() : cleanL(r.groupSize, LIMITS.groupSize),
    priceNote: isPremium ? cleanL(r.priceNote, LIMITS.priceNote) : emptyL(),
    highlights: cleanLList(r.highlights),
  };

  if (!isPremium && !CATEGORY_KEYS.includes(data.category)) return { ok: false, error: 'Zgjidhni një kategori.' };
  if (!data.title.sq) return { ok: false, error: 'Titulli në shqip është i detyrueshëm.' };
  if (isPremium && !data.subtitle.sq) return { ok: false, error: 'Nëntitulli në shqip është i detyrueshëm.' };
  if (!isPremium && !data.summary.sq) return { ok: false, error: 'Përmbledhja në shqip është e detyrueshme.' };
  if (!data.description.sq) return { ok: false, error: 'Përshkrimi në shqip është i detyrueshëm.' };
  if (!data.duration.sq) return { ok: false, error: 'Kohëzgjatja në shqip është e detyrueshme.' };
  if (!data.location.sq) return { ok: false, error: 'Vendi në shqip është i detyrueshëm.' };
  if (!isPremium && !data.groupSize.sq) return { ok: false, error: 'Madhësia e grupit në shqip është e detyrueshme.' };
  if (isPremium && !data.priceNote.sq) return { ok: false, error: 'Shënimi i çmimit në shqip është i detyrueshëm.' };
  if (data.highlights.sq.length === 0) {
    return { ok: false, error: isPremium ? 'Shtoni të paktën një pikë te "Çfarë përfshihet".' : 'Shtoni të paktën një pikë kryesore.' };
  }

  if (!Number.isInteger(data.price) || data.price < 1 || data.price > LIMITS.maxPrice) {
    return { ok: false, error: 'Çmimi duhet të jetë një numër i plotë më i madh se 0.' };
  }
  if (isPremium) {
    if (!Number.isInteger(data.pricePerPerson) || data.pricePerPerson < 1 || data.pricePerPerson > LIMITS.maxPrice) {
      return { ok: false, error: 'Çmimi për person duhet të jetë një numër i plotë më i madh se 0.' };
    }
  } else {
    data.pricePerPerson = data.price;
  }

  return { ok: true, data };
}

/** URL-safe id from the Albanian title (ë → e, ç → c, ...). */
export function slugify(text: string): string {
  const slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug || 'tour';
}
