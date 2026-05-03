export interface RoomGalleryImage {
  url: string;
  alt: { es: string; en: string };
}

export interface Room {
  slug: 'patio' | 'balcon' | 'mirador';
  priceCOP: number;
  priceUSD: number;
  sqm: number;
  maxGuests: number;
  imageUrl: string;
  imageAlt: { es: string; en: string };
  amenities: string[];
  // Detail page fields
  view: { es: string; en: string };
  description: { es: string[]; en: string[] };
  gallery: RoomGalleryImage[];
}
