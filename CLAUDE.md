# Goral — Web institucional

Sitio one-page de Goral, productor y exportador de granadas premium Acco y Wonderful desde San Juan, Argentina. B2B internacional, certificación GLOBALG.A.P.

- Producción: https://goral.com.ar
- Preview deploy: Vercel (web-goral.vercel.app)
- Cliente: Goral · Implementación: Peripeteia Digital

## Stack

- **Nuxt 4** (`compatibilityDate: 2024-04-03`) con app dir (`app/`)
- **Vue 3** (Composition + Options API conviven — ver Pendientes para el inventario)
- **`@nuxtjs/seo`** (incluye `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`, `nuxt-og-image`)
- **`@nuxtjs/i18n`** v9 — locales: `es` (default, sin prefix), `en`, `pt`, `fr`, `ru`, `nl`. Estrategia `prefix_except_default`. Hreflang via `useLocaleHead`.
- **PrimeVue 4** (solo Drawer, Menu, Accordion*, Toast — el resto eliminado del bundle)
- **`@nuxt/image`** + **`@nuxt/fonts`** + **`@nuxt/icon`** (iconsets `mingcute` y `circle-flags` en server bundle)
- **three.js** (visor 3D de granada, lazy load por IntersectionObserver)
- **Canvas 2D custom** para partículas de arilos (CanvasArilos)
- **CSS plano** (PrimeFlex eliminado — ver Decisiones)
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
- Siempre actualizar **los 6 locales** al agregar nueva clave (ES → EN → PT → FR → RU → NL).

#### Agregar un idioma nuevo — toca 6 lugares

Ninguno da error si falta: el sitio compila igual y la falla aparece como bandera equivocada, `og:locale` en español o el idioma ausente del hreflang. Checklist completa:

1. `app/i18n.config.ts` → `availableLocales` **y** el bloque `messages.<code>` entero.
2. `nuxt.config.ts` → `i18n.locales` con el ISO completo (`nl-NL`, no `nl`).
3. `app/components/default/Header.vue` → array `languages` (`icon` = código de `circle-flags`, que es **país, no idioma**: `nl` Países Bajos, `ar` Argentina para `es`, `us` para `en`, `br` para `pt`).
4. `app/pages/index.vue` → `ogLocaleMap` (sin esto, `og:locale` cae al default `es_AR`).
5. `app/layouts/default.vue` → `inLanguage` del `defineWebSite`.
6. Verificar en build: hreflang, canonical y `/__sitemap__/<iso>.xml` se generan solos si 1 y 2 están bien.
- El selector de idioma usa `useSwitchLocalePath()` + `<NuxtLink>` para que cada locale sea una URL crawleable. **No usar `$i18n.setLocale()` por JS** (rompe SEO).
- Códigos ISO completos en `nuxt.config.ts > i18n.locales` (`es-AR`, `en-US`, `pt-BR`, `fr-FR`, `ru-RU`).

### SEO
- `useSeoMeta` solo en `pages/index.vue` (única página por ahora).
- `useSchemaOrg` en `layouts/default.vue` (Organization + WebSite, válido global) y en `pages/index.vue` (LocalBusiness/Farm + Product Acco/Wonderful).
- `og:image` apunta a `/images/home/Goral-Granadas-Desktop.webp` — al subir nuevo hero, actualizar también `og:image` y `twitter:image`.
- **Nunca agregar `meta keywords`** — Google la ignora desde 2009.
- Robots auto-generado por `@nuxtjs/robots`. Modificar via `robots:` en `nuxt.config.ts`, **no** crear `public/robots.txt`.
- Sitemap: al haber multi-locale, `@nuxtjs/sitemap` genera un **índice** en `/sitemap_index.xml` que apunta a un `/__sitemap__/<iso>.xml` por idioma. `/sitemap.xml` es un **redirect 307** al índice, no un sitemap: en `robots.sitemap` va `sitemap_index.xml` directo (apuntar al redirect hace que Search Console lo reporte con error).

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
- Bloque `/* Utilities */` en `main.css`: `.w-full`, `.h-full`, `.text-center`, `.font-medium`, `.font-bold`, `.no-underline`. Son las 6 clases que quedaban de PrimeFlex, replicadas con los mismos valores y `!important`. Los templates las usan con esos nombres — si hace falta otra utility de ese estilo, se agrega acá a mano, no se reinstala PrimeFlex.
- `:focus-visible` global definido — no sobrescribir sin reemplazar.
- `@media (prefers-reduced-motion: reduce)` global — respetarlo en componentes nuevos.

### Headers de seguridad
- Definidos en `nuxt.config.ts > routeRules`: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Si se agrega CSP, hay que listar fuentes de three.js, Vimeo (si vuelve), `img.youtube.com`, `i.vimeocdn.com` ya declarados en `image.domains`.

## Comandos

Gestor: **pnpm** (migrado 2026-08-05).

```bash
pnpm install      # Instalar dependencias
pnpm dev          # http://localhost:3000
pnpm build        # Build producción
pnpm generate     # SSG (no se usa en producción actual, deploy SSR en Vercel)
pnpm preview      # Preview build local
```

### pnpm — dos cosas específicas de este repo

