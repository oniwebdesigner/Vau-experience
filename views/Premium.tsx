'use client';

import React from 'react';
import { CrownIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { RichText } from '../components/RichText';
import { OrnamentDivider, PremiumSeal } from '../components/premium/PremiumOrnaments';
import { PremiumBenefits } from '../components/premium/PremiumBenefits';
import { PremiumExperiences } from '../components/premium/PremiumExperiences';
import { useTranslation } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

export function Premium() {
  usePageMeta('premium');
  const { t } = useTranslation();
  const p = t.premiumPage;

  return (
    <div className="premium-surface text-sand">
      <header className="mx-auto max-w-site px-5 pb-14 pt-36 md:px-10 md:pb-20 md:pt-48">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="min-w-0 md:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="label text-gold-pale">{p.label}</span>
              <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-gold/60 bg-gold/10 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-pale">
                <CrownIcon className="h-3 w-3" strokeWidth={1.4} aria-hidden />
                {p.badge}
              </span>
            </div>
            <h1 className="mt-6 hyphens-auto break-words font-display text-[clamp(3rem,7.6vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.045em]">
              <RichText text={p.title} emClassName="text-gold-soft" />
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-4">
            <PremiumSeal label={p.seal} className="mb-8 hidden h-28 w-28 md:block" />
            <p className="text-[16px] leading-relaxed text-sand/80">{p.intro}</p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-site px-5 md:px-10">
        <OrnamentDivider />
        <PremiumBenefits />
        <OrnamentDivider />
      </div>

      <section className="mx-auto max-w-site px-5 pb-24 pt-20 md:px-10 md:pb-36 md:pt-28">
        <PremiumExperiences />
      </section>
    </div>
  );
}
