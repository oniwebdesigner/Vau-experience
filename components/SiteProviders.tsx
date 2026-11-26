'use client';

import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ToursProvider } from '../contexts/ToursContext';
import { BookingProvider } from '../contexts/BookingContext';
import { Navbar } from './Navbar';
import { WhatsAppButton } from './WhatsAppButton';
import { BookingModal } from './booking/BookingModal';
import type { PremiumTour, Tour } from '../types/tour';

/** Everything the public pages share: language, tours from the database, booking panel, navbar. */
export function SiteProviders({
  tours,
  premiumTours,
  children,
}: {
  tours: Tour[];
  premiumTours: PremiumTour[];
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <ToursProvider tours={tours} premiumTours={premiumTours}>
        <BookingProvider>
          <div className="min-h-screen w-full overflow-x-clip bg-sand">
            <Navbar />
            {children}
            <WhatsAppButton />
            <BookingModal />
          </div>
        </BookingProvider>
      </ToursProvider>
    </LanguageProvider>
  );
}
