'use client';

import React from 'react';
import { Link } from '@/lib/router';
import { useTranslation } from '../contexts/LanguageContext';

export function Wordmark({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <Link to="/" className={`flex shrink-0 items-baseline gap-2 ${className}`} aria-label={t.nav.homeAria}>
      <span className="font-display text-[24px] font-bold leading-none tracking-[-0.04em]">VAU</span>
      <span className="text-[10px] font-medium uppercase tracking-[0.32em]">Experience</span>
    </Link>
  );
}
