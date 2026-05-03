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

- [x] Proyecto Next.js 14 creado con TypeScript + Tailwind
- [x] Dependencias instaladas: framer-motion, next-intl, next-themes, lucide-react, date-fns, react-hook-form, zod, sonner, yet-another-react-lightbox, embla-carousel-react
- [x] shadcn/ui v4 inicializado (usa Base UI, no Radix — importante para futuros componentes)
- [x] next-intl configurado: middleware.ts, i18n/request.ts, messages/es.json, messages/en.json
- [x] Fonts: Cormorant Garamond + Playfair Display + Inter vía next/font
- [x] Paleta completa en tailwind.config.ts + globals.css con CSS variables hotel-*
- [x] next-themes configurado (light default, dark premium)
- [x] Navbar premium: transparente sobre hero, blur al scroll, mobile sheet, ES/EN toggle, theme toggle
- [x] Hero cinematográfico: Ken Burns, gradient overlay, badge, pre-title, h1 serif, CTAs, scroll indicator
- [x] QuickSearchWidget: date picker, selector huéspedes, botón búsqueda → /reservar
- [x] WhatsApp flotante con tooltip
- [x] Footer premium: 4 columnas, certificaciones, créditos
- [x] Build 100% exitoso, TypeScript strict, 0 errores

### Sesión 2 — COMPLETADA ✓

- [x] `types/room.ts` — interface Room tipada (slug, priceCOP, priceUSD, sqm, maxGuests, imageUrl, imageAlt bilingual, amenities)
- [x] `lib/rooms-data.ts` — 3 habitaciones + `formatPriceCOP()` (Intl.NumberFormat)
- [x] `components/sections/intro-bienvenida.tsx` — split layout: texto + stats 12/1730/2min + mosaico 2 imágenes + badge "1730 Fundada"
- [x] `components/sections/habitaciones-destacadas.tsx` — grid 3 tarjetas: imagen portrait, nombre, tagline, desc, precio COP/USD por locale
- [x] `components/sections/experiencia-servicios.tsx` — grid 4×2 servicios (window-pane dividers), iconos lucide
- [x] Build 100% exitoso, TypeScript strict, 0 errores

**Imágenes Sesión 2 (Unsplash — reemplazar con fotos reales):**
- Intro main: `photo-1564501049412-61c2a3083791`
- Intro detail: `photo-1551882547-ff40c63fe5fa`
- Room patio: `photo-1631049307264-da0ec9d70304`
- Room balcón: `photo-1618773928121-c32242e63f39`
- Room mirador: `photo-1578683010236-d716f9a3f461`

**NOTA TÉCNICA IMPORTANTE — shadcn v4 / Base UI:**
- shadcn v4 usa `@base-ui/react` (NOT Radix UI)
- NO usar `asChild` prop → usar `render` prop: `<SheetClose render={<Link href="..." />} />`
- SheetContent tiene `showCloseButton={true}` por defecto → pasar `showCloseButton={false}` si pones tu propio botón

### Sesión 3 — COMPLETADA ✓

- [x] `components/reservas/booking-summary.tsx` — sidebar sticky: fechas, habitación, extras, total COP/USD
- [x] `components/reservas/step-confirmacion.tsx` — pantalla éxito animada: código CSD-2026-XXXX, CTAs WhatsApp + teléfono
- [x] `components/reservas/booking-wizard.tsx` — orquestador con `useReducer`, progress bar 5 pasos, layout 2 columnas desktop
- [x] `app/[locale]/reservar/page.tsx` — página pública con metadata SEO bilingüe
- [x] Bug fixes TypeScript: `step-datos.tsx` (Zod `.default('')`), `step-habitacion.tsx` (tipo `Room['slug'] | null`)
- [x] Build 100% exitoso, TypeScript strict, 0 errores, 0 warnings ESLint

**Arquitectura wizard:**
- Estado: `useReducer` + acciones tipadas (NEXT, BACK, CONFIRM, RESET)
- Código reserva: `CSD-2026-XXXX` con charset sin ambigüedades (sin 0/O/1/I)
- Layout: `grid lg:grid-cols-[1fr_340px]` con sidebar `lg:sticky lg:top-32`
- Paso 5 ocupa ancho completo, sin sidebar

### Sesión 3b — COMPLETADA ✓ (complemento de Sesión 3)

- [x] `.env.local` — variables Resend (API key, from email, hotel email, site URL)
- [x] `types/reservation.ts` — `BookingPayload` interface (serializable para API)
- [x] `lib/booking-email.ts` — templates HTML bilinguales: `buildGuestEmail()` + `buildHotelEmail()`
- [x] `app/api/booking/confirm/route.ts` — POST con Resend, `Promise.allSettled` (2 emails: huésped + hotel)
- [x] `lib/pdf-generator.ts` — `generateBookingPDF()` con jsPDF (client-side, import dinámico)
- [x] `step-confirmacion.tsx` — email en mount (`useRef` guard), estado email (sending/sent/error), botón PDF con loading
- [x] Paquetes: `resend`, `jspdf`
- [x] Build 100% exitoso, TypeScript strict, 0 errores

