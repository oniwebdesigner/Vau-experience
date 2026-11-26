'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { categories } from '../../data/categories';
import type { Lang } from '../../i18n/types';
import type { AdminTour } from '../../lib/tours';
import {
  LANG_LABELS,
  LANG_LIST,
  LIMITS,
  emptyL,
  type L,
  type TourInput,
} from '../../lib/tour-shared';
import { btn, cardCls, inputCls, labelCls } from './ui';

type LocalizedKey = 'title' | 'subtitle' | 'summary' | 'description' | 'duration' | 'location' | 'groupSize' | 'priceNote';

interface FormState {
  isPremium: boolean;
  category: string;
  featured: boolean;
  published: boolean;
  sortOrder: string;
  price: string;
  pricePerPerson: string;
  title: L;
  subtitle: L;
  summary: L;
  description: L;
  duration: L;
  location: L;
  groupSize: L;
  priceNote: L;
  /** One point per line, per language. */
  highlights: L;
}

type Photo =
  | { key: string; kind: 'existing'; id: number; src: string }
  | { key: string; kind: 'new'; file: File; src: string };

function initialState(input?: TourInput): FormState {
  if (!input) {
    return {
      isPremium: false,
      category: categories[0].name,
      featured: false,
      published: true,
      sortOrder: '0',
      price: '',
      pricePerPerson: '',
      title: emptyL(),
      subtitle: emptyL(),
      summary: emptyL(),
      description: emptyL(),
      duration: emptyL(),
      location: emptyL(),
      groupSize: emptyL(),
      priceNote: emptyL(),
      highlights: emptyL(),
    };
  }
  return {
    isPremium: input.isPremium,
    category: input.category || categories[0].name,
    featured: input.featured,
    published: input.published,
    sortOrder: String(input.sortOrder),
    price: String(input.price),
    pricePerPerson: String(input.pricePerPerson),
    title: input.title,
    subtitle: input.subtitle,
    summary: input.summary,
    description: input.description,
    duration: input.duration,
    location: input.location,
    groupSize: input.groupSize,
    priceNote: input.priceNote,
    highlights: {
      sq: input.highlights.sq.join('\n'),
      en: input.highlights.en.join('\n'),
      it: input.highlights.it.join('\n'),
    },
  };
}

