'use client';

import React, { useRef } from 'react';
import { Link } from '@/lib/router';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, ArrowRightIcon } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { images } from '../../data/images';
import { brand } from '../../data/site';
import { buttonClasses } from '../../utils/styles';
import { easeOut } from '../../utils/motion';

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%']);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay, ease: easeOut },
  });

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-lagoon-night text-sand">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[4%] h-[112%]">
        <img src={images.hero} alt={t.hero.imageAlt} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/40" aria-hidden />

      <div className="relative mx-auto flex h-full max-w-site flex-col px-5 pb-6 pt-28 md:px-10 md:pb-8">
        <div className="mt-auto grid gap-8 md:grid-cols-12 md:items-end">
          <motion.h1
            {...enter(0.08)}
            lang="en"
            className="font-display text-[clamp(4rem,13vw,12.5rem)] font-semibold leading-[0.84] tracking-[-0.055em] md:col-span-8"
          >
            {brand.sloganLead}
            <br />
            <em>{brand.sloganEm}</em> {brand.sloganTail}
          </motion.h1>

          <motion.div {...enter(0.18)} className="md:col-span-4 md:pb-5">
            <p className="max-w-sm text-[16px] leading-relaxed text-sand/90 md:text-[17px]">{t.hero.subline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/touret" className={buttonClasses('sand')}>
                {t.hero.ctaTours} <ArrowRightIcon />
              </Link>
              <Link to="/kontakt" className={buttonClasses('outlineLight')}>
                {t.hero.ctaContact}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div {...enter(0.28)} className="mt-10 flex justify-end border-t border-sand/25 pt-5">
          <a
            href="#hyrje"
            className="label flex items-center gap-2 text-sand/80 transition-colors duration-200 hover:text-sand"
          >
            {t.hero.scroll} <ArrowDownIcon className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
