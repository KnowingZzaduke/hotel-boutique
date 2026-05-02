export interface Extra {
  id: string;
  label: { es: string; en: string };
  desc: { es: string; en: string };
  badge: { es: string; en: string };
  priceCOP: number;
  priceUSD: number;
  perPerson: boolean;
  perNight: boolean;
}

export const EXTRAS: Extra[] = [
  {
    id: 'breakfast',
    label: { es: 'Desayuno gourmet',       en: 'Gourmet breakfast'       },
    desc:  { es: 'Desayuno caribeño de 5 tiempos servido en el patio colonial', en: '5-course Caribbean breakfast served in the colonial courtyard' },
    badge: { es: 'por persona / noche',    en: 'per person / night'      },
    priceCOP: 60000,  priceUSD: 15,  perPerson: true,  perNight: true,
  },
  {
    id: 'transfer',
    label: { es: 'Traslado aeropuerto',    en: 'Airport transfer'        },
    desc:  { es: 'Vehículo privado de lujo desde/hacia el aeropuerto Rafael Núñez', en: 'Luxury private vehicle from/to Rafael Núñez Airport' },
    badge: { es: 'ida y vuelta',           en: 'round trip'              },
    priceCOP: 180000, priceUSD: 44,  perPerson: false, perNight: false,
  },
  {
    id: 'romance',
    label: { es: 'Botella de bienvenida', en: 'Welcome bottle'           },
    desc:  { es: 'Champagne premium + decoración romántica en la habitación para tu llegada', en: 'Premium champagne + romantic room decoration upon arrival' },
    badge: { es: 'decoración incluida',   en: 'decoration included'     },
    priceCOP: 280000, priceUSD: 69,  perPerson: false, perNight: false,
  },
  {
    id: 'city-tour',
    label: { es: 'Tour ciudad amurallada', en: 'Walled city tour'        },
    desc:  { es: 'Recorrido privado por el Centro Histórico con guía experto local', en: 'Private Historic Center tour with expert local guide' },
    badge: { es: 'por persona',           en: 'per person'              },
    priceCOP: 350000, priceUSD: 86,  perPerson: true,  perNight: false,
  },
  {
    id: 'spa',
    label: { es: 'Masaje spa en pareja',  en: 'Couples spa massage'     },
    desc:  { es: 'Masaje de 60 min para dos con aceites esenciales del Caribe colombiano', en: '60-min couples massage with Colombian Caribbean essential oils' },
    badge: { es: 'para 2 personas',       en: 'for 2 people'            },
    priceCOP: 420000, priceUSD: 103, perPerson: false, perNight: false,
  },
  {
    id: 'islands',
    label: { es: 'Tour Islas del Rosario', en: 'Rosario Islands tour'   },
    desc:  { es: 'Excursión en lancha privada a las Islas del Rosario con snorkel incluido', en: 'Private speedboat excursion to the Rosario Islands, snorkel included' },
    badge: { es: 'excursión completa',    en: 'full excursion'          },
    priceCOP: 1200000, priceUSD: 295, perPerson: false, perNight: false,
  },
];

export function calcExtraPrice(extra: Extra, adults: number, nights: number): number {
  let price = extra.priceCOP;
  if (extra.perPerson) price *= adults;
  if (extra.perNight)  price *= Math.max(nights, 1);
  return price;
}

export function calcExtraPriceUSD(extra: Extra, adults: number, nights: number): number {
  let price = extra.priceUSD;
  if (extra.perPerson) price *= adults;
  if (extra.perNight)  price *= Math.max(nights, 1);
  return price;
}
