import type { LucideIcon } from 'lucide-react';
import { MapPin, Waves, Sparkles, UtensilsCrossed, Sun, ShoppingBag } from 'lucide-react';

export interface Experience {
  id: string;
  Icon: LucideIcon;
  title: { es: string; en: string };
  tagline: { es: string; en: string };
  desc: { es: string; en: string };
  priceCOP: number;
  priceUSD: number;
  priceLabel: { es: string; en: string };
  duration: { es: string; en: string };
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'walled-city',
    Icon: MapPin,
    title: { es: 'Tour Ciudad Amurallada', en: 'Walled City Tour' },
    tagline: { es: 'Los secretos del Centro Histórico', en: 'Secrets of the Historic Center' },
    desc: {
      es: 'Recorrido privado de 2 horas por calles empedradas, iglesias barrocas y plazas coloniales con guía experto local.',
      en: '2-hour private tour of cobblestone streets, baroque churches and colonial squares with an expert local guide.',
    },
    priceCOP: 350000,
    priceUSD: 86,
    priceLabel: { es: 'por persona', en: 'per person' },
    duration: { es: '2 horas', en: '2 hours' },
  },
  {
    id: 'rosario-islands',
    Icon: Waves,
    title: { es: 'Islas del Rosario', en: 'Rosario Islands' },
    tagline: { es: 'El Caribe en lancha privada', en: 'The Caribbean by private boat' },
    desc: {
      es: 'Excursión de día completo a las Islas del Rosario en lancha privada. Snorkel, almuerzo de mariscos y aguas de cristal.',
      en: 'Full-day excursion to the Rosario Islands by private speedboat. Snorkeling, seafood lunch and crystal-clear waters.',
    },
    priceCOP: 1200000,
    priceUSD: 295,
    priceLabel: { es: 'por grupo', en: 'per group' },
    duration: { es: 'Día completo', en: 'Full day' },
  },
  {
    id: 'spa',
    Icon: Sparkles,
    title: { es: 'Spa & Bienestar', en: 'Spa & Wellness' },
    tagline: { es: 'Rituales del Caribe colombiano', en: 'Colombian Caribbean rituals' },
    desc: {
      es: 'Masaje de 60 minutos en pareja con aceites esenciales del Caribe. Cacao, coco y flores de maracuyá.',
      en: '60-minute couples massage with Caribbean essential oils. Cacao, coconut and passion fruit flowers.',
    },
    priceCOP: 420000,
    priceUSD: 103,
    priceLabel: { es: 'para 2 personas', en: 'for 2 people' },
    duration: { es: '60 minutos', en: '60 minutes' },
  },
  {
    id: 'cooking',
    Icon: UtensilsCrossed,
    title: { es: 'Cocina Caribeña', en: 'Caribbean Cooking' },
    tagline: { es: 'Aprende los sabores de Cartagena', en: 'Learn the flavors of Cartagena' },
    desc: {
      es: 'Clase privada con nuestro chef. Visita al mercado, selección de ingredientes frescos y preparación de 3 platos tradicionales.',
      en: 'Private class with our chef. Market visit, fresh ingredient selection and preparation of 3 traditional dishes.',
    },
    priceCOP: 480000,
    priceUSD: 118,
    priceLabel: { es: 'por persona', en: 'per person' },
    duration: { es: '4 horas', en: '4 hours' },
  },
  {
    id: 'sunset-sailboat',
    Icon: Sun,
    title: { es: 'Atardecer en Velero', en: 'Sunset Sailboat' },
    tagline: { es: 'La bahía de Cartagena al dorado', en: 'Cartagena Bay at golden hour' },
    desc: {
      es: 'Navegación privada al atardecer por la bahía con champagne, tabla de quesos y el skyline de la ciudad amurallada.',
      en: 'Private sunset sail across the bay with champagne, cheese board and the walled city skyline.',
    },
    priceCOP: 890000,
    priceUSD: 219,
    priceLabel: { es: 'por pareja', en: 'per couple' },
    duration: { es: '2.5 horas', en: '2.5 hours' },
  },
  {
    id: 'bazurto',
    Icon: ShoppingBag,
    title: { es: 'Mercado de Bazurto', en: 'Bazurto Market' },
    tagline: { es: 'El corazón popular de Cartagena', en: "Cartagena's vibrant soul" },
    desc: {
      es: 'Visita madrugada al mercado más auténtico de Cartagena con guía local. Jugos tropicales y arepas de huevo incluidos.',
      en: "Early morning visit to Cartagena's most authentic market with a local guide. Tropical juices and egg arepas included.",
    },
    priceCOP: 220000,
    priceUSD: 54,
    priceLabel: { es: 'por persona', en: 'per person' },
    duration: { es: '3 horas', en: '3 hours' },
  },
];

export function formatExperiencePriceCOP(priceCOP: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceCOP);
}
