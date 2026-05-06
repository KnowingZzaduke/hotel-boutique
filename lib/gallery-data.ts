export type GalleryCategory = 'all' | 'habitaciones' | 'espacios' | 'gastronomia' | 'cartagena';

export interface GalleryImage {
  id: string;
  url: string;
  alt: { es: string; en: string };
  category: Exclude<GalleryCategory, 'all'>;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // Habitaciones
  {
    id: 'room-patio-1',
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&auto=format&fit=crop',
    alt: { es: 'Habitación Patio con cama king y vigas coloniales originales', en: 'Patio Room with king bed and original colonial beams' },
    category: 'habitaciones',
  },
  {
    id: 'room-balcon-1',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=85&auto=format&fit=crop',
    alt: { es: 'Habitación Balcón con vista a la calle empedrada colonial', en: 'Balcony Room overlooking the cobblestone colonial street' },
    category: 'habitaciones',
  },
  {
    id: 'room-mirador-1',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85&auto=format&fit=crop',
    alt: { es: 'Suite Mirador con terraza privada y vista panorámica', en: 'Mirador Suite with private terrace and panoramic views' },
    category: 'habitaciones',
  },
  {
    id: 'room-bath-1',
    url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Baño en mármol con tina de porcelana y amenidades de lujo', en: 'Marble bathroom with porcelain soaking tub and luxury amenities' },
    category: 'habitaciones',
  },
  {
    id: 'room-detail-1',
    url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Dormitorio de lujo con lencería premium y luz natural', en: 'Luxury bedroom with premium linens and natural light' },
    category: 'habitaciones',
  },
  {
    id: 'room-suite-1',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Suite con sala de estar y vista al patio colonial', en: 'Suite with sitting area and colonial courtyard view' },
    category: 'habitaciones',
  },
  // Espacios
  {
    id: 'space-pool',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85&auto=format&fit=crop',
    alt: { es: 'Piscina interior colonial rodeada de palmeras centenarias', en: 'Colonial indoor pool surrounded by century-old palms' },
    category: 'espacios',
  },
  {
    id: 'space-patio',
    url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Patio central con vegetación tropical y pozo colonial original', en: 'Central courtyard with tropical vegetation and original colonial well' },
    category: 'espacios',
  },
  {
    id: 'space-spa',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Sala de tratamientos Spa & Bienestar con ambientación colonial', en: 'Spa & Wellness treatment room with colonial ambiance' },
    category: 'espacios',
  },
  {
    id: 'space-rooftop',
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Terraza con bar y vista privilegiada a la muralla colonial', en: 'Rooftop bar with privileged views of the colonial city wall' },
    category: 'espacios',
  },
  {
    id: 'space-facade',
    url: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Fachada colonial restaurada del siglo XVIII en colores cálidos', en: 'Restored 18th-century colonial facade in warm colors' },
    category: 'espacios',
  },
  // Gastronomía
  {
    id: 'gastro-restaurant',
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop',
    alt: { es: 'Sala principal de El Patio de las Bóvedas con iluminación íntima', en: 'Main dining room of El Patio de las Bóvedas with intimate lighting' },
    category: 'gastronomia',
  },
  {
    id: 'gastro-table',
    url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Mesa montada para el menú degustación de 7 tiempos', en: 'Table set for the 7-course tasting menu' },
    category: 'gastronomia',
  },
  {
    id: 'gastro-cocktails',
    url: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Cócteles artesanales con ingredientes del Caribe colombiano', en: 'Artisan cocktails with Colombian Caribbean ingredients' },
    category: 'gastronomia',
  },
  // Cartagena
  {
    id: 'city-street',
    url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=85&auto=format&fit=crop',
    alt: { es: 'Calles empedradas del barrio San Diego al amanecer', en: 'Cobblestone streets of San Diego neighborhood at dawn' },
    category: 'cartagena',
  },
  {
    id: 'city-jacuzzi',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Jacuzzi privado con vista a los tejados coloniales de Cartagena', en: 'Private jacuzzi with views of Cartagena\'s colonial rooftops' },
    category: 'cartagena',
  },
];

export const GALLERY_CATEGORIES: { value: GalleryCategory; label: { es: string; en: string } }[] = [
  { value: 'all',          label: { es: 'Todas',        en: 'All'           } },
  { value: 'habitaciones', label: { es: 'Habitaciones', en: 'Rooms'         } },
  { value: 'espacios',     label: { es: 'Espacios',     en: 'Spaces'        } },
  { value: 'gastronomia',  label: { es: 'Gastronomía',  en: 'Gastronomy'    } },
  { value: 'cartagena',    label: { es: 'Cartagena',    en: 'Cartagena'     } },
];
