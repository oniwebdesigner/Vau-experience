'use client';

import React from 'react';
import { Link } from '@/lib/router';
import { ArrowRightIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { RevealImage } from '../RevealImage';
import { RichText } from '../RichText';
import { SectionLabel } from '../SectionLabel';
import { useTranslation } from '../../contexts/LanguageContext';
import { images } from '../../data/images';

export function HomeIntro() {
  const { t } = useTranslation();
  const c = t.intro;

  const photos = [
    { src: images.birdwatching, alt: c.image1Alt, caption: c.image1Caption },
    { src: images.flamingos, alt: c.image2Alt, caption: c.image2Caption },
  ];

  return (
    <section id="hyrje" className="mx-auto max-w-site scroll-mt-20 px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-3 md:pt-3">
          <SectionLabel>{c.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-9">
          <p className="font-display text-[clamp(1.85rem,3.7vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
            <RichText text={c.statement} emClassName="text-lagoon" />
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid items-start gap-10 md:mt-28 md:grid-cols-12 md:gap-6">
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-6 md:col-span-8">
          {photos.map((p) => (
            <figure key={p.src} className="min-w-0">
              <RevealImage src={p.src} alt={p.alt} className="aspect-[4/5] rounded-media" />
              <figcaption className="label mt-4 text-ink-soft">{p.caption}</figcaption>
            </figure>
          ))}
        </div>

        <Reveal className="flex flex-col md:col-span-4 md:pl-6">
          <p className="text-[16px] leading-[1.75] text-ink-soft">{c.body}</p>
          <Link
            to="/rreth-nesh"
            className="group mt-6 inline-flex w-fit items-center gap-2 border-b border-ink/25 pb-1 text-[14px] font-medium transition-colors duration-200 hover:border-clay hover:text-clay"
          >
            {c.link}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
