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

const curated = [images.premiumBoat, images.premiumDinner, images.theth, images.riviera];

export function PremiumTeaser() {
  const { t } = useTranslation();
  const p = t.premiumTeaser;

  return (
    <section className="premium-surface text-sand">
      <div className="mx-auto max-w-site px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <SectionLabel className="text-gold-soft">{p.label}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.75rem,5.8vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
              <RichText text={p.title} emClassName="text-gold-soft" />
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-4 md:col-start-9">
            <p className="text-[16px] leading-relaxed text-sand/80">{p.body}</p>
            <Link to="/premium" className={buttonClasses('gold', 'mt-8')}>
              {p.cta} <ArrowRightIcon />
            </Link>
          </Reveal>
        </div>

        <ul aria-label={p.galleryAria} className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
          {curated.map((src) => (
            <li key={src}>
              <Link
                to="/premium"
                tabIndex={-1}
                aria-hidden
                className="group block aspect-[4/5] overflow-hidden rounded-media ring-1 ring-gold/30 transition-[box-shadow] duration-200 hover:ring-gold"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
