import type { Room } from '@/types/room';

export const ROOMS: Room[] = [
  {
    slug: 'patio',
    priceCOP: 850000,
    priceUSD: 210,
    sqm: 30,
    maxGuests: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85&auto=format&fit=crop',
    imageAlt: {
      es: 'Habitación colonial con vista al patio interior lleno de vegetación tropical',
      en: 'Colonial room with view of the tropical interior courtyard',
    },
    amenities: ['A/C', 'Tina', 'WiFi', 'Minibar'],
    view: { es: 'Vista al patio interior', en: 'Interior courtyard view' },
    description: {
      es: [
        'La Habitación Patio es el corazón tranquilo de la casa. Sus 30 m² de elegancia colonial están bañados por la luz que entra desde el patio interior, donde las palmeras centenarias y el murmullo de la fuente original crean una atmósfera de calma única en Cartagena.',
        'La cama king de madera tallada, los techos de vigas originales del siglo XVIII y los pisos de mármol italiano son testigos del meticuloso trabajo de restauración de la familia Aristizábal. Cada detalle habla de la historia sin sacrificar el confort moderno.',
        'El baño en mármol blanco incluye una tina de porcelana donde relajarse después de un día explorando el Centro Histórico, a solo 2 minutos a pie de la muralla colonial.',
      ],
      en: [
        'The Patio Room is the peaceful heart of the house. Its 30 m² of colonial elegance are bathed in the light that enters from the interior courtyard, where century-old palms and the murmur of the original fountain create a calm atmosphere unique to Cartagena.',
        'The carved wood king bed, original 18th-century beam ceilings and Italian marble floors bear witness to the meticulous restoration work of the Aristizábal family. Every detail speaks of history without sacrificing modern comfort.',
        'The white marble bathroom includes a porcelain soaking tub in which to unwind after a day exploring the Historic Center, just a 2-minute walk from the colonial city wall.',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&auto=format&fit=crop',
        alt: { es: 'Habitación Patio — cama king con vigas coloniales', en: 'Patio Room — king bed with colonial beams' },
      },
      {
        url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Baño en mármol con tina de porcelana', en: 'Marble bathroom with porcelain soaking tub' },
      },
      {
        url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Detalle interior con amoblado colonial', en: 'Interior detail with colonial furnishings' },
      },
      {
        url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Vista del patio interior desde la habitación', en: 'View of the interior courtyard from the room' },
      },
    ],
  },
  {
    slug: 'balcon',
    priceCOP: 1200000,
    priceUSD: 295,
    sqm: 40,
    maxGuests: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=85&auto=format&fit=crop',
    imageAlt: {
      es: 'Habitación con balcón privado sobre la calle empedrada colonial',
      en: 'Room with private balcony overlooking the cobblestone colonial street',
    },
    amenities: ['A/C', 'Tina', 'WiFi', 'Minibar', 'Balcón', 'Nespresso'],
    view: { es: 'Balcón sobre la calle colonial', en: 'Balcony over the colonial street' },
    description: {
      es: [
        'La Habitación Balcón es un cuadro vivo de Cartagena. Sus 40 m² incluyen un balcón privado de madera tallada sobre la calle empedrada del barrio San Diego, donde el ritmo colonial de la ciudad se convierte en tu mejor espectáculo cada mañana.',
        'El interior combina el lujo discreto de la madera oscura con la frescura del lino blanco. La Nespresso Vertuo y el minibar con selección de rones locales completan un espacio diseñado para quien entiende que el verdadero lujo está en los detalles.',
        'Desde el balcón, a metros de la muralla, contemplarás las fachadas coloniales de colores vivos que han inspirado a escritores y artistas durante siglos. La luz del Caribe a la hora dorada desde este balcón es, simplemente, perfecta.',
      ],
      en: [
        'The Balcony Room is a living painting of Cartagena. Its 40 m² include a carved wood private balcony over the cobblestone street of the San Diego neighborhood, where the colonial rhythm of the city becomes your finest spectacle each morning.',
        'The interior combines the discreet luxury of dark wood with the freshness of white linen. The Nespresso Vertuo and minibar with a selection of local rums complete a space designed for those who understand that true luxury lies in the details.',
        'From the balcony, steps from the city wall, you will contemplate the brightly-colored colonial facades that have inspired writers and artists for centuries. The Caribbean light at golden hour from this balcony is, simply, perfect.',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=85&auto=format&fit=crop',
        alt: { es: 'Habitación Balcón — balcón privado sobre la calle colonial', en: 'Balcony Room — private balcony over the colonial street' },
      },
      {
        url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Dormitorio de lujo con cama king y lencería premium', en: 'Luxury bedroom with king bed and premium linens' },
      },
      {
        url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Baño completo con tina y ducha independiente', en: 'Full bathroom with soaking tub and separate shower' },
      },
      {
        url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Detalle del minibar y zona de trabajo iluminada', en: 'Minibar detail and illuminated work area' },
      },
    ],
  },
  {
    slug: 'mirador',
    priceCOP: 1950000,
    priceUSD: 480,
    sqm: 65,
    maxGuests: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=85&auto=format&fit=crop',
    imageAlt: {
      es: 'Suite Mirador con terraza privada y vistas panorámicas de la ciudad amurallada',
      en: 'Mirador Suite with private terrace and panoramic views of the walled city',
    },
    amenities: ['A/C', 'Tina', 'WiFi', 'Minibar', 'Terraza', 'Jacuzzi', 'Mayordomo'],
    view: { es: 'Terraza con vista a la muralla', en: 'Terrace with city wall views' },
    description: {
      es: [
        'La Suite Mirador es la joya de Casa Boutique San Diego. Sus 65 m² —los más amplios de la casa— se distribuyen entre una habitación principal con cama king, una sala de estar independiente y una terraza privada con jacuzzi donde la ciudad amurallada de Cartagena se abre ante ti como un mapa del tiempo.',
        'Cada elemento ha sido seleccionado con obsesión: el jacuzzi de piedra con vista a los tejados coloniales, la cama tapizada en terciopelo cálido, las obras originales de artistas locales, el minibar con champagne y selección premium de licores del Caribe.',
        'La Suite incluye servicio de mayordomo personal disponible las 24 horas para gestionar cualquier detalle de tu estancia: desde preparar el jacuzzi al atardecer con pétalos de rosa hasta organizar una cena privada en la terraza con menú especial del chef. Esto no es un hotel. Es tu casa en Cartagena.',
      ],
      en: [
        'The Mirador Suite is the jewel of Casa Boutique San Diego. Its 65 m² —the most spacious in the house— are distributed between a main bedroom with king bed, an independent living area and a private terrace with jacuzzi where Cartagena\'s walled city opens before you like a map through time.',
        'Every element has been selected with obsessive care: the stone jacuzzi overlooking colonial rooftops, the bed upholstered in warm velvet, original artworks by local artists, the minibar with champagne and a premium selection of Caribbean spirits.',
        'The Suite includes a 24-hour personal butler service to manage every detail of your stay: from preparing the sunset jacuzzi with rose petals to arranging a private terrace dinner with a special chef\'s menu. This is not a hotel. It is your home in Cartagena.',
      ],
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85&auto=format&fit=crop',
        alt: { es: 'Suite Mirador — terraza privada con vista panorámica', en: 'Mirador Suite — private terrace with panoramic views' },
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Jacuzzi privado en la terraza con vista a los tejados coloniales', en: 'Private jacuzzi on the terrace with colonial rooftop views' },
      },
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Dormitorio principal de la suite con cama king y sala de estar', en: 'Main suite bedroom with king bed and sitting area' },
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85&auto=format&fit=crop',
        alt: { es: 'Sala de estar independiente de la suite con luz natural', en: 'Suite independent living area with natural light' },
      },
    ],
  },
];

export function formatPriceCOP(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((r) => r.slug === slug);
}

export function getAdjacentRooms(slug: string): { prev: Room; next: Room } {
  const idx = ROOMS.findIndex((r) => r.slug === slug);
  const prev = ROOMS[(idx - 1 + ROOMS.length) % ROOMS.length];
  const next = ROOMS[(idx + 1) % ROOMS.length];
  return { prev, next };
}
