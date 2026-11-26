import type { Prisma } from '@prisma/client';
import { prisma } from './prisma';
import type { Upload } from './images';
import {
  LIMITS,
  emptyL,
  emptyLList,
  fillL,
  fillLList,
  slugify,
  type L,
  type LList,
  type TourInput,
} from './tour-shared';
import { premiumTours as sampleTourPremium } from '../data/sample/premiumTours';
import { tours as sampleTours } from '../data/sample/tours';
import type { PremiumTour, Tour, TourCategory } from '../types/tour';

const PLACEHOLDER = '/placeholder.svg';

/* ---------- JSON <-> columns ---------- */

function parseL(json: string): L {
  try {
    const o = JSON.parse(json) as Record<string, unknown>;
    return { sq: String(o?.sq ?? ''), en: String(o?.en ?? ''), it: String(o?.it ?? '') };
  } catch {
    return emptyL();
  }
}

function parseLList(json: string): LList {
  try {
    const o = JSON.parse(json) as Record<string, unknown>;
    const one = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);
    return { sq: one(o?.sq), en: one(o?.en), it: one(o?.it) };
  } catch {
    return emptyLList();
  }
}

const j = (value: unknown) => JSON.stringify(value);

function toColumns(input: TourInput) {
  return {
    isPremium: input.isPremium,
    category: input.category,
    featured: input.featured,
    published: input.published,
    sortOrder: input.sortOrder,
    price: input.price,
    pricePerPerson: input.pricePerPerson,
    title: j(input.title),
    subtitle: j(input.subtitle),
    summary: j(input.summary),
    description: j(input.description),
    duration: j(input.duration),
    location: j(input.location),
    groupSize: j(input.groupSize),
    priceNote: j(input.priceNote),
    highlights: j(input.highlights),
  };
}

/* ---------- public site ---------- */

const withImages = {
  images: { select: { id: true, url: true, position: true }, orderBy: [{ position: 'asc' }, { id: 'asc' }] },
} satisfies Prisma.TourInclude;

type TourRow = Prisma.TourGetPayload<{ include: typeof withImages }>;

export const imageSrc = (img: { id: number; url: string | null }) => img.url ?? `/api/images/${img.id}`;

function rowToTour(row: TourRow): Tour {
  const gallery = row.images.map(imageSrc);
  const image = gallery[0] ?? PLACEHOLDER;
  return {
    id: row.slug,
    category: row.category as TourCategory,
    title: fillL(parseL(row.title)),
    summary: fillL(parseL(row.summary)),
    description: fillL(parseL(row.description)),
    duration: fillL(parseL(row.duration)),
    price: row.price,
    location: fillL(parseL(row.location)),
    groupSize: fillL(parseL(row.groupSize)),
    image,
    gallery: gallery.length > 0 ? gallery : [image],
    highlights: fillLList(parseLList(row.highlights)),
    featured: row.featured,
  };
}

function rowToPremium(row: TourRow): PremiumTour {
  return {
    id: row.slug,
    title: fillL(parseL(row.title)),
    subtitle: fillL(parseL(row.subtitle)),
    description: fillL(parseL(row.description)),
    duration: fillL(parseL(row.duration)),
    location: fillL(parseL(row.location)),
    price: row.price,
    priceNote: fillL(parseL(row.priceNote)),
    pricePerPerson: row.pricePerPerson,
    image: row.images[0] ? imageSrc(row.images[0]) : PLACEHOLDER,
    includes: fillLList(parseLList(row.highlights)),
  };
}

/** Published tours for the public pages. If the database is down the site still renders (without tours). */
export async function getPublicTours(): Promise<{ tours: Tour[]; premiumTours: PremiumTour[] }> {
  try {
    const rows = await prisma.tour.findMany({
      where: { published: true },
      include: withImages,
      orderBy: [{ sortOrder: 'asc' }, { id: 'desc' }],
    });
    return {
      tours: rows.filter((r) => !r.isPremium).map(rowToTour),
      premiumTours: rows.filter((r) => r.isPremium).map(rowToPremium),
    };
  } catch (error) {
    console.error('[tours] could not load tours from the database', error);
    return { tours: [], premiumTours: [] };
  }
}

/* ---------- admin ---------- */

export interface AdminImage {
  id: number;
  src: string;
}

export interface AdminTour {
  id: number;
  slug: string;
  input: TourInput;
  images: AdminImage[];
}

function rowToAdmin(row: TourRow): AdminTour {
  return {
    id: row.id,
    slug: row.slug,
    input: {
      isPremium: row.isPremium,
      category: row.category,
      featured: row.featured,
      published: row.published,
      sortOrder: row.sortOrder,
      price: row.price,
      pricePerPerson: row.pricePerPerson,
      title: parseL(row.title),
      subtitle: parseL(row.subtitle),
      summary: parseL(row.summary),
      description: parseL(row.description),
      duration: parseL(row.duration),
      location: parseL(row.location),
      groupSize: parseL(row.groupSize),
      priceNote: parseL(row.priceNote),
      highlights: parseLList(row.highlights),
    },
    images: row.images.map((img) => ({ id: img.id, src: imageSrc(img) })),
  };
}

