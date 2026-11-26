import type { Lang } from '../i18n/types';

export const LOCALES: Record<Lang, string> = {
  sq: 'sq-AL',
  en: 'en-GB',
  it: 'it-IT',
};

const GROUP_SEPARATOR: Record<Lang, string> = { sq: '.', en: ',', it: '.' };

export function formatNumber(value: number, lang: Lang): string {
  const rounded = Math.round(value);
  const digits = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEPARATOR[lang]);
  return rounded < 0 ? `-${digits}` : digits;
}

/** Albanian: "12.000 Lekë" · English: "12,000 ALL" · Italian: "12.000 ALL" */
export function formatPrice(value: number, lang: Lang): string {
  const unit = lang === 'sq' ? 'Lekë' : 'ALL';
  return `${formatNumber(value, lang)}\u00A0${unit}`;
}

export function formatDate(iso: string, lang: Lang): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  try {
    return new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(y, m - 1, d),
    );
  } catch {
    return `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`;
  }
}