**Para activar emails:** crear cuenta Resend → reemplazar `RESEND_API_KEY` en `.env.local` → verificar dominio → cambiar `RESEND_FROM_EMAIL`

### Sesión 4 — COMPLETADA ✓

- [x] `lib/experiences-data.ts` — interface `Experience` + 6 experiencias curadas + `formatExperiencePriceCOP()`
- [x] `messages/es.json` + `messages/en.json` — claves nuevas: `restaurant`, `experiences`, `gallery` (8 captions de galería)
- [x] `components/sections/restaurante.tsx` — fondo oscuro `bg-hotel-deep`, split layout imagen/contenido, stats (horario/acceso/menú degustación), CTAs "Ver la carta" + "Reservar mesa" (WhatsApp)
- [x] `components/sections/experiencias-curadas.tsx` — grid 3×2, icono, número decorativo Cormorant, tagline italic, precio COP/USD por locale, duración, hover lift
- [x] `components/sections/galeria.tsx` — grid asimétrico 8 fotos (1ª = 2 filas desktop), hover overlay + ZoomIn icon + caption slide, lightbox `yet-another-react-lightbox`
- [x] `app/[locale]/page.tsx` — 3 secciones integradas al home: Restaurante → ExperienciasCuradas → Galeria
- [x] Build 100% exitoso, TypeScript strict, 0 errores

**Secuencia de fondos (home completo hasta ahora):**
`Hero (dark)` → `IntroBienvenida (bg)` → `HabitacionesDestacadas (surface-alt)` → `ExperienciaServicios (bg)` → `Restaurante (deep)` → `ExperienciasCuradas (surface-alt)` → `Galeria (bg)`

**Imágenes galería (Unsplash — reemplazar con fotos reales):**
- pool: `photo-1566073771259-6a8506099945`
- restaurant: `photo-1537047902294-62a40c20a6ae`
- facade: `photo-1590725121839-892b458a74fe`
- room: `photo-1600585154526-990dced4db0d`
- spa: `photo-1540555700478-4be289fbecef`
- rooftop: `photo-1527529482837-4698179dc6ce`
- street: `photo-1512813498816-36b04c1a5289`
- cocktails: `photo-1481931098730-318b6f776db0`

---

## Sesiones pendientes

### Sesión 5 — COMPLETADA ✓

- [x] `lib/testimonials-data.ts` — interface `Testimonial` + 6 reviews con avatar Unsplash, rating 5⭐, plataforma (Google/TripAdvisor/Booking.com), texto bilingüe
- [x] `messages/es.json` + `messages/en.json` — claves nuevas: `testimonios`, `ubicacion`, `contacto`, `newsletter`
- [x] `components/sections/testimonios.tsx` — carrusel embla-carousel-react, 3 cards visibles en desktop, nav arrows + dots, StarRating component, PlatformBadge con colores de marca
- [x] `components/sections/ubicacion.tsx` — mapa OpenStreetMap (iframe sin API key), split layout mapa/info, 4 tarjetas de distancia con iconos, CTA Google Maps
- [x] `components/sections/contacto-reservas.tsx` — react-hook-form + zod, split layout formulario/sidebar, info de contacto, CTA WhatsApp con fondo dark
- [x] `components/sections/newsletter.tsx` — fondo `bg-hotel-deep`, título serif en 2 líneas, input email + botón gold, nota de privacidad
- [x] `app/api/contact/route.ts` — POST con Resend (graceful si no configurado), email HTML premium con botón Reply al hotel
- [x] `app/api/newsletter/route.ts` — POST con Resend, soporte opcional Resend Audiences via `RESEND_AUDIENCE_ID`
- [x] `app/[locale]/page.tsx` — 4 secciones integradas: Testimonios → Ubicacion → ContactoReservas → Newsletter
- [x] Build 100% exitoso, TypeScript strict, 0 errores

**Secuencia completa de fondos (home):**
`Hero (dark)` → `Intro (bg)` → `Habitaciones (surface-alt)` → `Servicios (bg)` → `Restaurante (deep)` → `Experiencias (surface-alt)` → `Galeria (bg)` → **`Testimonios (surface-alt)`** → **`Ubicacion (bg)`** → **`Contacto (surface-alt)`** → **`Newsletter (deep)`** → Footer

**Mapa:** OpenStreetMap embed (no requiere API key) centrado en coords 10.4296°N / 75.5496°W (Barrio San Diego, Cartagena)

**Variables de entorno necesarias para activar funcionalidades Sesión 5:**
- `RESEND_API_KEY` — ya requerido desde Sesión 3b
- `RESEND_AUDIENCE_ID` (opcional) — para agregar suscriptores a Resend Audiences

