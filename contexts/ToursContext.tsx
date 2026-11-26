'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { BookableTour, PremiumTour, Tour } from '../types/tour';
import { buildBookableTours } from '../utils/bookable';

interface ToursContextValue {
  tours: Tour[];
  premiumTours: PremiumTour[];
  bookableTours: BookableTour[];
}

const ToursContext = createContext<ToursContextValue | null>(null);

/** Tours come from the database (loaded on the server) and are passed in here. */
export function ToursProvider({
  tours,
  premiumTours,
  children,
}: {
  tours: Tour[];
  premiumTours: PremiumTour[];
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ tours, premiumTours, bookableTours: buildBookableTours(tours, premiumTours) }),
    [tours, premiumTours],
  );
  return <ToursContext.Provider value={value}>{children}</ToursContext.Provider>;
}

export function useTours(): ToursContextValue {
  const ctx = useContext(ToursContext);
  if (!ctx) throw new Error('useTours must be used within ToursProvider');
  return ctx;
}
