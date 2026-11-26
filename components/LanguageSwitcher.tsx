'use client';

import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { LANGS, LANGUAGE_NAMES } from '../i18n/types';

interface LanguageSwitcherProps {
  variant?: 'inline' | 'tiles';
  className?: string;
}

export function LanguageSwitcher({ variant = 'inline', className = '' }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useTranslation();

  if (variant === 'tiles') {
    return (
      <div role="group" aria-label={t.language.label} className={`grid grid-cols-3 gap-2 ${className}`}>
        {LANGS.map((code) => {
          const active = code === lang;
          return (
            <button
              key={code}
              type="button"
              lang={code}
              onClick={() => setLang(code)}
              aria-pressed={active}
              className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-[5px] border transition-colors duration-150 ${
                active ? 'border-lagoon bg-lagoon text-sand' : 'border-ink/15 bg-sand text-ink hover:border-ink/40'
              }`}
            >
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em]">{code}</span>
              <span className={`text-[11px] ${active ? 'text-sand/75' : 'text-ink-soft'}`}>{LANGUAGE_NAMES[code]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="group" aria-label={t.language.label} className={`flex items-center ${className}`}>
      {LANGS.map((code, i) => {
        const active = code === lang;
        return (
          <React.Fragment key={code}>
            {i > 0 && (
              <span className="mx-1 text-[11px] opacity-30" aria-hidden>
                /
              </span>
            )}
            <button
              type="button"
              lang={code}
              onClick={() => setLang(code)}
              aria-pressed={active}
              aria-label={LANGUAGE_NAMES[code]}
              className={`relative px-0.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-150 ${
                active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {code}
              {active && <span className="absolute inset-x-0.5 bottom-0.5 h-px bg-current" aria-hidden />}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
