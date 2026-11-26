'use client';

import React from 'react';
import { MapPinIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { RevealImage } from '../components/RevealImage';
import { RichText } from '../components/RichText';
import { SectionLabel } from '../components/SectionLabel';
import { useTranslation } from '../contexts/LanguageContext';
import { destinations, guides, parkFacts, timeline, values } from '../data/about';
import { images } from '../data/images';
import { usePageMeta } from '../hooks/usePageMeta';

export function About() {
  usePageMeta('about');
  const { t, loc } = useTranslation();
  const a = t.about;

  return (
    <>
      <PageHeader label={a.label} title={a.title} intro={a.intro} />

      <div className="mx-auto max-w-site px-5 md:px-10">
        <RevealImage src={images.sunset} alt={a.imageAlt} className="aspect-[4/3] rounded-media md:aspect-[16/7]" />
        <p className="label mt-4 text-ink-soft">{a.imageCaption}</p>
      </div>

      {/* Story */}
      <section className="mx-auto max-w-site px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <SectionLabel>{a.storyLabel}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-5">
            <p className="font-display text-2xl font-semibold leading-[1.25] tracking-[-0.025em] md:text-[1.9rem]">{a.storyLead}</p>
            <p className="mt-6 text-[16px] leading-[1.8] text-ink-soft">{a.storyBody}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3 md:col-start-10">
            <ol className="border-t border-ink/15">
              {timeline.map((item) => (
                <li key={item.year} className="border-b border-ink/15 py-5">
                  <p className="figure text-2xl text-clay">{item.year}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{loc(item.text)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Destinations */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-site px-5 py-24 md:px-10 md:py-32">
          <Reveal className="max-w-3xl">
            <SectionLabel>{a.destinationsLabel}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <RichText text={a.destinationsTitle} emClassName="text-lagoon" />
            </h2>
          </Reveal>
          <ul className="mt-14 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <li key={d.name.sq} className="flex gap-3 border-b border-ink/15 py-5">
                <MapPinIcon
                  className={`mt-1 h-4 w-4 shrink-0 ${i === 0 ? 'text-clay' : 'text-lagoon'}`}
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="font-display text-xl font-semibold tracking-[-0.02em]">{loc(d.name)}</p>
                  <p className="mt-1 text-sm text-ink-soft">{loc(d.note)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Guides */}
      <section className="border-t border-ink/10 bg-sand-deep">
        <div className="mx-auto max-w-site px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <SectionLabel>{a.guidesLabel}</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                <RichText text={a.guidesTitle} emClassName="text-lagoon" />
              </h2>
            </Reveal>
            <Reveal delay={0.06} className="md:col-span-4 md:col-start-9">
              <p className="text-[16px] leading-relaxed text-ink-soft">{a.guidesBody}</p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-8">
            {guides.map((g, i) => (
              <Reveal key={g.name} delay={0.06 * i} className="h-full">
                <article className="flex h-full flex-col">
                  <RevealImage src={g.image} alt={a.portraitAlt(g.name)} className="aspect-[4/5] rounded-media" />
                  <div className="mt-5 flex flex-1 flex-col border-t border-ink/15 pt-4">
                    <p className="label text-clay">{loc(g.role)}</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.035em]">{g.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{loc(g.bio)}</p>
                    <p className="label mt-auto pt-4 text-ink-soft">{loc(g.certification)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-site px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel>{a.valuesLabel}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <RichText text={a.valuesTitle} emClassName="text-lagoon" />
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-7 md:col-start-6">
            <ul className="grid gap-x-10 md:grid-cols-2">
              {values.map((v) => (
                <li key={v.title.sq} className="border-t border-ink/15 py-8">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{loc(v.title)}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{loc(v.text)}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Signature echo */}
      <section className="border-y border-ink/10 bg-sand-paper">
        <div className="mx-auto max-w-site px-5 py-20 text-center md:px-10 md:py-28">
          <Reveal>
            <SectionLabel className="text-clay">{t.tagline.label}</SectionLabel>
            <p className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <RichText text={t.tagline.line1} emClassName="text-lagoon" /> {t.tagline.line2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Park — our signature place */}
      <section className="bg-lagoon text-sand">
        <div className="mx-auto grid max-w-site gap-14 px-5 py-24 md:grid-cols-12 md:gap-6 md:px-10 md:py-36">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel className="text-gold-soft">{a.parkLabel}</SectionLabel>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                <RichText text={a.parkTitle} />
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-[1.8] text-sand/80">{a.parkBody}</p>
            </Reveal>
            <Reveal delay={0.06} className="mt-12">
              <p className="figure text-[clamp(3.5rem,8vw,6.5rem)] leading-none tracking-[-0.05em]">
                {a.parkArea} <span className="text-[0.28em] uppercase tracking-[0.2em] text-gold-soft">{a.parkAreaUnit}</span>
              </p>
              <p className="mt-3 text-[15px] text-sand/75">{a.parkAreaNote}</p>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <RevealImage src={images.pelicans} alt={a.parkImageAlt} className="aspect-[16/11] rounded-media bg-lagoon-deep" />
            <dl className="mt-10 border-t border-sand/20">
              {parkFacts.map((f) => (
                <div
                  key={f.value.sq}
                  className="grid grid-cols-[7.5rem_1fr] items-baseline gap-6 border-b border-sand/20 py-5 md:grid-cols-[10rem_1fr]"
                >
                  <dt className="figure text-2xl text-gold-soft md:text-3xl">{loc(f.value)}</dt>
                  <dd className="text-[15px] leading-relaxed text-sand/80">{loc(f.text)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
