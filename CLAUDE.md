# Casa Boutique San Diego — Proyecto Web Premium

## Contexto estratégico

Sitio web profesional para hotel boutique ficticio en Cartagena, Colombia. Cumple tres funciones:
1. **Cerrar ventas** con dueños de hoteles boutique (presupuestos 3M+ COP)
2. **Portafolio premium** para aplicar a empresas tech remotas en USD
3. **Plantilla reutilizable** para futuros proyectos (3M+ COP cada uno)

**NO es prototipo desechable. Es código de producción de alta gama.**

---

## Hotel ficticio

- **Nombre:** Casa Boutique San Diego
- **Tagline ES:** "Una casa colonial. Una experiencia inolvidable."
- **Tagline EN:** "A colonial house. An unforgettable experience."
- **Concepto:** Hotel boutique 12 habitaciones, casa colonial restaurada siglo XVIII, barrio San Diego, Cartagena
- **Categoría:** 5 estrellas boutique
- **Dirección:** Calle de las Bóvedas #39-67, Barrio San Diego, Centro Histórico Amurallado
- **Teléfono:** +57 305 234 5678
- **Email:** reservas@casaboutiquesandiego.com
- **WhatsApp:** +57 305 234 5678 → wa.me/573052345678
- **Recepción:** 24 horas

---

## Stack técnico

- **Framework:** Next.js 14.2.x con App Router
- **Lenguaje:** TypeScript estricto (NO any)
- **Estilos:** Tailwind CSS 3.4.x
- **Componentes:** shadcn/ui
- **Animaciones:** Framer Motion 11.x
- **i18n:** next-intl 3.x (ES default, EN)
- **Temas:** next-themes 0.3.x (claro principal, oscuro premium)
- **Iconos:** lucide-react
- **Fechas:** date-fns 3.x
- **Formularios:** react-hook-form 7.x + zod 3.x
- **Notificaciones:** sonner 1.x
- **Galería:** yet-another-react-lightbox 3.x
- **Carrusel:** embla-carousel-react 8.x

---

## Estado actual del proyecto (actualizar en cada sesión)

### Sesión 1 — COMPLETADA ✓

**Completado:**
- [x] Proyecto Next.js 14 creado con TypeScript + Tailwind
- [x] Dependencias instaladas: framer-motion, next-intl, next-themes, lucide-react, date-fns, react-hook-form, zod, sonner, yet-another-react-lightbox, embla-carousel-react
- [x] shadcn/ui v4 inicializado (usa Base UI, no Radix — importante para futuros componentes)
- [x] next-intl configurado: middleware.ts, i18n/request.ts, messages/es.json, messages/en.json
- [x] Fonts configurados: Cormorant Garamond + Playfair Display + Inter vía next/font
- [x] Paleta completa en tailwind.config.ts + globals.css con CSS variables hotel-*
- [x] next-themes configurado (light default, dark premium)
- [x] Navbar premium: transparente sobre hero, blur al scroll, mobile sheet, ES/EN toggle, theme toggle
- [x] Hero cinematográfico: Ken Burns, gradient overlay, badge, pre-title, h1 serif, CTAs, scroll indicator
- [x] QuickSearchWidget: date picker, selector huéspedes, botón búsqueda → /reservar
- [x] WhatsApp flotante con tooltip
- [x] Footer premium: 4 columnas, certificaciones, créditos
- [x] Build 100% exitoso, TypeScript strict, 0 errores

**NOTA TÉCNICA IMPORTANTE:**
shadcn v4 usa `@base-ui/react` (NOT Radix UI). El patrón de composición es diferente:
- NO usar `asChild` prop
- Usar `render` prop para personalizar elementos: `<SheetClose render={<Link href="..." />} />`
- SheetContent tiene `showCloseButton={true}` por defecto → pasar `showCloseButton={false}` si pones tu propio botón

**Sesiones futuras:**
- Sesión 2: Intro/Bienvenida + Habitaciones Destacadas + Experiencia/Servicios
- Sesión 3: Motor de reservas wizard completo (5 pasos)
- Sesión 4: Restaurante + Experiencias curadas + Galería con lightbox
- Sesión 5: Testimonios + Ubicación + Contacto + Newsletter + Footer premium
- Sesión 6: Páginas internas (habitaciones, restaurante, experiencias, contacto)
- Sesión 7: SEO + Performance + Accessibility + Deploy

---

## Paleta de colores

### Modo claro (principal)
```css
--color-bg: #FAF6F0           /* crema cálido, casi marfil */
--color-surface: #FFFFFF
--color-surface-alt: #F5EDE0  /* crema más cálido para secciones alternas */
--color-text: #2A2620          /* casi negro cálido */
--color-text-secondary: #6B6259 /* taupe */
--color-text-tertiary: #9A9088  /* gris cálido para metadata */
--color-primary: #8B6F47       /* terracota dorado */
--color-gold: #C9A86B          /* oro envejecido */
--color-deep: #4A3829          /* marrón colonial */
--color-botanical: #6B7F5C     /* verde botánico */
```

### Modo oscuro (premium nocturno)
```css
--color-bg: #1A1612
--color-surface: #252019
--color-surface-alt: #2D261D
--color-text: #F5EDE0
--color-text-secondary: #C4B8A6
--color-gold: #D4B47C
```

---

## Tipografía

- **H1 grandes:** Cormorant Garamond (300/400/500, italic disponible)
- **H2-H3:** Playfair Display (400/600/700)
- **Cuerpo y UI:** Inter (400/500/600)
- **Labels uppercase:** Inter con letter-spacing 0.15em
- **Números especiales:** Cormorant Garamond italic

