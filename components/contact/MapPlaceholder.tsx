'use client';

import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { brand, site } from '../../data/site';

// Replace this block with an embedded map (e.g. Google Maps iframe) when ready.
export function MapPlaceholder() {
  const { t, loc } = useTranslation();
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-lagoon text-sand md:aspect-[21/8]" role="img" aria-label={t.map.aria}>
      <svg className="absolute inset-0 h-full w-full text-sand/15" aria-hidden>
        <defs>
          <pattern id="map-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>
      <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M0 40 C 120 60, 160 120, 140 300 L 0 300 Z" fill="#0F3332" />
        <path
          d="M300 170 C 330 90, 470 70, 540 120 S 640 230, 560 255 S 360 270, 300 170 Z"
          fill="#0F3332"
          stroke="#C2A468"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <path d="M220 0 C 260 110, 250 200, 300 300" fill="none" stroke="#F4EEE4" strokeOpacity="0.25" strokeDasharray="4 6" />
      </svg>

      <div className="absolute left-[60%] top-[34%] flex items-center gap-3">
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute h-8 w-8 rounded-full border border-clay/60" />
          <span className="h-3 w-3 rounded-full bg-clay" />
        </span>
        <span className="hidden bg-sand px-3 py-1.5 text-[12px] font-medium text-ink sm:block">{brand.name}</span>
      </div>

      <p className="label absolute left-5 top-5 text-sand/70 md:left-8 md:top-8">{t.map.lagoon}</p>
      <p className="label absolute bottom-5 left-5 text-sand/70 md:bottom-8 md:left-8">{loc(site.coordinates)}</p>
      <a
        href={site.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-sand px-4 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-sand-paper md:bottom-6 md:right-8"
      >
        {t.map.open} <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
