import { HeroCinematic } from '@/components/sections/hero-cinematic';
import { IntroBienvenida } from '@/components/sections/intro-bienvenida';
import { HabitacionesDestacadas } from '@/components/sections/habitaciones-destacadas';
import { ExperienciaServicios } from '@/components/sections/experiencia-servicios';
import { WhatsappFloat } from '@/components/shared/whatsapp-float';

export default function HomePage() {
  return (
    <>
      <HeroCinematic />
      <IntroBienvenida />
      <HabitacionesDestacadas />
      <ExperienciaServicios />
      {/* Sesión 4: Restaurante, ExperienciasCuradas, Galería */}
      {/* Sesión 5: Testimonios, Ubicacion, ContactoReservas, Newsletter */}
      <WhatsappFloat />
    </>
  );
}