export async function getAdminTours(): Promise<AdminTour[]> {
  const rows = await prisma.tour.findMany({
    include: withImages,
    orderBy: [{ isPremium: 'asc' }, { sortOrder: 'asc' }, { id: 'desc' }],
  });
  return rows.map(rowToAdmin);
}

export async function getAdminTour(id: number): Promise<AdminTour | null> {
  const row = await prisma.tour.findUnique({ where: { id }, include: withImages });
  return row ? rowToAdmin(row) : null;
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  for (let n = 2; await prisma.tour.findUnique({ where: { slug }, select: { id: true } }); n += 1) {
    slug = `${base}-${n}`;
  }
  return slug;
}

/**
 * Photo order sent by the form: "e:<imageId>" keeps an existing photo, "n:<index>" places the
 * index-th uploaded file. The first entry is the cover. Anything not listed is deleted.
 */
export type OrderToken = { kind: 'existing'; id: number } | { kind: 'new'; index: number };

export function parseOrder(raw: unknown, uploadCount: number): { order: OrderToken[] } | { error: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { error: 'Shtoni të paktën një foto.' };
  if (raw.length > LIMITS.maxImages) return { error: `Maksimumi ${LIMITS.maxImages} foto për tour.` };
  const order: OrderToken[] = [];
  const seen = new Set<string>();
  for (const token of raw) {
    if (typeof token !== 'string' || seen.has(token)) return { error: 'Renditja e fotove nuk është e vlefshme.' };
    seen.add(token);
    const [kind, value] = token.split(':');
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0) return { error: 'Renditja e fotove nuk është e vlefshme.' };
    if (kind === 'e') order.push({ kind: 'existing', id: n });
    else if (kind === 'n' && n < uploadCount) order.push({ kind: 'new', index: n });
    else return { error: 'Renditja e fotove nuk është e vlefshme.' };
  }
  return { order };
}

const TX = { timeout: 60_000, maxWait: 10_000 };

export async function createTour(input: TourInput, uploads: Upload[], order: OrderToken[]): Promise<number> {
  const slug = await uniqueSlug(slugify(input.title.sq));
  return prisma.$transaction(async (tx) => {
    const tour = await tx.tour.create({ data: { ...toColumns(input), slug }, select: { id: true } });
    for (const [position, token] of order.entries()) {
      if (token.kind !== 'new') continue;
      const file = uploads[token.index];
      await tx.tourImage.create({
        data: { tourId: tour.id, data: file.data, mimeType: file.mimeType, position },
      });
    }
    return tour.id;
  }, TX);
}

/** Returns false when the tour does not exist. */
export async function updateTour(id: number, input: TourInput, uploads: Upload[], order: OrderToken[]): Promise<boolean | string> {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.tourImage.findMany({ where: { tourId: id }, select: { id: true } });
    const existingIds = new Set(existing.map((img) => img.id));
    const kept = order.filter((t): t is Extract<OrderToken, { kind: 'existing' }> => t.kind === 'existing');
    if (kept.some((t) => !existingIds.has(t.id))) return 'Një foto nuk i përket këtij touri.';
    if (!(await tx.tour.findUnique({ where: { id }, select: { id: true } }))) return false;

    await tx.tourImage.deleteMany({ where: { tourId: id, id: { notIn: kept.map((t) => t.id) } } });
    for (const [position, token] of order.entries()) {
      if (token.kind === 'existing') {
        await tx.tourImage.update({ where: { id: token.id }, data: { position } });
      } else {
        const file = uploads[token.index];
        await tx.tourImage.create({ data: { tourId: id, data: file.data, mimeType: file.mimeType, position } });
      }
    }
    await tx.tour.update({ where: { id }, data: toColumns(input) });
    return true;
  }, TX);
}

/** One-click demo content: the sample tours from the approved design (photos are placeholders). */
export async function importSampleTours(): Promise<number> {
  let created = 0;
  const add = async (
    slug: string,
    input: TourInput,
    photos: string[],
  ) => {
    if (await prisma.tour.findUnique({ where: { slug }, select: { id: true } })) return;
    await prisma.tour.create({
      data: {
        ...toColumns(input),
        slug,
        images: { create: [...new Set(photos)].map((url, position) => ({ url, position })) },
      },
    });
    created += 1;
  };

  for (const [i, t] of sampleTours.entries()) {
    await add(
      t.id,
      {
        isPremium: false,
        category: t.category,
        featured: Boolean(t.featured),
        published: true,
        sortOrder: i,
        price: t.price,
        pricePerPerson: t.price,
        title: t.title,
        subtitle: emptyL(),
        summary: t.summary,
        description: t.description,
        duration: t.duration,
        location: t.location,
        groupSize: t.groupSize,
        priceNote: emptyL(),
        highlights: t.highlights,
      },
      t.gallery.length > 0 ? t.gallery : [t.image],
    );
  }
  for (const [i, t] of sampleTourPremium.entries()) {
    await add(
      t.id,
      {
        isPremium: true,
        category: '',
        featured: false,
        published: true,
        sortOrder: i,
        price: t.price,
        pricePerPerson: t.pricePerPerson,
        title: t.title,
        subtitle: t.subtitle,
        summary: emptyL(),
        description: t.description,
        duration: t.duration,
        location: t.location,
        groupSize: emptyL(),
        priceNote: t.priceNote,
        highlights: t.includes,
      },
      [t.image],
    );
  }
  return created;
}
