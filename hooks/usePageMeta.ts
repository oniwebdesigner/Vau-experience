'use client';

import { useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import type { Dictionary } from '../i18n/sq';

export function usePageMeta(page: keyof Dictionary['meta']) {
  const { t } = useTranslation();
  const { title, description } = t.meta[page];

  useEffect(() => {
    document.title = title;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
