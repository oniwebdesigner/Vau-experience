'use client';

import React from 'react';
import { Reveal } from './Reveal';
import { RichText } from './RichText';
import { SectionLabel } from './SectionLabel';

interface PageHeaderProps {
  label: string;
  /** Headline; *words in asterisks* are emphasised. */
  title: string;
  intro: React.ReactNode;
  tone?: 'light' | 'dark';
  aside?: React.ReactNode;
}

export function PageHeader({ label, title, intro, tone = 'light', aside }: PageHeaderProps) {
  const dark = tone === 'dark';
  return (
    <header className="mx-auto max-w-site px-5 pb-14 pt-36 md:px-10 md:pb-20 md:pt-48">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="min-w-0 md:col-span-8">
          <SectionLabel className={dark ? 'text-gold' : 'text-clay'}>{label}</SectionLabel>
          <h1 className="mt-6 hyphens-auto break-words font-display text-[clamp(3rem,7.6vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.045em]">
            <RichText text={title} emClassName={dark ? 'text-gold' : 'text-lagoon'} />
          </h1>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-4">
          <div className={`text-[16px] leading-relaxed ${dark ? 'text-sand/75' : 'text-ink-soft'}`}>{intro}</div>
          {aside && <div className="mt-6">{aside}</div>}
        </Reveal>
      </div>
    </header>
  );
}
