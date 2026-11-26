'use client';

import React from 'react';
import { Link } from '@/lib/router';
import { ArrowRightIcon, CompassIcon, MessageCircleIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { RevealImage } from '../RevealImage';
import { RichText } from '../RichText';
import { SectionLabel } from '../SectionLabel';
import { useTranslation } from '../../contexts/LanguageContext';
import { images } from '../../data/images';
import { whatsappUrl } from '../../utils/booking';
import { buttonClasses } from '../../utils/styles';

/** The private, tailor-made tour invitation — shown on Kreu and Touret. */
export function CustomRequest() {
  const { t } = useTranslation();
  const c = t.customRequest;

  return (
    <section id="tur-privat" className="scroll-mt-20 bg-lagoon text-sand">
      <div className="mx-auto grid max-w-site gap-12 px-5 py-24 md:grid-cols-12 md:items-center md:gap-6 md:px-10 md:py-32">
        <Reveal className="min-w-0 md:col-span-6">
          <SectionLabel className="text-gold-soft">{c.label}</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            <RichText text={c.title} emClassName="text-gold-soft" />
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-sand/85">{c.body}</p>

          <ul className="mt-8 max-w-lg border-t border-sand/20">
            {c.points.map((p) => (
              <li key={p} className="flex items-center gap-3 border-b border-sand/20 py-3 text-[15px] text-sand/90">
                <CompassIcon className="h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.5} aria-hidden />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl(c.message)} target="_blank" rel="noreferrer" className={buttonClasses('sand')}>
              <MessageCircleIcon /> {c.ctaWhatsapp}
            </a>
            <Link to="/kontakt" className={buttonClasses('outlineLight')}>
              {c.ctaContact} <ArrowRightIcon />
            </Link>
          </div>
        </Reveal>

        <div className="md:col-span-5 md:col-start-8">
          <RevealImage src={images.customRequest} alt={c.imageAlt} className="aspect-[4/5] rounded-media bg-lagoon-deep" />
        </div>
      </div>
    </section>
  );
}
