export interface Testimonial {
  id: string;
  name: string;
  origin: { es: string; en: string };
  avatarUrl: string;
  rating: 5;
  text: { es: string; en: string };
  date: string;
  platform: 'Google' | 'TripAdvisor' | 'Booking.com';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'maria-c',
    name: 'María C.',
    origin: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
    text: {
      es: 'Quedarse en Casa Boutique San Diego fue como entrar a otra época. El patio colonial, el silencio de las piedras y la atención de cada miembro del equipo hacen de esta casa algo verdaderamente único en Cartagena. El desayuno en el patio fue lo mejor de todo el viaje.',
      en: 'Staying at Casa Boutique San Diego felt like stepping into another era. The colonial courtyard, the silence of the stone walls and the attention of each team member make this house truly unique in Cartagena. Breakfast in the courtyard was the highlight of the entire trip.',
    },
    date: '2026-03-14',
    platform: 'Google',
  },
  {
    id: 'james-w',
    name: 'James W.',
    origin: { es: 'Nueva York, EE.UU.', en: 'New York, USA' },
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
    text: {
      es: 'He viajado a más de 40 países y este es uno de los diez mejores hoteles en los que he estado. La Suite Mirador con vista a las murallas al atardecer es simplemente espectacular. El equipo anticipó cada necesidad antes de que la expresáramos.',
      en: 'I have traveled to over 40 countries and this is one of the ten best hotels I have ever stayed in. The Mirador Suite with views of the city walls at sunset is simply spectacular. The team anticipated every need before we even expressed it.',
    },
    date: '2026-02-28',
    platform: 'TripAdvisor',
  },
  {
    id: 'sofia-r',
    name: 'Sofía R.',
    origin: { es: 'Madrid, España', en: 'Madrid, Spain' },
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
    text: {
      es: 'Vinimos para nuestra luna de miel y Casa Boutique San Diego superó todas las expectativas. La botella de bienvenida, la decoración en la habitación y el tour privado por la ciudad amurallada fueron detalles que recordaremos siempre. Una joya escondida.',
      en: 'We came for our honeymoon and Casa Boutique San Diego exceeded all expectations. The welcome bottle, the room decoration and the private walled city tour were details we will always remember. A hidden gem.',
    },
    date: '2026-01-20',
    platform: 'Booking.com',
  },
  {
    id: 'carlos-a',
    name: 'Carlos A.',
    origin: { es: 'Medellín, Colombia', en: 'Medellín, Colombia' },
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
    text: {
      es: 'El restaurante El Patio de las Bóvedas merece una mención aparte. El menú degustación de 7 tiempos fue una experiencia gastronómica de primer nivel. Maridaje perfecto, servicio impecable y una cocina caribeña que reinterpreta lo clásico con maestría absoluta.',
      en: 'The El Patio de las Bóvedas restaurant deserves a special mention. The 7-course tasting menu was a top-tier gastronomic experience. Perfect wine pairing, impeccable service and a Caribbean cuisine that reinterprets the classics with absolute mastery.',
    },
    date: '2026-04-05',
    platform: 'Google',
  },
  {
    id: 'emma-l',
    name: 'Emma L.',
    origin: { es: 'París, Francia', en: 'Paris, France' },
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
    text: {
      es: 'Conocí hoteles boutique en todo el mundo, pero Casa Boutique San Diego tiene algo especial: el alma de una casa familiar con el nivel de un pequeño lujo europeo. El spa con ingredientes caribeños fue revelador. Volveré sin duda el próximo año.',
      en: 'I have known boutique hotels around the world, but Casa Boutique San Diego has something special: the soul of a family home with the level of a small European luxury. The spa with Caribbean ingredients was eye-opening. I will definitely return next year.',
    },
    date: '2026-03-30',
    platform: 'TripAdvisor',
  },
  {
    id: 'alejandro-m',
    name: 'Alejandro M.',
    origin: { es: 'Buenos Aires, Argentina', en: 'Buenos Aires, Argentina' },
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    rating: 5,
    text: {
      es: 'La ubicación es perfecta: a dos minutos de la muralla, en pleno barrio San Diego, pero con la calma de una casa privada. El tour a las Islas del Rosario en lancha privada que organizaron fue el punto culminante de unas vacaciones de diez días por Colombia.',
      en: 'The location is perfect: two minutes from the city wall, right in the San Diego neighborhood, but with the calm of a private home. The private speedboat tour to the Rosario Islands they arranged was the highlight of a ten-day vacation across Colombia.',
    },
    date: '2026-02-10',
    platform: 'Google',
  },
];
