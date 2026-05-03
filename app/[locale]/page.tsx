import { HeroCinematic } from '@/components/sections/hero-cinematic';
import { IntroBienvenida } from '@/components/sections/intro-bienvenida';
import { HabitacionesDestacadas } from '@/components/sections/habitaciones-destacadas';
import { ExperienciaServicios } from '@/components/sections/experiencia-servicios';
import { Restaurante } from '@/components/sections/restaurante';
import { ExperienciasCuradas } from '@/components/sections/experiencias-curadas';
import { Galeria } from '@/components/sections/galeria';
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
      {/* Sesión 5: Testimonios, Ubicacion, ContactoReservas, Newsletter */}
      <WhatsappFloat />
    </>
  );
}
