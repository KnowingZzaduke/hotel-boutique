import type { MetadataRoute } from 'next';
import { ROOMS } from '@/lib/rooms-data';

const BASE_URL = 'https://casaboutiquesandiego.com';

const STATIC_PAGES = [
  { path: '',               priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/habitaciones',  priority: 0.9, changeFrequency: 'monthly' },
  { path: '/restaurante',   priority: 0.8, changeFrequency: 'monthly' },
  { path: '/experiencias',  priority: 0.8, changeFrequency: 'monthly' },
  { path: '/galeria',       priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contacto',      priority: 0.7, changeFrequency: 'yearly'  },
  { path: '/reservar',      priority: 0.9, changeFrequency: 'weekly'  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ['', '/en']) {
    for (const { path, priority, changeFrequency } of STATIC_PAGES) {
      entries.push({
        url: `${BASE_URL}${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            es: `${BASE_URL}${path}`,
            en: `${BASE_URL}/en${path}`,
          },
        },
      });
    }

    for (const room of ROOMS) {
      entries.push({
        url: `${BASE_URL}${locale}/habitaciones/${room.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: {
          languages: {
            es: `${BASE_URL}/habitaciones/${room.slug}`,
            en: `${BASE_URL}/en/habitaciones/${room.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
