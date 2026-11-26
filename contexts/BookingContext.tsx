'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface BookingRequest {
  tourId: string;
  key: number;
}

interface BookingContextValue {
  request: BookingRequest | null;
  openBooking: (tourId: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<BookingRequest | null>(null);
  const openBooking = useCallback((tourId: string) => setRequest({ tourId, key: Date.now() }), []);
  const closeBooking = useCallback(() => setRequest(null), []);
  const value = useMemo(() => ({ request, openBooking, closeBooking }), [request, openBooking, closeBooking]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