### Tamaños
- H1 hero: 80px desktop / 48px mobile
- H2 sección: 56px desktop / 36px mobile
- H3: 32px desktop / 24px mobile
- Body: 17px desktop / 16px mobile
- Small: 14px

---

## Habitaciones

### Habitación Patio (4 disponibles)
- Tarifa: $850.000 COP/noche (~$210 USD)
- 30 m², cama king, vista al patio interior
- Amenities: A/C, baño con tina, WiFi, minibar premium

### Habitación Balcón (5 disponibles)
- Tarifa: $1.200.000 COP/noche (~$295 USD)
- 40 m², cama king, balcón con vista a calle colonial
- Amenities: A/C, baño con tina, WiFi, minibar premium, balcón privado, Nespresso

### Suite Mirador (3 disponibles)
- Tarifa: $1.950.000 COP/noche (~$480 USD)
- 65 m², cama king, terraza privada con vista a la ciudad amurallada
- Amenities: todo lo anterior + sala de estar + jacuzzi privado + mayordomo

---

## Precios por temporada
- **Alta:** dic-feb
- **Media:** jun-jul-mar
- **Baja:** resto del año

---

## Motor de reservas — 5 pasos

1. Fechas y huéspedes
2. Selección de habitación
3. Extras y experiencias
4. Datos del huésped
5. Confirmación (código formato CSD-2026-XXXX)

Extras disponibles:
- Desayuno gourmet +$60.000/persona/día
- Traslado aeropuerto +$180.000
- Botella de bienvenida + decoración romántica +$280.000
- Tour privado ciudad amurallada +$350.000/persona
- Spa: masaje 60 min para dos +$420.000
- Tour Islas del Rosario en lancha privada +$1.200.000

---

## Restaurante
- **Nombre:** El Patio de las Bóvedas
- **Concepto:** Cocina caribeña contemporánea con productos locales
- Menú degustación: 7 tiempos · $280.000 COP/persona

---

## Reglas de diseño innegociables

1. "Cuando dudes entre elegante y muy elegante, elige muy elegante"
2. Más espacio en blanco del que crees necesario
3. Tipografías serif para títulos siempre (Cormorant Garamond / Playfair Display)
4. Animaciones sutiles, nunca exageradas
5. Colores cálidos, NUNCA azules tech ni grises corporativos
6. Imágenes son protagonistas
7. Mobile debe verse igual de premium que desktop
8. Código limpio: componentes máximo 200 líneas
9. TypeScript estricto (NO any)
10. Datos en archivos separados, NO hardcodeados en JSX

---

## Estructura de archivos objetivo

```
/app
  /[locale]
    /page.tsx (home)
    /habitaciones/page.tsx
    /habitaciones/[slug]/page.tsx
    /reservar/page.tsx
    /restaurante/page.tsx
    /experiencias/page.tsx
    /galeria/page.tsx
    /nosotros/page.tsx
    /contacto/page.tsx
    /layout.tsx
  /globals.css
  /not-found.tsx
/components
  /sections
    /hero-cinematic.tsx
    /intro-bienvenida.tsx
    /habitaciones-destacadas.tsx
    /experiencia-servicios.tsx
    /restaurante.tsx
    /experiencias-curadas.tsx
    /galeria.tsx
    /testimonios.tsx
    /ubicacion.tsx
    /contacto-reservas.tsx
    /newsletter.tsx
  /reservas
    /booking-wizard.tsx
    /step-fechas.tsx
    /step-habitacion.tsx
    /step-extras.tsx
    /step-datos.tsx
    /step-confirmacion.tsx
    /booking-summary.tsx
    /room-card.tsx
    /quick-search-widget.tsx
  /shared
    /navbar.tsx
    /footer.tsx
    /whatsapp-float.tsx
    /language-toggle.tsx
    /theme-toggle.tsx
    /image-with-blur.tsx
  /ui (shadcn components)
/lib
  /rooms-data.ts
  /availability-data.ts
  /pricing-data.ts
  /experiences-data.ts
  /testimonials-data.ts
  /utils.ts
/messages
  /es.json
  /en.json
/types
  /room.ts
  /reservation.ts
  /experience.ts
```

---

## SEO y accesibilidad
- Metadata completa por página y por idioma
- Open Graph + Twitter Cards
- JSON-LD Schema.org: Hotel + LocalBusiness + Reviews
- WCAG AA mínimo
- Lighthouse target: 90+ en todo
- LCP < 2.5s, CLS < 0.1

---

## Créditos del sitio
- Diseñado por: José Luis Arteta · joseluisarteta.com
- Copyright: © 2026 Casa Boutique San Diego

---

## Notas de retoma de sesión

Para retomar el trabajo, dile a Claude:
> "Continúa con el proyecto Casa Boutique San Diego. Lee el CLAUDE.md y continúa donde nos quedamos."

El proyecto está en `C:\Users\Zaduke\Documents\casa-boutique-san-diego`.

**Próximo paso al retomar:** Sesión 2 — Intro/Bienvenida + Habitaciones Destacadas + Experiencia/Servicios.

Antes de empezar cualquier sesión:
1. Leer este CLAUDE.md completo
2. Revisar el estado de la sección "Estado actual del proyecto"
3. Verificar la nota técnica de shadcn v4 / Base UI
4. Preguntar al usuario si quiere ajustes antes de construir
