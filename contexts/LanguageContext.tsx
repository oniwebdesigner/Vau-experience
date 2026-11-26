'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { sq, type Dictionary } from '../i18n/sq';
import { en } from '../i18n/en';
import { it } from '../i18n/it';
import type { Lang, Localized } from '../i18n/types';
import { formatDate, formatNumber, formatPrice } from '../utils/format';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  loc: <T>(value: Localized<T>) => T;
  price: (value: number) => string;
  date: (iso: string) => string;
  number: (value: number) => string;
}

const STORAGE_KEY = 'vau-lang';
const dictionaries: Record<Lang, Dictionary> = { sq, en, it };

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'sq' || stored === 'en' || stored === 'it') return stored;
  } catch {
    /* storage unavailable */
  }
  return 'sq';
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start in Albanian so the server HTML and the first client render match;
  // the visitor's saved language is applied right after hydration.
  const [lang, setLangState] = useState<Lang>('sq');
  const [ready, setReady] = useState(false);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  const firstRender = useRef(true);

  useEffect(() => {
    setLangState(readStoredLang());
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduce) return;
    controls.set({ opacity: 0.4 });
    controls.start({ opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } });
  }, [lang, ready, controls, reduce]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
      loc: <T,>(v: Localized<T>): T => v[lang],
      price: (n: number) => formatPrice(n, lang),
      date: (iso: string) => formatDate(iso, lang),
      number: (n: number) => formatNumber(n, lang),
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      <motion.div animate={controls}>{children}</motion.div>
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
