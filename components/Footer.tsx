'use client';

import React from 'react';
import { Link } from '@/lib/router';
import { ArrowUpRightIcon } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { brand, navLinks, premiumLink, site } from '../data/site';
import { whatsappUrl } from '../utils/booking';

export function Footer() {
  const { t, loc } = useTranslation();
  return (
    <footer className="border-t border-sand/10 bg-lagoon-night text-sand">
      <div className="mx-auto max-w-site px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.045em] md:text-7xl">
              {brand.sloganLead} <em>{brand.sloganEm}</em> {brand.sloganTail}.
            </p>
            <p className="mt-8 font-display text-2xl font-light tracking-[-0.02em] text-gold-soft md:text-3xl">
              {t.footer.signature}
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-sand/70">{t.footer.tagline}</p>
          </div>

          <nav aria-label={t.footer.linksAria} className="md:col-span-2">
            <p className="label text-sand/50">{t.footer.pages}</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              {[...navLinks, premiumLink].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sand/85 transition-colors duration-200 hover:text-gold">
                    {loc(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 md:col-span-2">
            <p className="label text-sand/50">{t.footer.contact}</p>
            <ul className="mt-5 space-y-3 text-[15px] text-sand/85">
              <li>
                <a
                  href={whatsappUrl(t.common.whatsappDefault)}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all transition-colors duration-200 hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li className="tabular-nums">{site.phoneDisplay}</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label text-sand/50">{t.footer.follow}</p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.02em] text-sand transition-colors duration-200 hover:text-gold"
            >
              {site.instagramHandle}
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-2 text-sm text-sand/60">{t.footer.instagram}</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-sand/15 pt-6 text-xs text-sand/55 md:flex-row md:items-center md:justify-between">
          <span>{t.footer.rights}</span>
          <span>{loc(site.address)}</span>
        </div>
      </div>
    </footer>
  );
}