- **`pnpm-workspace.yaml` con `packages: [.]` es obligatorio.** Hay un `pnpm-workspace.yaml` en `~/` (el home de Lio) que hace que pnpm trate a `/Users/lio/` como raíz de workspace: sin el archivo local, `pnpm install` responde *"Already up to date"* y **no instala nada**. Ahí también van los `allowBuilds` de `esbuild` y `sharp`, que pnpm bloquea por defecto (sin ellos `sharp` no compila y `@nuxt/image` pierde la optimización de imágenes).
- **`primevue` tiene que estar declarado en `package.json`.** El código importa `primevue/*` directo (plugin y `optimizeDeps`), pero hasta 2026-08-05 solo llegaba como transitiva de `@primevue/nuxt-module`: con npm funcionaba por el hoisting, con pnpm deja de resolver y Vite tira `Unresolvable optimizeDeps.include entries`. Misma regla para cualquier paquete que se importe por nombre.
- **`nuxt` está pineado en `4.4.4`, sin `^`.** No es capricho: `4.5.x` sube `@unhead/vue` a la v3, que elimina `createHeadCore`, y el `nuxt-og-image@5.1.13` que trae `@nuxtjs/seo@3.4.0` todavía lo importa → el build rompe con `RollupError`. Con npm no se notaba porque el `package-lock.json` congelaba el árbol. Salir de este pin exige subir `@nuxtjs/seo` a v5, que a su vez exige `@nuxtjs/i18n >=10` (hoy v9): es un salto de tres majors encadenados, hacerlo aparte y re-verificar todo el SEO multi-locale.

## Decisiones de arquitectura tomadas

- **Single-page**: hoy todo es `/`. La auditoría SEO marca crear páginas dedicadas (`/granadas-acco`, `/granadas-wonderful`, `/certificacion-globalgap`, `/exportacion-granadas-argentina`, `/sobre-nosotros`) como la mayor oportunidad orgánica. Pendiente cotización con cliente antes de construir.
- **Strategy `prefix_except_default`**: español vive en `/`, los demás en `/en`, `/pt`, `/fr`, `/ru`, `/nl`.
- **Neerlandés (`nl`) agregado 2026-08-05** a pedido del cliente: Países Bajos es el hub de reexportación de fruta fresca de Europa (Rotterdam), así que el idioma apunta a importadores, no a consumidor final. Traducción con registro formal (*u*, no *je*), coherente con el tono B2B del resto.
- **`@nuxtjs/seo` en lugar de configurar cada submódulo**: simplifica versionado.
- **Honeypot + rate limit in-memory** en lugar de Cloudflare Turnstile/reCAPTCHA: suficiente para volumen actual sin fricción para usuarios reales.
- **3D model GLB sin DRACO** todavía: pendiente recomprimir.
- **`Header.vue` migrado a `<script setup>`** (2026-08-05). `selectedLanguage` pasó de `data` + `watch` sobre `$route` a un `computed` derivado de `locale`: además de sacar estado sincronizado a mano, arregla un bug de SSR donde la bandera se renderizaba siempre argentina y recién se corregía en `mounted` (flash visible al entrar por `/nl`, `/ru`, etc.). El `ref` del `<Menu>` se llama `languagesMenuRef` porque `languagesMenu` ya es el computed del modelo.
- **PrimeFlex eliminado** (auditoría 2026-08-05). Aportaba 344KB de CSS render-blocking en `entry.css` y el código no usaba ni una de sus clases de grid/spacing — solo 6 utilities triviales, ahora en `main.css`. CSS total del build: **400KB → 72KB (−82%)**, `entry.css` 344KB → 16KB. Verificado en build: sin residuos de PrimeFlex y las 6 clases con valores idénticos.

## Pendientes conocidos (post-cliente)

- Páginas SEO específicas por variedad/keyword.
- Schema.org `FAQPage` con preguntas reales de importadores (MOQ, packaging, Incoterms).
- Comprimir `Granada-Goral.glb` con DRACO/meshopt.
- Comprimir `ubicacion-estrategica.mp4` o servir como HLS.
- Migrar SMTP a Resend/Postmark con dominio `goral.com.ar`.
- Generar OG image dinámica con `nuxt-og-image` (hoy se usa el hero estático).
- Migrar a `<script setup>` los 6 componentes que siguen en Options API: `Variations`, `Services`, `Calendar`, `About`, `ServiceAccordion/index`, `Contacto`. `Header` ya está migrado (2026-08-05) y sirve de referencia. Ojo con `Contacto`: tiene focus trap manual y validaciones, migrarlo solo con verificación de a11y.
- El GLB de 6.9MB es hoy el asset más pesado del repo, por encima del video de 3.9MB. Si se prioriza una sola optimización de peso, es esa.
- Posters para los `<video>` (frame WebP de cada uno).
- Evaluar quitar PrimeFlex (ya casi no se usa).

## Notas

- `app/.DS_Store` y similares: NO commitear. Ya están en `.gitignore`.
- El bloque `vite.optimizeDeps.include` en `nuxt.config.ts` lista solo lo que realmente se importa — al agregar componentes PrimeVue nuevos, sumarlos también ahí para evitar warnings de dev.
- El warning `interpolate-size: allow-keywords` que tira el linter en `ServiceAccordion` es CSS válido moderno (anim. de altura `auto`). Ignorar.
- El warning de `@nuxt/robots` sobre `Disallow: /api/**` es un falso positivo acá: el único endpoint es `sendEmail` (POST, sin contenido indexable), no hay assets servidos bajo `/api/` y el `og:image` es una imagen estática de `/images/`. El `disallow` se queda.
