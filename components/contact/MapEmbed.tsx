'use client';

import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { site } from '../../data/site';

/** Real Google Map (no API key). Change `site.mapQuery` / `site.mapUrl` in data/site.ts for the exact spot. */
export function MapEmbed() {
  const { t } = useTranslation();
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=13&output=embed`;
  return (
    <div className="relative overflow-hidden rounded-media bg-sand-paper">
      <iframe
        title={t.map.aria}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block aspect-[4/3] w-full border-0 md:aspect-[21/8]"
      />
      <a
        href={site.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-sand px-4 text-[13px] font-medium text-ink shadow-sm transition-colors duration-200 hover:bg-sand-paper md:bottom-6 md:right-8"
      >
        {t.map.open} <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
