'use client';

import React from 'react';
import { NavLink } from '@/lib/router';
import { GemIcon } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { premiumLink } from '../data/site';

interface PremiumNavLinkProps {
  /** Light text context (over the hero or on the Premium page). */
  onDark: boolean;
  size?: 'nav' | 'menu';
}

/** The gold Premium pill — set apart from the regular links. */
export function PremiumNavLink({ onDark, size = 'nav' }: PremiumNavLinkProps) {
  const { t, loc } = useTranslation();
  const tone = onDark
    ? 'border-gold/70 bg-gold/10 text-gold-pale hover:border-gold hover:bg-gold/20'
    : 'border-gold bg-gold-pale/45 text-gold-deep hover:bg-gold-pale/80';

  if (size === 'menu') {
    return (
      <NavLink
        to={premiumLink.to}
        className={({ isActive }) =>
          `premium-shimmer flex min-h-[64px] items-center justify-between gap-4 rounded-[6px] border px-5 py-3 transition-colors duration-200 ${tone} ${
            isActive ? 'ring-1 ring-gold' : ''
          }`
        }
      >
        <span className="flex items-center gap-3">
          <GemIcon className="h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden />
          <span className="font-display text-3xl font-semibold tracking-[-0.03em]">{loc(premiumLink.label)}</span>
        </span>
        <span className="label text-right">{t.nav.premiumHint}</span>
      </NavLink>
    );
  }

  return (
    <NavLink
      to={premiumLink.to}
      title={t.nav.premiumHint}
      className={({ isActive }) =>
        `premium-shimmer inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${tone} ${
          isActive ? 'ring-1 ring-gold ring-offset-0' : ''
        }`
      }
    >
      <GemIcon className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden />
      {loc(premiumLink.label)}
    </NavLink>
  );
}
