'use client';

import React from "react";
import { CalendarCheckIcon, CompassIcon, CrownIcon, GemIcon, GiftIcon, UsersIcon, SunsetIcon, type LucideIcon } from "lucide-react";
import { Reveal } from "../Reveal";
import { RichText } from "../RichText";
import { SectionLabel } from "../SectionLabel";
import { useTranslation } from "../../contexts/LanguageContext";
/** One thin-line gold icon per benefit, in the same order as the dictionary list. */
const icons: LucideIcon[] = [CompassIcon, SunsetIcon, UsersIcon, GemIcon, GiftIcon, CalendarCheckIcon];
export function PremiumBenefits() {
  const {
    t
  } = useTranslation();
  const p = t.premiumPage;
  return <section className="py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-6">
          <SectionLabel className="flex items-center gap-2 text-gold-pale">
            <CrownIcon className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden />
            {p.benefitsLabel}
          </SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <RichText text={p.benefitsTitle} emClassName="text-gold-soft" />
          </h2>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-media border border-gold/30 bg-gold/25 sm:grid-cols-2 lg:grid-cols-3">
        {p.benefits.map((b, i) => {
        const Icon = icons[i % icons.length];
        return <li key={b.title} className="group flex flex-col bg-jade-deep/95 p-7 transition-colors duration-200 hover:bg-jade-deep md:p-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold-soft transition-colors duration-200 group-hover:border-gold group-hover:text-gold-pale">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.25} aria-hidden />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em] text-sand">{b.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-sand/75">{b.text}</p>
            </li>;
      })}
      </ul>
    </section>;
}