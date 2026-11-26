import type { Localized } from '../i18n/types';

/** Stable category keys (also used in the ?kategoria= URL). Labels live in data/categories.ts. */
export type TourCategory =
  | 'Birdwatching'
  | 'Bike'
  | 'Buggy'
  | 'Natyrë'
  | 'Kulturë'
  | 'Ushqim'
  | 'Tradita'
  | 'Bregdet'
  | 'Male';

export interface Tour {
  id: string;
  category: TourCategory;
  title: Localized;
  summary: Localized;
  description: Localized;
  duration: Localized;
  /** Price per person in Albanian lek (ALL). */
  price: number;
  location: Localized;
  groupSize: Localized;
  image: string;
  gallery: string[];
  highlights: Localized<string[]>;
  featured?: boolean;
}

export interface PremiumTour {
  id: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  duration: Localized;
  location: Localized;
  /** Package price in ALL. */
  price: number;
  priceNote: Localized;
  /** Per-person price in ALL, used for booking estimates. */
  pricePerPerson: number;
  image: string;
  includes: Localized<string[]>;
}

export type BookingKind = 'normal' | 'premium';

export interface BookableTour {
  id: string;
  kind: BookingKind;
  title: Localized;
  location: Localized;
  duration: Localized;
  pricePerPerson: number;
  image: string;
}

export interface CategoryEntry {
  name: TourCategory;
  label: Localized;
  description: Localized;
  image: string;
}

export interface Guide {
  name: string;
  role: Localized;
  certification: Localized;
  bio: Localized;
  image: string;
}
