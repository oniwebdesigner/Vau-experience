'use client';

import React, { useState } from 'react';
import { Link } from '@/lib/router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { RichText } from '../RichText';
import { SectionLabel } from '../SectionLabel';
import { useTranslation } from '../../contexts/LanguageContext';
import { categories } from '../../data/categories';
import { easeOut } from '../../utils/motion';

export function CategoryIndex() {
  const [active, setActive] = useState(0);
  const { t, loc } = useTranslation();
  const current = categories[active];

  return (
    <section className="bg-sand-deep">
      <div className="mx-auto max-w-site px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <SectionLabel>{t.categoriesSection.label}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <RichText text={t.categoriesSection.title} emClassName="text-lagoon" />
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-4 md:col-start-9">
            <p className="text-[16px] leading-relaxed text-ink-soft">{t.categoriesSection.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12">
          <ul className="border-t border-ink/15 md:col-span-7">
            {categories.map((c, i) => {
              const isActive = active === i;
              return (
                <li key={c.name} className="border-b border-ink/15">
                  <Link
                    to={`/touret?kategoria=${encodeURIComponent(c.name)}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-4 py-5 md:gap-8 md:py-5"
                  >
                    <img src={c.image} alt="" className="h-14 w-14 shrink-0 rounded-[6px] object-cover md:hidden" />
                    <span className="min-w-0">
                      <span
                        className={`block break-words font-display text-[2rem] font-semibold leading-none tracking-[-0.04em] transition-colors duration-200 md:text-[3.25rem] ${
                          isActive ? 'text-lagoon' : 'text-ink md:text-ink/50'
                        }`}
                      >
                        {loc(c.label)}
                      </span>
                      <span className="mt-2 block text-sm text-ink-soft md:hidden">{loc(c.description)}</span>
                    </span>
                    <span className="ml-auto hidden max-w-[15rem] text-right text-sm leading-snug text-ink-soft lg:block">
                      {loc(c.description)}
                    </span>
                    <ArrowUpRightIcon
                      className={`ml-auto h-5 w-5 shrink-0 transition-[transform,opacity] duration-200 ease-out lg:ml-0 ${
                        isActive ? 'opacity-100 md:translate-x-0' : 'opacity-40 md:-translate-x-1 md:opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:col-span-4 md:col-start-9 md:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-media bg-sand">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={loc(current.label)}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="mt-4 border-t border-ink/15 pt-3">
                <p className="font-display text-lg font-semibold tracking-[-0.02em]">{loc(current.label)}</p>
                <p className="mt-1 text-sm text-ink-soft">{loc(current.description)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
