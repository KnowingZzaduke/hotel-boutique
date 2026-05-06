export interface MenuItem {
  name: { es: string; en: string };
  desc: { es: string; en: string };
  price: string;
  tag?: { es: string; en: string };
}

export interface MenuSection {
  id: string;
  title: { es: string; en: string };
  schedule: { es: string; en: string };
  items: MenuItem[];
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'desayuno',
    title: { es: 'Desayuno', en: 'Breakfast' },
    schedule: { es: '7:00 — 11:00 am', en: '7:00 — 11:00 am' },
    items: [
      {
        name: { es: 'Arepas de choclo con hogao', en: 'Corn arepas with hogao sauce' },
        desc: { es: 'Arepas artesanales de maíz tierno, hogao criollo, queso costeño rallado y aguacate de la Sierra Nevada', en: 'Artisan young corn arepas, creole hogao sauce, grated coastal cheese and Sierra Nevada avocado' },
        price: '$45.000',
      },
      {
        name: { es: 'Ceviche de camarones matutino', en: 'Morning shrimp ceviche' },
        desc: { es: 'Camarones del Golfo de Morrosquillo, limón Tahití, cilantro, ají dulce y leche de tigre de coco', en: "Gulf of Morrosquillo shrimp, Tahiti lime, cilantro, sweet chili and coconut tiger's milk" },
        price: '$52.000',
        tag: { es: 'Firma del chef', en: "Chef's signature" },
      },
      {
        name: { es: 'Huevos benedictinos tropicales', en: 'Tropical eggs benedict' },
        desc: { es: 'Huevos escalfados sobre tostada de pan de yuca, jamón serrano y salsa holandesa con aceite de coco', en: 'Poached eggs on yuca bread toast, serrano ham and hollandaise with coconut oil' },
        price: '$48.000',
      },
      {
        name: { es: 'Granola artesanal del Caribe', en: 'Caribbean artisan granola' },
        desc: { es: 'Granola de avena con coco tostado, mango deshidratado, semillas de maracuyá y yogurt natural de la hacienda', en: 'Oat granola with toasted coconut, dehydrated mango, passion fruit seeds and natural hacienda yogurt' },
        price: '$38.000',
      },
    ],
  },
  {
    id: 'carta',
    title: { es: 'Carta', en: 'À la Carte' },
    schedule: { es: '12:00 — 10:30 pm', en: '12:00 — 10:30 pm' },
    items: [
      {
        name: { es: 'Ceviche de camarones del Golfo', en: 'Gulf shrimp ceviche' },
        desc: { es: 'Camarones en leche de coco con ají chombo, aguacate, cebolla morada encurtida y tostones crujientes', en: 'Shrimp in coconut milk with chombo chili, avocado, pickled red onion and crispy tostones' },
        price: '$78.000',
        tag: { es: 'Plato estrella', en: 'Star dish' },
      },
      {
        name: { es: 'Mote de queso de Mompox', en: 'Mompox cheese mote' },
        desc: { es: 'Crema de ñame y queso costeño ahumado, aceite de achiote y crostini de maíz artesanal', en: 'Yam cream with smoked coastal cheese, annatto oil and artisan corn crostini' },
        price: '$65.000',
      },
      {
        name: { es: 'Róbalo a la brasa del Caribe', en: 'Caribbean grilled snook' },
        desc: { es: 'Filete de róbalo sobre arroz de coco, patacones artesanales, ensalada de mango verde y salsa de tamarindo', en: 'Snook fillet on coconut rice, artisan patacones, green mango salad and tamarind sauce' },
        price: '$185.000',
      },
      {
        name: { es: 'Lengua a la criolla', en: 'Creole braised tongue' },
        desc: { es: 'Lengua de res estofada en hogao, guandú con coco, yuca al vapor y ají pique de la casa', en: 'Beef tongue braised in hogao, coconut guandú beans, steamed yuca and house chili sauce' },
        price: '$160.000',
      },
      {
        name: { es: 'Torta de plátano con helado de coco', en: 'Plantain cake with coconut ice cream' },
        desc: { es: 'Torta tibia de plátano maduro caramelizado, helado artesanal de coco con sal de Manaure y caramelo de panela', en: 'Warm caramelized ripe plantain cake, artisan coconut ice cream with Manaure salt and panela caramel' },
        price: '$48.000',
      },
    ],
  },
  {
    id: 'degustacion',
    title: { es: 'Menú Degustación', en: 'Tasting Menu' },
    schedule: { es: '7:00 — 10:30 pm · Solo con reserva', en: '7:00 — 10:30 pm · Reservation required' },
    items: [
      {
        name: { es: 'Siete tiempos del Caribe colombiano', en: 'Seven courses of the Colombian Caribbean' },
        desc: {
          es: 'Un viaje gastronómico por el litoral Caribe: aperitivos de mar, sopa fría de coco y mango, ceviche de langostinos, plato de pescado de temporada, selección de carnes con acompañamientos locales, tabla de quesos artesanales de Boyacá y postre de la casa. Maridaje de vinos disponible a $120.000 adicionales.',
          en: 'A gastronomic journey through the Caribbean coast: sea amuse-bouches, cold coconut and mango soup, langoustine ceviche, seasonal fish course, selection of meats with local sides, artisan cheese board from Boyacá and house dessert. Wine pairing available for an additional $120,000.',
        },
        price: '$280.000 / persona',
        tag: { es: 'Requiere reserva anticipada', en: 'Advance reservation required' },
      },
    ],
  },
];

export const RESTAURANT_GALLERY = [
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop',
    alt: { es: 'El Patio de las Bóvedas — sala principal del restaurante', en: 'El Patio de las Bóvedas — main dining room' },
  },
  {
    url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Montaje de mesa con cristalería premium y flores tropicales', en: 'Table setting with premium glassware and tropical flowers' },
  },
  {
    url: 'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Terraza exterior del restaurante con jardín tropical', en: 'Restaurant outdoor terrace with tropical garden' },
  },
  {
    url: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=900&q=85&auto=format&fit=crop',
    alt: { es: 'Carta de cócteles con ingredientes caribeños locales', en: 'Cocktail menu with local Caribbean ingredients' },
  },
];
