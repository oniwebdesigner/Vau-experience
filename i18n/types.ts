export type Lang = 'sq' | 'en' | 'it';

export const LANGS: Lang[] = ['sq', 'en', 'it'];

/** Native language names — shown as-is in every interface language. */
export const LANGUAGE_NAMES: Record<Lang, string> = {
  sq: 'Shqip',
  en: 'English',
  it: 'Italiano',
};

/** A value stored once per language (used by all data files). */
export type Localized<T = string> = Record<Lang, T>;
