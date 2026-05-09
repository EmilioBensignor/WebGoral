# Goral — Web institucional

Sitio one-page de Goral, productor y exportador de granadas premium Acco y Wonderful desde San Juan, Argentina. B2B internacional, certificación GLOBALG.A.P.

- Producción: https://goral.com.ar
- Preview deploy: Vercel (web-goral.vercel.app)
- Cliente: Goral · Implementación: Peripeteia Digital

## Stack

- **Nuxt 4** (`compatibilityDate: 2024-04-03`) con app dir (`app/`)
- **Vue 3** (Composition + Options API conviven)
- **`@nuxtjs/seo`** (incluye `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`, `nuxt-og-image`)
- **`@nuxtjs/i18n`** v9 — locales: `es` (default, sin prefix), `en`, `pt`, `fr`, `ru`. Estrategia `prefix_except_default`. Hreflang via `useLocaleHead`.
- **PrimeVue 4** (solo Drawer, Menu, Accordion*, Toast — el resto eliminado del bundle)
- **`@nuxt/image`** + **`@nuxt/fonts`** + **`@nuxt/icon`** (iconsets `mingcute` y `circle-flags` en server bundle)
- **three.js** (visor 3D de granada, lazy load por IntersectionObserver)
- **Canvas 2D custom** para partículas de arilos (CanvasArilos)
- **CSS plano** + PrimeFlex (evaluar quitar — pesa y casi no se usa)
- **nodemailer** + Gmail SMTP (transitorio; pendiente migrar a Resend/Postmark con dominio propio)

## Estructura

```
app/
  app.vue                  # NuxtLayout > NuxtPage
  layouts/default.vue      # Header + slot + Footer · useLocaleHead + Schema.org base
  pages/index.vue          # ÚNICA página · useSeoMeta + Schema.org Product/Farm
  components/
    default/               # Header, Footer, Contacto (modal)
    home/                  # Hero, Variations, Calendar, About, Services, Granada (3D), CanvasArilos
      ServiceAccordion/    # Versión mobile del bloque Services
  i18n.config.ts           # Diccionarios de los 5 locales
  plugins/primevue.client.ts
  shared/menu.js · constants/ROUTES_NAMES.js
public/
  images/                  # Logos, hero (mobile/tablet/desktop en webp+png), arilos, home/*.webp
  videos/home/*.mp4        # 4 cortos para Services + 1 pesado para About (ubicacion-estrategica)
  models/Granada-Goral.glb # 6.9MB — pendiente comprimir con DRACO/meshopt
  certificados/globalgap-goral-2026.pdf
server/api/sendEmail.ts    # POST /api/sendEmail — honeypot + rate limit en memoria
```

## Convenciones específicas de este proyecto

### i18n
- Cualquier string visible al usuario va por `$t()` / `useI18n().t()`. Nada hardcoded en español.
- `aria-label` también traducidos (claves bajo `a11y.*`).
- Siempre actualizar **los 5 locales** al agregar nueva clave (ES → EN → PT → FR → RU).
- El selector de idioma usa `useSwitchLocalePath()` + `<NuxtLink>` para que cada locale sea una URL crawleable. **No usar `$i18n.setLocale()` por JS** (rompe SEO).
- Códigos ISO completos en `nuxt.config.ts > i18n.locales` (`es-AR`, `en-US`, `pt-BR`, `fr-FR`, `ru-RU`).

### SEO
- `useSeoMeta` solo en `pages/index.vue` (única página por ahora).
- `useSchemaOrg` en `layouts/default.vue` (Organization + WebSite, válido global) y en `pages/index.vue` (LocalBusiness/Farm + Product Acco/Wonderful).
- `og:image` apunta a `/images/home/Goral-Granadas-Desktop.webp` — al subir nuevo hero, actualizar también `og:image` y `twitter:image`.
- **Nunca agregar `meta keywords`** — Google la ignora desde 2009.
- Robots auto-generado por `@nuxtjs/robots`. Modificar via `robots:` en `nuxt.config.ts`, **no** crear `public/robots.txt`.
- Sitemap auto-generado en `/sitemap.xml`.

### Performance — reglas no negociables
- **Hero**: `<NuxtImg priority fetchpriority="high" loading="eager" preload>` — nunca `background-image` CSS.
- **Imágenes**: siempre `<NuxtImg>` con `width`/`height` (evita CLS) y `format="webp"`.
- **Videos**: `preload="metadata"` (nunca `preload="auto"`). El de `ubicacion-estrategica.mp4` (3.9MB) sigue siendo pesado — evaluar comprimir o servir HLS.
- **three.js (Granada)**: cargado dinámicamente con `await import('three')` dentro de `IntersectionObserver`. No mover a import estático.
- **CanvasArilos**: las imágenes de arilo se cargan **una sola vez** en `sharedImages[]`, no por partícula. Animación pausa cuando no es visible.
- Respetar `prefers-reduced-motion` en cualquier animación nueva.
- PrimeVue: solo importar componentes realmente usados en `app/plugins/primevue.client.ts` y declararlos en `vite.optimizeDeps.include`.

