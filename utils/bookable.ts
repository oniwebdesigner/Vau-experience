import { categories } from '../data/categories';
import type { BookableTour, CategoryEntry, PremiumTour, Tour, TourCategory } from '../types/tour';

/** Every tour a visitor can book (normal and premium), in one list. */
export function buildBookableTours(tours: Tour[], premiumTours: PremiumTour[]): BookableTour[] {
  return [
    ...tours.map((t) => ({
      id: t.id,
      kind: 'normal' as const,
      title: t.title,
      location: t.location,
      duration: t.duration,
      pricePerPerson: t.price,
      image: t.image,
    })),
    ...premiumTours.map((t) => ({
      id: t.id,
      kind: 'premium' as const,
      title: t.title,
      location: t.location,
      duration: t.duration,
      pricePerPerson: t.pricePerPerson,
      image: t.image,
    })),
  ];
}

export function findBookable(list: BookableTour[], id: string): BookableTour | undefined {
  return list.find((t) => t.id === id);
}

export function getCategory(name: TourCategory): CategoryEntry {
  return categories.find((c) => c.name === name) ?? categories[0];
}

/** Price per person × every guest (adults + children), no discounts. */
export function estimateTotal(pricePerPerson: number, adults: number, children: number): number {
  return Math.round(pricePerPerson * (adults + children));
}
