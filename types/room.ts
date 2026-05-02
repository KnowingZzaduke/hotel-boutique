export interface Room {
  slug: 'patio' | 'balcon' | 'mirador';
  priceCOP: number;
  priceUSD: number;
  sqm: number;
  maxGuests: number;
  imageUrl: string;
  imageAlt: { es: string; en: string };
  amenities: string[];
}