/** Resizes to at most 1800 px and re-encodes as JPEG, so uploads stay small and the database light. */
async function compressImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
  if (!blob) throw new Error('encode');
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '') || 'foto'}.jpg`, { type: 'image/jpeg' });
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <span className={labelCls}>{label}</span>
      {children}
      {hint && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}

export function TourForm({ tour }: { tour?: AdminTour }) {
  const router = useRouter();
  const [f, setF] = useState<FormState>(() => initialState(tour?.input));
  const [lang, setLang] = useState<Lang>('sq');
  const [photos, setPhotos] = useState<Photo[]>(() =>
    (tour?.images ?? []).map((img) => ({ key: `e${img.id}`, kind: 'existing' as const, id: img.id, src: img.src })),
  );
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const previews = useRef<string[]>([]);

  useEffect(() => {
    const urls = previews.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setF((prev) => ({ ...prev, [key]: value }));
  const setLoc = (key: LocalizedKey | 'highlights', value: string) =>
    setF((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: value } }));

  const addFiles = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setError('');
    const room = LIMITS.maxImages - photos.length;
    if (room <= 0) {
      setError(`Maksimumi ${LIMITS.maxImages} foto për tour.`);
      return;
    }
    setProcessing(true);
    const added: Photo[] = [];
    try {
      for (const file of Array.from(list).slice(0, room)) {
        try {
          const small = await compressImage(file);
          const src = URL.createObjectURL(small);
          previews.current.push(src);
          added.push({ key: `n${Date.now()}-${added.length}-${Math.random().toString(36).slice(2, 7)}`, kind: 'new', file: small, src });
        } catch {
          setError(`"${file.name}" nuk u lexua. Përdorni foto JPG, PNG ose WebP.`);
        }
      }
    } finally {
      setPhotos((prev) => [...prev, ...added]);
      setProcessing(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const movePhoto = (index: number, delta: number) =>
    setPhotos((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const removePhoto = (index: number) => setPhotos((prev) => prev.filter((_, i) => i !== index));

  const lines = (value: string) =>
    value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (processing) return;
    setError('');
    if (photos.length === 0) {
      setError('Shtoni të paktën një foto.');
      return;
    }

    const payload = {
      isPremium: f.isPremium,
      category: f.category,
      featured: f.featured,
      published: f.published,
      sortOrder: Number(f.sortOrder) || 0,
      price: Number(f.price),
      pricePerPerson: f.isPremium ? Number(f.pricePerPerson) : Number(f.price),
      title: f.title,
      subtitle: f.subtitle,
      summary: f.summary,
      description: f.description,
      duration: f.duration,
      location: f.location,
      groupSize: f.groupSize,
      priceNote: f.priceNote,
      highlights: { sq: lines(f.highlights.sq), en: lines(f.highlights.en), it: lines(f.highlights.it) },
    };

    const form = new FormData();
    form.set('data', JSON.stringify(payload));
    const uploads = photos.filter((p): p is Extract<Photo, { kind: 'new' }> => p.kind === 'new');
    uploads.forEach((p) => form.append('files', p.file));
    form.set(
      'order',
      JSON.stringify(
        photos.map((p) => (p.kind === 'existing' ? `e:${p.id}` : `n:${uploads.findIndex((u) => u.key === p.key)}`)),
      ),
    );

    setBusy(true);
    try {
      const res = await fetch(tour ? `/api/admin/tours/${tour.id}` : '/api/admin/tours', {
        method: tour ? 'PUT' : 'POST',
        body: form,
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? 'Touri nuk u ruajt.');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Nuk u arrit lidhja me serverin. Kontrolloni internetin dhe provoni përsëri.');
    } finally {
      setBusy(false);
    }
  };

  const premium = f.isPremium;
  const missingTranslations = LANG_LIST.filter(
    (l) => l !== 'sq' && (!f.title[l].trim() || !f.description[l].trim()),
  );

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <Link href="/admin" className="text-[14px] text-ink-soft underline underline-offset-2 hover:text-ink">
          ← Kthehu te touret
        </Link>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em]">
          {tour ? 'Ndrysho tourin' : 'Tour i ri'}
        </h1>
      </div>

      <section className={`${cardCls} space-y-6 p-5 md:p-6`}>
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">Të përgjithshme</h2>

        <div role="radiogroup" aria-label="Lloji i tourit" className="flex flex-wrap gap-3">
          {[
            { value: false, label: 'Tour normal' },
            { value: true, label: 'Premium' },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              role="radio"
              aria-checked={premium === opt.value}
              onClick={() => set('isPremium', opt.value)}
              className={`inline-flex h-10 items-center rounded-full border px-5 text-[14px] font-medium transition-colors ${
                premium === opt.value ? 'border-lagoon bg-lagoon text-sand' : 'border-ink/25 hover:border-ink'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {!premium && (
            <Field label="Kategoria">
              <select value={f.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.label.sq}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <Field
            label={premium ? 'Çmimi i paketës (Lekë)' : 'Çmimi për person (Lekë)'}
            hint={premium ? 'Çmimi që shfaqet te Premium, p.sh. 28000 për dy persona.' : undefined}
          >
            <input
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              required
              value={f.price}
              onChange={(e) => set('price', e.target.value)}
              className={inputCls}
            />
          </Field>
          {premium && (
            <Field label="Çmimi për person (Lekë)" hint="Përdoret vetëm për totalin e vlerësuar te rezervimi.">
              <input
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                required
                value={f.pricePerPerson}
                onChange={(e) => set('pricePerPerson', e.target.value)}
                className={inputCls}
              />
            </Field>
          )}
          <Field label="Renditja" hint="Numri më i vogël del i pari.">
            <input
              type="number"
              inputMode="numeric"
              step={1}
              value={f.sortOrder}
              onChange={(e) => set('sortOrder', e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <label className="inline-flex items-center gap-2.5 text-[15px]">
            <input
              type="checkbox"
              checked={f.published}
              onChange={(e) => set('published', e.target.checked)}
              className="h-4 w-4 accent-lagoon"
            />
            Publikuar (i dukshëm në faqe)
          </label>
          {!premium && (
            <label className="inline-flex items-center gap-2.5 text-[15px]">
              <input
                type="checkbox"
                checked={f.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="h-4 w-4 accent-lagoon"
              />
              Shfaqe te Kreu (toure të zgjedhura)
            </label>
          )}
        </div>
      </section>

      <section className={`${cardCls} space-y-6 p-5 md:p-6`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">Përmbajtja</h2>
          <div role="tablist" aria-label="Gjuha e përmbajtjes" className="flex gap-2">
            {LANG_LIST.map((l) => (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={lang === l}
                onClick={() => setLang(l)}
                className={`inline-flex h-9 items-center rounded-full border px-4 text-[13px] font-medium transition-colors ${
                  lang === l ? 'border-lagoon bg-lagoon text-sand' : 'border-ink/25 hover:border-ink'
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>
        <p className="-mt-3 text-[13px] leading-relaxed text-ink-soft">
          Shqipja është e detyrueshme. Nëse e lini anglishten ose italishten bosh, te vizitorët shfaqet teksti shqip.
          {missingTranslations.length > 0 && ` Mungon titulli ose përshkrimi në: ${missingTranslations.map((l) => LANG_LABELS[l]).join(', ')}.`}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label={`Titulli (${LANG_LABELS[lang]})`}>
              <input
                value={f.title[lang]}
                maxLength={LIMITS.title}
                onChange={(e) => setLoc('title', e.target.value)}
                className={inputCls}
                required={lang === 'sq'}
              />
            </Field>
          </div>
          {premium ? (
            <div className="md:col-span-2">
              <Field label={`Nëntitulli (${LANG_LABELS[lang]})`} hint="Një rresht poetik nën titull.">
                <input
                  value={f.subtitle[lang]}
                  maxLength={LIMITS.subtitle}
                  onChange={(e) => setLoc('subtitle', e.target.value)}
                  className={inputCls}
                  required={lang === 'sq'}
                />
              </Field>
            </div>
          ) : (
            <div className="md:col-span-2">
              <Field label={`Përmbledhja e shkurtër (${LANG_LABELS[lang]})`} hint="Shfaqet te kartat e tureve.">
                <textarea
                  rows={3}
                  value={f.summary[lang]}
                  maxLength={LIMITS.summary}
                  onChange={(e) => setLoc('summary', e.target.value)}
                  className={inputCls}
                  required={lang === 'sq'}
                />
              </Field>
            </div>
          )}
          <div className="md:col-span-2">
            <Field label={`Përshkrimi i plotë (${LANG_LABELS[lang]})`}>
              <textarea
                rows={6}
                value={f.description[lang]}
                maxLength={LIMITS.description}
                onChange={(e) => setLoc('description', e.target.value)}
                className={inputCls}
                required={lang === 'sq'}
              />
            </Field>
          </div>
          <Field label={`Kohëzgjatja (${LANG_LABELS[lang]})`} hint="P.sh. 3 orë">
            <input
              value={f.duration[lang]}
              maxLength={LIMITS.duration}
              onChange={(e) => setLoc('duration', e.target.value)}
              className={inputCls}
              required={lang === 'sq'}
            />
          </Field>
          <Field label={`Vendi (${LANG_LABELS[lang]})`} hint="P.sh. Laguna e Karavastasë">
            <input
              value={f.location[lang]}
              maxLength={LIMITS.location}
              onChange={(e) => setLoc('location', e.target.value)}
              className={inputCls}
              required={lang === 'sq'}
            />
          </Field>
          {premium ? (
            <Field label={`Shënimi i çmimit (${LANG_LABELS[lang]})`} hint="P.sh. për dy persona">
              <input
                value={f.priceNote[lang]}
                maxLength={LIMITS.priceNote}
                onChange={(e) => setLoc('priceNote', e.target.value)}
                className={inputCls}
                required={lang === 'sq'}
              />
            </Field>
          ) : (
            <Field label={`Madhësia e grupit (${LANG_LABELS[lang]})`} hint="P.sh. Deri në 8 persona">
              <input
                value={f.groupSize[lang]}
                maxLength={LIMITS.groupSize}
                onChange={(e) => setLoc('groupSize', e.target.value)}
                className={inputCls}
                required={lang === 'sq'}
              />
            </Field>
          )}
          <div className="md:col-span-2">
            <Field
              label={`${premium ? 'Çfarë përfshihet' : 'Pikat kryesore'} (${LANG_LABELS[lang]})`}
              hint="Një pikë për rresht."
            >
              <textarea
                rows={4}
                value={f.highlights[lang]}
                onChange={(e) => setLoc('highlights', e.target.value)}
                className={inputCls}
                required={lang === 'sq'}
              />
            </Field>
          </div>
        </div>
      </section>

      <section className={`${cardCls} space-y-5 p-5 md:p-6`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">Fotot</h2>
          <button
            type="button"
            className={btn.outline}
            disabled={processing || photos.length >= LIMITS.maxImages}
            onClick={() => fileInput.current?.click()}
          >
            {processing ? 'Duke përpunuar…' : 'Shto foto'}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => void addFiles(e.target.files)}
          />
        </div>
        <p className="text-[13px] leading-relaxed text-ink-soft">
          Foto e parë është kopertina. Fotot zvogëlohen automatikisht para ngarkimit. Maksimumi {LIMITS.maxImages} foto.
        </p>

        {photos.length === 0 ? (
          <p className="rounded-media border border-dashed border-ink/25 p-6 text-center text-[15px] text-ink-soft">
            Nuk ka foto ende.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {photos.map((p, i) => (
              <li key={p.key} className="min-w-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-sand-deep">
                  <img src={p.src} alt="" className="h-full w-full object-cover" />
                  {i === 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-lagoon px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sand">
                      Kopertina
                    </span>
                  )}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <button type="button" className={btn.small} disabled={i === 0} onClick={() => movePhoto(i, -1)} aria-label="Lëviz majtas">
                    ←
                  </button>
                  <button
                    type="button"
                    className={btn.small}
                    disabled={i === photos.length - 1}
                    onClick={() => movePhoto(i, 1)}
                    aria-label="Lëviz djathtas"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    className={`${btn.small} ml-auto border-clay/40 text-clay-deep hover:border-clay`}
                    onClick={() => removePhoto(i)}
                  >
                    Hiq
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {error && (
        <p role="alert" className="rounded-media border border-clay/40 bg-white p-4 text-[15px] font-medium text-clay-deep">
          {error}
        </p>
      )}

      <div className="sticky bottom-0 -mx-5 flex flex-wrap items-center gap-3 border-t border-ink/10 bg-sand-paper/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <button type="submit" disabled={busy || processing} className={btn.primary}>
          {busy ? 'Duke ruajtur…' : tour ? 'Ruaj ndryshimet' : 'Krijo tourin'}
        </button>
        <Link href="/admin" className={btn.outline}>
          Anulo
        </Link>
      </div>
    </form>
  );
}