### Accesibilidad
- Modal de contacto (`Contacto.vue`): mantiene `role="dialog"`, `aria-modal="true"`, focus trap manual y restauración de foco al cerrar. Cuidado al modificar.
- Tabs (Variations, About, ServiceAccordion): `role="tablist"` + `aria-selected` o `aria-pressed`.
- Tabla del calendario: `<caption class="srOnly">` y `<th scope="row">` por variedad.
- Canvas decorativos: `aria-hidden="true"`.
- Utility `.srOnly` definida en `app/assets/main.css`.

### Formulario de contacto
- Endpoint: `POST /api/sendEmail` → envía a `info@goral.com.ar` (NO `goral.com`, ese es de un tercero canadiense).
- Honeypot: campo `website` oculto. Si llega con valor, devuelve 200 sin enviar.
- Rate limit: 5 requests/minuto/IP (in-memory, suficiente para Vercel sin escalar a varias instancias).
- SMTP via `peripeteiadigital@gmail.com` con `SMTP_PASSWORD` en `.env`. Migrar a Resend/Postmark con dominio propio cuando se priorice.

### Estilos
- Variables CSS en `:root` dentro de `app/assets/main.css`. Paleta:
  - `--primary-color: #E2083A` (rojo granada)
  - `--secondary-color: #9B213A`
  - `--terciary-color: #791328`
  - `--dark-color: #480311`
  - `--white-color: #FDF9F9`
- Fuentes: **Marcellus** (display, headings) + **Urbanist** (body, párrafos, inputs). Cargadas via `@nuxt/fonts`.
- Breakpoints custom (no usar `sm`/`md`/`lg` típicos): `700px`, `1080px`, `1440px`. Container max `1440px`.
- Utilities flex propias: `.center`, `.rowCenter`, `.rowSpaceBetween`, `.column`, `.columnAlignCenter`, `.allCenter`, `.wrapCenter`. NO usar Tailwind aquí (proyecto plain CSS).
- `:focus-visible` global definido — no sobrescribir sin reemplazar.
- `@media (prefers-reduced-motion: reduce)` global — respetarlo en componentes nuevos.

### Headers de seguridad
- Definidos en `nuxt.config.ts > routeRules`: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Si se agrega CSP, hay que listar fuentes de three.js, Vimeo (si vuelve), `img.youtube.com`, `i.vimeocdn.com` ya declarados en `image.domains`.

## Comandos

```bash
npm run dev       # http://localhost:3000
npm run build     # Build producción
npm run generate  # SSG (no se usa en producción actual, deploy SSR en Vercel)
npm run preview   # Preview build local
```

## Decisiones de arquitectura tomadas

- **Single-page**: hoy todo es `/`. La auditoría SEO marca crear páginas dedicadas (`/granadas-acco`, `/granadas-wonderful`, `/certificacion-globalgap`, `/exportacion-granadas-argentina`, `/sobre-nosotros`) como la mayor oportunidad orgánica. Pendiente cotización con cliente antes de construir.
- **Strategy `prefix_except_default`**: español vive en `/`, los demás en `/en`, `/pt`, `/fr`, `/ru`.
- **`@nuxtjs/seo` en lugar de configurar cada submódulo**: simplifica versionado.
- **Honeypot + rate limit in-memory** en lugar de Cloudflare Turnstile/reCAPTCHA: suficiente para volumen actual sin fricción para usuarios reales.
- **3D model GLB sin DRACO** todavía: pendiente recomprimir.

## Pendientes conocidos (post-cliente)

- Páginas SEO específicas por variedad/keyword.
- Schema.org `FAQPage` con preguntas reales de importadores (MOQ, packaging, Incoterms).
- Comprimir `Granada-Goral.glb` con DRACO/meshopt.
- Comprimir `ubicacion-estrategica.mp4` o servir como HLS.
- Migrar SMTP a Resend/Postmark con dominio `goral.com.ar`.
- Generar OG image dinámica con `nuxt-og-image` (hoy se usa el hero estático).
- Posters para los `<video>` (frame WebP de cada uno).
- Evaluar quitar PrimeFlex (ya casi no se usa).

## Notas

- `app/.DS_Store` y similares: NO commitear. Ya están en `.gitignore`.
- El bloque `vite.optimizeDeps.include` en `nuxt.config.ts` lista solo lo que realmente se importa — al agregar componentes PrimeVue nuevos, sumarlos también ahí para evitar warnings de dev.
- El warning `interpolate-size: allow-keywords` que tira el linter en `ServiceAccordion` es CSS válido moderno (anim. de altura `auto`). Ignorar.
