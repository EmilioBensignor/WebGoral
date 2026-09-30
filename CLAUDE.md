# Goral — Web institucional

Sitio one-page de Goral, productor y exportador de granadas premium Acco y Wonderful desde San Juan, Argentina. B2B internacional, certificación GLOBALG.A.P.

- Producción: https://www.goral.com.ar (canónico con www; `goral.com.ar` redirige 301)
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
- **Google Analytics 4** via `nuxt-gtag` (`G-BLWLJ63E4C` en `nuxt.config.ts > gtag.id`), sin banner de cookies (ver Pendientes)
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
  images/                  # Logos, hero (mobile/tablet/desktop en webp+png), arilos (webp), home/*.webp
  videos/home/*.mp4        # 4 cortos para Services + 1 pesado para About (ubicacion-estrategica)
  models/Granada-Goral.glb # 464KB (meshopt + texturas webp) — requiere MeshoptDecoder en el loader
  google015a9e4c1f353ac6.html # verificación de Search Console — NO borrar
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
- **El `|` en un mensaje es el separador de plurales de vue-i18n**: `'A | B'` devuelve solo `'A'`, sin error. Para un pipe literal: `{'|'}`. Así se rompía `og:title` (salía "Goral") hasta 2026-09-30.

### SEO
- `useSeoMeta` solo en `pages/index.vue` (única página por ahora). `og:title`/`twitter:title` se arman como `` `${t('seo.title')} | Goral` `` para coincidir con el `<title>` que genera el titleTemplate.
- Dominio canónico **con www**: `site.url`, `i18n.baseUrl`, `robots.sitemap` y toda URL absoluta (og, JSON-LD) van con `https://www.goral.com.ar`.
- JSON-LD: cada `defineProduct` necesita `'@id'` absoluto propio (`https://www.goral.com.ar/#product-acco`); sin eso comparten `#product` y el segundo pisa al primero. `contactPoint` va solo en la Organization del layout (si se repite en la LocalBusiness, `nuxt-schema-org` los fusiona y duplica `availableLanguage`).
- `useSchemaOrg` en `layouts/default.vue` (Organization + WebSite, válido global) y en `pages/index.vue` (LocalBusiness/Farm + Product Acco/Wonderful).
- `og:image` apunta a `/images/home/Goral-Granadas-Desktop.webp` — al subir nuevo hero, actualizar también `og:image` y `twitter:image`.
- **Nunca agregar `meta keywords`** — Google la ignora desde 2009.
- Robots auto-generado por `@nuxtjs/robots`. Modificar via `robots:` en `nuxt.config.ts`, **no** crear `public/robots.txt`.
- Sitemap: al haber multi-locale, `@nuxtjs/sitemap` genera un **índice** en `/sitemap_index.xml` que apunta a un `/__sitemap__/<iso>.xml` por idioma. `/sitemap.xml` es un **redirect 307** al índice. En `robots.sitemap` va `sitemap_index.xml`; en Search Console, en cambio, el que quedó leído es `/sitemap.xml` (2026-09-30), así que el redirect no molesta.

### Performance — reglas no negociables
- **Hero**: `<picture>` con un `<source>` por breakpoint (mobile/tablet/desktop webp) + `<img fetchpriority="high" loading="eager">` absoluto con `object-fit: cover`. Nunca `background-image` CSS (era el LCP y se descubría tarde). Desde 1080px el hero no lleva imagen: un `<source>` con gif vacío evita la descarga.
- **Imágenes**: siempre `<NuxtImg>` con `width`/`height` (evita CLS) y `format="webp"`.
- **Videos**: `preload="none"` en Services y ServiceAccordion, sin `autoplay`: se descarga solo el que se activa (`play()` en watch/mounted). Nunca `preload="auto"`. El de `ubicacion-estrategica.mp4` (3.9MB) sigue siendo pesado — evaluar comprimir o servir HLS.
- **three.js (Granada)**: se inicializa después de `load` + `requestIdleCallback`, y recién ahí `await import('three')` dentro de `IntersectionObserver`. No mover a import estático. El GLB está comprimido con meshopt: el loader necesita `setMeshoptDecoder` (y `meshopt_decoder.module.js` en `optimizeDeps`). Para recomprimir: `npx @gltf-transform/cli webp` + `meshopt`, **nunca** `optimize` (simplifica la malla).
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
- **GLB comprimido** (2026-09-30): 7,27MB → 464KB con texturas webp (q90, misma resolución 1024) + meshopt. Lighthouse mobile pasó de 65 a 86–93, TBT 8.630ms → 10ms, peso 9,3MB → 1,2MB.
- **Una sola instancia de `DefaultContacto`**, en `pages/index.vue`. Hero, Calendar y Services emiten `open-dialog`; Header dispara el evento `open-contact-modal` en `window`.
- **Fechas de cosecha** (confirmadas por Goral): Acco desde 25/2, Wonderful desde 15/3 (countdown en `Calendar.vue`). La tabla ancla cada barra en un mes (`harvestMonth`) y la estira 2 celdas hacia la izquierda: Acco FEB–MAR, Wonderful MAR–ABR.
- **DNS en Astra Network, no en Vercel**: NIC delega `goral.com.ar` a `ns1/ns2.astranetwork.net` (ahí viven MX `mail.goral.com.ar` y SPF). La tabla DNS de Vercel para este dominio **no se sirve**. Por eso Search Console se verificó como propiedad de prefijo de URL con el archivo `public/google015a9e4c1f353ac6.html`. Si algún día se delega a Vercel, copiar antes MX y SPF.
- **Analytics**: GA4 (`nuxt-gtag`) en vez de Vercel Web Analytics, por decisión de Lio. Eventos custom con `useTrackEvent`: `contact_modal_open`, `contact_form_submit`, `email_click`, `certificate_download`, `globalgap_verify_click`.
- **`Header.vue` migrado a `<script setup>`** (2026-08-05). `selectedLanguage` pasó de `data` + `watch` sobre `$route` a un `computed` derivado de `locale`: además de sacar estado sincronizado a mano, arregla un bug de SSR donde la bandera se renderizaba siempre argentina y recién se corregía en `mounted` (flash visible al entrar por `/nl`, `/ru`, etc.). El `ref` del `<Menu>` se llama `languagesMenuRef` porque `languagesMenu` ya es el computed del modelo.
- **PrimeFlex eliminado** (auditoría 2026-08-05). Aportaba 344KB de CSS render-blocking en `entry.css` y el código no usaba ni una de sus clases de grid/spacing — solo 6 utilities triviales, ahora en `main.css`. CSS total del build: **400KB → 72KB (−82%)**, `entry.css` 344KB → 16KB. Verificado en build: sin residuos de PrimeFlex y las 6 clases con valores idénticos.

## Pendientes conocidos (post-cliente)

- Páginas SEO específicas por variedad/keyword.
- Schema.org `FAQPage` con preguntas reales de importadores (MOQ, packaging, Incoterms).
- Comprimir `ubicacion-estrategica.mp4` o servir como HLS.
- Migrar SMTP a Resend/Postmark con dominio `goral.com.ar`.
- Generar OG image dinámica con `nuxt-og-image` (hoy se usa el hero estático).
- Migrar a `<script setup>` los 6 componentes que siguen en Options API: `Variations`, `Services`, `Calendar`, `About`, `ServiceAccordion/index`, `Contacto`. `Header` ya está migrado (2026-08-05) y sirve de referencia. Ojo con `Contacto`: tiene focus trap manual y validaciones, migrarlo solo con verificación de a11y.
- **Banner de cookies / Consent Mode v2**: GA4 corre sin consentimiento. El sitio apunta a importadores de la UE (NL, FR), así que por GDPR correspondería un banner mínimo; decisión de riesgo pendiente con Goral (es cambio de UI).
- Logo GLOBALG.A.P. (Hero y Footer): `width`/`height` 30×30 y 64×64 contra un viewBox real de 23×18 (Lighthouse `image-aspect-ratio`). Corregirlo achica ~10px la fila, así que va con el rediseño.
- LCP mobile 2,8–3,8s: lo que queda es load delay del hero (compite con CSS/JS inicial) + ~650ms de TTFB.
- Posters de video: descartados, el primer frame de los 4 videos de Services es un color liso.

## Notas

- `app/.DS_Store` y similares: NO commitear. Ya están en `.gitignore`.
- El bloque `vite.optimizeDeps.include` en `nuxt.config.ts` lista solo lo que realmente se importa — al agregar componentes PrimeVue nuevos, sumarlos también ahí para evitar warnings de dev.
- El warning `interpolate-size: allow-keywords` que tira el linter en `ServiceAccordion` es CSS válido moderno (anim. de altura `auto`). Ignorar.
- El warning de `@nuxt/robots` sobre `Disallow: /api/**` es un falso positivo acá: el único endpoint es `sendEmail` (POST, sin contenido indexable), no hay assets servidos bajo `/api/` y el `og:image` es una imagen estática de `/images/`. El `disallow` se queda.
