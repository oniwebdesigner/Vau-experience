'use client';

import React, { RefObject, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import type { TourCategory } from '../../types/tour';
import { easeOut } from '../../utils/motion';

export interface FilterOption {
  label: string;
  value: TourCategory | null;
}

interface MobileCategoryFilterProps {
  options: FilterOption[];
  active: TourCategory | null;
  onSelect: (value: TourCategory | null) => void;
  listRef: RefObject<HTMLElement | null>;
}

const NAV_HEIGHT = 80;
const BAR_HEIGHT = 56;

export function MobileCategoryFilter({ options, active, onSelect, listRef }: MobileCategoryFilterProps) {
  const { t } = useTranslation();
  const gridRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const grid = gridRef.current;
      const list = listRef.current;
      if (!grid || !list) return;
      const pastGrid = grid.getBoundingClientRect().bottom < NAV_HEIGHT;
      const listVisible = list.getBoundingClientRect().bottom > NAV_HEIGHT + BAR_HEIGHT + 40;
      setCollapsed(pastGrid && listVisible);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [listRef]);

  useEffect(() => {
    if (!collapsed) setExpanded(false);
  }, [collapsed]);

  const activeLabel = options.find((o) => o.value === active)?.label ?? options[0].label;

  const selectFromBar = (value: TourCategory | null) => {
    onSelect(value);
    setExpanded(false);
    const list = listRef.current;
    if (list) {
      const top = list.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - BAR_HEIGHT - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden">
      <div ref={gridRef}>
        <p id="mobile-filter-label" className="label text-ink-soft">
          {t.toursPage.filterLabel}
        </p>
        <TileGrid options={options} active={active} onSelect={onSelect} labelledBy="mobile-filter-label" />
      </div>

      <AnimatePresence>
        {collapsed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="fixed inset-x-0 top-20 z-30"
          >
            {expanded && <div className="fixed inset-0 top-20 bg-ink/25" onClick={() => setExpanded(false)} aria-hidden />}
            <div className="relative border-b border-ink/10 bg-sand">
              <div className="flex h-14 items-center justify-between gap-3 px-5">
                <p className="flex min-w-0 items-baseline gap-2">
                  <span className="label shrink-0 text-ink-soft">{t.toursPage.categoryLabel}</span>
                  <span className="truncate font-display text-[15px] font-semibold tracking-[-0.01em]">{activeLabel}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  aria-controls="mobile-filter-panel"
                  className="inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-[5px] border border-ink/20 px-3.5 text-[13px] font-semibold transition-colors duration-150 hover:border-ink/50"
                >
                  <SlidersHorizontalIcon className="h-4 w-4" />
                  {t.toursPage.filterButton}
                  <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    id="mobile-filter-panel"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="max-h-[70svh] overflow-y-auto border-t border-ink/10 px-5 pb-5 pt-4"
                  >
                    <p id="mobile-filter-panel-label" className="label text-ink-soft">
                      {t.toursPage.filterLabel}
                    </p>
                    <TileGrid
                      options={options}
                      active={active}
                      onSelect={selectFromBar}
                      labelledBy="mobile-filter-panel-label"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TileGridProps {
  options: FilterOption[];
  active: TourCategory | null;
  onSelect: (value: TourCategory | null) => void;
  labelledBy: string;
}

function TileGrid({ options, active, onSelect, labelledBy }: TileGridProps) {
  return (
    <div role="group" aria-labelledby={labelledBy} className="mt-3 grid grid-cols-2 gap-2">
      {options.map((o, i) => {
        const isActive = active === o.value;
        return (
          <button
            key={o.value ?? 'all'}
            type="button"
            onClick={() => onSelect(o.value)}
            aria-pressed={isActive}
            className={`flex min-h-[48px] min-w-0 items-center rounded-[5px] border px-3 py-2 text-left transition-colors duration-150 ${
              i === 0 ? 'col-span-2' : ''
            } ${isActive ? 'border-lagoon bg-lagoon text-sand' : 'border-ink/15 bg-sand text-ink active:bg-sand-deep'}`}
          >
            <span className="min-w-0 break-words text-[14px] font-semibold leading-tight">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