### Sesión 6 — COMPLETADA ✓

**Data files nuevos:**
- [x] `types/room.ts` — extendido con `RoomGalleryImage`, `view`, `description`, `gallery` por habitación
- [x] `lib/rooms-data.ts` — 3 habitaciones con galería de 4 fotos c/u, descripciones 3 párrafos bilingüe, `getRoomBySlug()`, `getAdjacentRooms()`
- [x] `lib/restaurant-data.ts` — 3 secciones de menú (Desayuno, Carta, Degustación), galería restaurante
- [x] `lib/gallery-data.ts` — 16 imágenes categorizadas: habitaciones/espacios/gastronomia/cartagena + `GALLERY_CATEGORIES`

**Páginas internas (todas biliguales ES/EN, metadata SEO, 28 páginas estáticas generadas):**
- [x] `app/[locale]/habitaciones/page.tsx` — listado horizontal alternado: foto lado/contenido, amenities tags, stats m²/huéspedes, CTA "Ver detalles" + "Reservar"
- [x] `app/[locale]/habitaciones/[slug]/page.tsx` — server component con `generateStaticParams` + `generateMetadata`; hero 70vh con breadcrumb, highlights bar, descripción completa, amenities con iconos Lucide, galería con lightbox (client component separado), sticky booking card, nav prev/next habitación
- [x] `app/[locale]/habitaciones/[slug]/room-gallery-client.tsx` — client component separado para lightbox (resuelve conflicto `'use client'` + `generateStaticParams`)
- [x] `app/[locale]/restaurante/page.tsx` — hero + info bar horario/acceso, intro, menú degustación + carta + desayuno en cards, galería, CTA WhatsApp
- [x] `app/[locale]/experiencias/page.tsx` — header con descripción, grid 3×2 experiencias con duración/precio/CTA WhatsApp, sección conserjería a medida
- [x] `app/[locale]/galeria/page.tsx` — client component, header + filtros sticky por categoría, grid 4 columnas (1ª = 2×2), lightbox
- [x] `app/[locale]/contacto/page.tsx` — server component que compone `ContactoReservas` + `Ubicacion`
- [x] Build 100% exitoso, TypeScript strict, 0 errores, 28 páginas estáticas

### Sesión 7 — COMPLETADA ✓

**SEO — Indexación:**
- [x] `app/sitemap.ts` — sitemap dinámico todas las rutas × 2 locales, hreflang alternates, prioridades → genera `/sitemap.xml`
- [x] `app/robots.ts` — robots.txt, bloquea `/api/` y `/_next/`, referencia sitemap → genera `/robots.txt`

**SEO — Structured Data:**
- [x] `lib/schema.ts` — `hotelSchema()`, `breadcrumbSchema()`, `roomSchema()`, `restaurantSchema()`
- [x] `components/shared/json-ld.tsx` — renderer servidor `<script type="application/ld+json">`
- [x] Layout: Hotel JSON-LD en todas las páginas
- [x] `/habitaciones/[slug]`: HotelRoom + BreadcrumbList; `/restaurante`: Restaurant + BreadcrumbList; `/habitaciones`: BreadcrumbList

**Performance:**
- [x] `lib/blur-placeholder.ts` — `BLUR_WARM`, `BLUR_DEEP`, `BLUR_GOLD` (SVG base64, paleta hotel)
- [x] `next.config.mjs` — formatos AVIF + WebP, deviceSizes/imageSizes optimizados
- [x] Blur placeholders en: hero-cinematic, restaurante section, habitaciones listing, room hero, restaurante hero

**Seguridad (HTTP headers):**
- [x] 6 security headers: X-Content-Type-Options, X-Frame-Options:DENY, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS. Cache headers para static assets.

**Accesibilidad:**
- [x] `.scrollbar-hide` utility añadida (fix bug galería filtros)
- [x] Pre-existente: focus-visible gold, skip-to-content, aria-labels en hero

**Build: ✓ 30 páginas estáticas, sitemap.xml, robots.txt, 0 errores TypeScript**

**Deploy en Vercel:**
1. `vercel login` → conectar cuenta
2. `vercel --prod` o conectar repo en vercel.com/dashboard
3. Variables de entorno: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `HOTEL_NOTIFICATION_EMAIL`, `NEXT_PUBLIC_SITE_URL=https://casaboutiquesandiego.com`
4. Opcional: `RESEND_AUDIENCE_ID` para newsletter

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

**Próximo paso al retomar:** El sitio está completo. Pendiente: deploy en Vercel + reemplazar imágenes Unsplash con fotos reales del hotel.

Antes de empezar cualquier sesión:
1. Leer este CLAUDE.md completo
2. Revisar el estado de la sección "Estado actual del proyecto"
3. Verificar la nota técnica de shadcn v4 / Base UI
4. Preguntar al usuario si quiere ajustes antes de construir
