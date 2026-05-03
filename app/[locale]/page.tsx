import { HeroCinematic } from '@/components/sections/hero-cinematic';
import { IntroBienvenida } from '@/components/sections/intro-bienvenida';
import { HabitacionesDestacadas } from '@/components/sections/habitaciones-destacadas';
import { ExperienciaServicios } from '@/components/sections/experiencia-servicios';
import { Restaurante } from '@/components/sections/restaurante';
import { ExperienciasCuradas } from '@/components/sections/experiencias-curadas';
import { Galeria } from '@/components/sections/galeria';
import { Testimonios } from '@/components/sections/testimonios';
import { Ubicacion } from '@/components/sections/ubicacion';
import { ContactoReservas } from '@/components/sections/contacto-reservas';
import { Newsletter } from '@/components/sections/newsletter';
import { WhatsappFloat } from '@/components/shared/whatsapp-float';

export default function HomePage() {
  return (
    <>
      <HeroCinematic />
      <IntroBienvenida />
      <HabitacionesDestacadas />
      <ExperienciaServicios />
      <Restaurante />
      <ExperienciasCuradas />
      <Galeria />
      <Testimonios />
      <Ubicacion />
      <ContactoReservas />
      <Newsletter />
      <WhatsappFloat />
    </>
  );
}
