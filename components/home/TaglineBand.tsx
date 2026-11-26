'use client';

import React from 'react';
import { Link } from '@/lib/router';
import { ArrowRightIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { RichText } from '../RichText';
import { SectionLabel } from '../SectionLabel';
import { useTranslation } from '../../contexts/LanguageContext';
import { images } from '../../data/images';
import { buttonClasses } from '../../utils/styles';

/** The signature moment: “Ejani si mysafir, ikni si mik.” */
export function TaglineBand() {
  const { t } = useTranslation();
  const c = t.tagline;

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-lagoon-night text-sand">
      <img src={images.hospitality} alt={c.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      {/* Dark overlay for legibility — the only gradient on the page, as requested */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(11,31,31,0.92) 0%, rgba(11,31,31,0.55) 45%, rgba(11,31,31,0.2) 100%)' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-site px-5 pb-16 pt-40 md:px-10 md:pb-24">
        <Reveal>
          <SectionLabel className="text-gold-soft">{c.label}</SectionLabel>
          <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(3.25rem,10vw,10rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
            <RichText text={c.line1} emClassName="text-gold-soft" />
            <br />
            {c.line2}
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="mt-10 grid gap-8 border-t border-sand/25 pt-8 md:grid-cols-12 md:items-end">
          <p className="max-w-lg text-[17px] leading-relaxed text-sand/85 md:col-span-6">{c.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end">
            <Link to="/touret" className={buttonClasses('sand')}>
              {c.ctaTours} <ArrowRightIcon />
            </Link>
            <Link to="/kontakt" className={buttonClasses('outlineLight')}>
              {c.ctaContact}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
