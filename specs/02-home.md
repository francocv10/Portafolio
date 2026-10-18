# SPEC 02 — Maquetación de la Home

> **Estado:** Implementado
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-17
> **Objetivo:** Construir en `app/home/page.tsx` la Home del portafolio (header, hero, proyectos, sobre mí y footer) replicando el mockup `references/Home-html/Main.dc.html`, con el contenido centralizado en `app/data/data.ts`.

## Por qué existe esta spec

La SPEC 01 dejó los tokens, las fuentes y las clases de animación globales, pero ninguna página los usa. Esta spec es el primer consumidor real de esa base. El mockup es referencia, no código: se replican sus valores (espaciados, tamaños, `clamp()`, radios), no su estructura (`<x-dc>`, estilos en línea, `{{accent}}`, `rootClass`).

## Alcance

**Dentro:**

- Crear `app/home/page.tsx` como Server Component que compone las cinco secciones. La Home se sirve en `/home`.
- Reemplazar `app/page.tsx` (plantilla de Next) por una redirección de `/` a `/home`.
- Crear los componentes de sección en `app/home/components/`: `Header.tsx`, `Hero.tsx`, `Projects.tsx`, `About.tsx`, `Footer.tsx`.
- Crear `app/data/data.ts` con todo el contenido textual y los enlaces de la Home, usando los marcadores del mockup (`[TU NOMBRE]`, `[Proyecto 1]`, `[tu@email.com]`, etc.).
- Traducir los estilos en línea del mockup a utilidades de Tailwind usando los tokens de la SPEC 01 (`bg-page`, `text-muted`, `bg-accent`, `font-mono`, `rounded-card`, etc.) y las clases globales (`.rise`, `.d1`–`.d8`, `.mask-line`, `.caret`, `.navlink`, `.cta`, `.card`, `.shot-inner`, `.arrow`, `.case`, `.chip`, `.social`).
- Layout responsivo equivalente al del mockup: `clamp()` de padding y tipografía, `flex-wrap` y bases `flex` de las tarjetas (440 px) y de la sección Sobre mí (460 px / 280 px).
- Anclas internas: `#inicio`, `#proyectos`, `#sobre-mi`, `#contacto`.

**Fuera de alcance (para specs futuras):**

- Página de detalle de proyecto (`references/Detalle de proyecto-html/Proyecto.dc.html`); es la siguiente spec. Mientras tanto, "Ver caso" apunta a `href="#"`.
- Descarga real del CV: "Descargar CV" conserva `#contacto` como en el mockup.
- Contenido real (nombre, email, textos, proyectos); se reemplaza después editando solo `app/data/data.ts`.
- Capturas de proyecto reales: se mantiene el marco gris con el texto `[CAPTURA DEL PROYECTO]`.
- Metadatos (`title`, `description`) y favicon.
- Mover `Header`/`Footer` a `app/components/` para compartirlos con el detalle de proyecto; se decide en la spec siguiente.
- Selector de acento, interruptor de animaciones y modo oscuro (ya excluidos en la SPEC 01).
- Cualquier lógica de cliente (`"use client"`), formularios o envío de correo.

## Modelo de datos

Los tipos y el contenido viven en `app/data/data.ts`. Todos los componentes reciben sus datos por props desde `page.tsx`, que importa de ese archivo.

```ts
export type Project = {
  title: string;        // "[Proyecto 1]"
  summary: string;      // "[Una línea sobre qué resuelve y para quién.]"
  meta: string;         // "[Stack] · [Año]"
  href: string;         // "#" hasta la spec del detalle
};

export type NavLink = { label: string; href: string };
export type SocialLink = { label: string; href: string };

export const site = {
  name: "[TU NOMBRE]",
  nav: [/* NavLink: Proyectos, Sobre mí, Contacto */],
  cv: { label: "Descargar CV", href: "#contacto" },
  hero: {
    eyebrow: "Desarrollo de software · Santiago, Chile",
    title: "Construyo productos web de principio a fin.",
    description: "[Dos líneas sobre qué tipo de problemas resuelves y para quién. ...]",
    stack: ["[Stack 1]", "[Stack 2]", "[Stack 3]", "[Stack 4]"],
  },
  projects: {
    title: "Proyectos seleccionados",
    items: [/* 4 × Project */],
  },
  about: {
    title: "Sobre mí",
    paragraphs: ["[Tres o cuatro líneas: ...]", "[Opcional: estudios, ...]"],
    toolsTitle: "Herramientas",
    tools: ["[Lenguajes]", "[Frameworks]", "[Bases de datos]", "[Infra y herramientas]"],
  },
  contact: {
    eyebrow: "Hablemos",
    title: "¿Tienes un proyecto en mente?",
    email: "[tu@email.com]",
    socials: [/* SocialLink: GitHub, LinkedIn */],
  },
};
```

Convenciones:

- El texto exacto sale del mockup; si un valor no aparece ahí, no se inventa.
- El contador "04 casos" se deriva de `projects.items.length` (con cero a la izquierda), no se escribe a mano.
- El delay de entrada de cada tarjeta (`d5`–`d8`) se calcula por índice.
- Los colores sin token (`#DEDDD7` borde de chip, `#EAE9E4` separador de lista, `#A3A3AC` etiqueta del footer, `#3A3A42` borde de red social) se escriben como valores arbitrarios de Tailwind, porque cada uno se usa en un solo sitio.

## Plan de implementación

Antes del paso 1, leer en `node_modules/next/dist/docs/` la guía de `redirect` y de la convención `page`/`layout` del App Router, como indica `CLAUDE.md`.

1. Crear `app/data/data.ts` con los tipos y el objeto `site` completo. Verificación: `npm run build` sin errores de tipos.
2. Crear `app/home/page.tsx` con un `<main>` mínimo que importa `site` y muestra el nombre, y cambiar `app/page.tsx` para que redirija a `/home`. Verificación: `npm run dev`, abrir `/` y terminar en `/home`.
3. Crear `app/home/components/Header.tsx` (logo, `nav` con `.navlink`, botón `.cta` "Descargar CV") y montarlo en `page.tsx`. Verificación: el header se ve con borde inferior y el subrayado aparece al pasar el cursor sobre un enlace.
4. Crear `app/home/components/Hero.tsx` (eyebrow con `.caret`, `h1` con `.mask-line`, descripción, chips) y montarlo. Verificación: entra con animación y los chips suben 2 px al hover.
5. Crear `app/home/components/Projects.tsx` (cabecera con contador y cuatro tarjetas `.card` con `.shot-inner`, `.case` y `.arrow`) y montarlo. Verificación: la tarjeta sube 5 px al hover y la flecha se desplaza.
6. Crear `app/home/components/About.tsx` (dos columnas: párrafos y lista de herramientas) y montarlo. Verificación: a menos de ~800 px las columnas se apilan.
7. Crear `app/home/components/Footer.tsx` (fondo `ink`, `mailto:`, enlaces `.social`) con `margin-top: auto` y montarlo. Verificación: con poco contenido el footer queda pegado al borde inferior de la ventana.
8. Revisar la página completa contra el mockup abierto en paralelo (servido con `python -m http.server`) en 1440 px, 768 px y 375 px, y ajustar diferencias de espaciado.

## Criterios de aceptación

- [x] `npm run build` termina sin errores.
- [x] `npm run lint` termina sin errores.
- [x] Abrir `/` redirige a `/home` y `/home` responde 200.
- [x] Existen `app/home/page.tsx`, `app/data/data.ts` y los cinco archivos de `app/home/components/`.
- [x] Ningún archivo de la Home contiene `"use client"` ni estilos en línea (`style=`), salvo que un valor no pueda expresarse con Tailwind.
- [x] Todo texto visible de la Home se importa de `app/data/data.ts`; ningún componente tiene texto escrito a mano.
- [x] Hay exactamente cuatro tarjetas de proyecto y el contador muestra `04 casos`.
- [x] Hay un solo `h1` y los títulos de sección son `h2`.
- [x] Los enlaces del header llevan a `#proyectos`, `#sobre-mi` y `#contacto`, y esos `id` existen en la página.
- [x] Todos los enlaces "Ver caso" tienen `href="#"`.
- [x] El enlace de correo del footer tiene `href` que empieza por `mailto:`.
- [x] A 375 px de ancho no hay scroll horizontal.
- [x] A 1440 px las tarjetas se muestran en dos columnas; a 375 px, en una.
- [x] `getComputedStyle` del botón "Descargar CV" da `background-color: rgb(43, 92, 230)` y `border-radius` de 999 px.
- [x] El `h1` tiene `max-width: 16ch` y `font-weight: 800`.
- [x] El footer tiene fondo `rgb(18, 18, 20)`.
- [x] Con `prefers-reduced-motion: reduce` emulado no hay animaciones ni transiciones en la Home.

## Decisiones tomadas y descartadas

- **Sí:** la Home vive en `app/home/page.tsx` (ruta `/home`), como pidió el usuario. Razón: decisión cerrada.
- **Sí:** `app/page.tsx` redirige a `/home`. Razón: quita la plantilla de Next y deja una única entrada al sitio.
- **No:** dejar la plantilla de Next en `/`. Razón: dos "homes" confunden y la plantilla ya no tiene uso.
- **Sí:** componentes por sección en `app/home/components/`. Razón: archivos pequeños y revisables; el detalle de proyecto decidirá si comparte `Header`/`Footer`.
- **No:** `app/components/` desde ya. Razón: todavía no hay un segundo consumidor; mover un archivo después es barato.
- **No:** un único `page.tsx` con todo. Razón: ~200 líneas de marcado difíciles de revisar.
- **Sí:** datos en `app/data/data.ts`, también decisión del usuario. Razón: reemplazar los marcadores por contenido real toca un solo archivo.
- **Sí:** conservar los marcadores del mockup como contenido. Razón: el contenido real aún no está definido.
- **Sí:** Server Components únicamente. Razón: no hay interactividad; los hover y las animaciones son CSS de la SPEC 01.
- **Sí:** "Ver caso" con `href="#"` provisional. Razón: el detalle de proyecto es otra spec; evita 404.
- **No:** definir ya `/proyectos/[slug]`. Razón: la estructura de rutas se decide con la spec del detalle.
- **Sí:** las clases `.rise`, `.card`, etc. se aplican directamente en el JSX. Razón: ya existen en `globals.css`; no se duplican como utilidades.
- **No:** tokens nuevos en `@theme` para los cuatro grises de un solo uso. Razón: modificaría la SPEC 01 sin necesidad.
- **No:** `next/image`. Razón: la Home no tiene imágenes aún; los marcos de captura son `div`.

## Riesgos identificados

| Riesgo | Mitigación |
| ------ | ---------- |
| Esta versión de Next.js tiene cambios incompatibles (`redirect`, convenciones de página). | Leer la guía correspondiente en `node_modules/next/dist/docs/` antes de escribir código. |
| Un `redirect()` desde `app/page.tsx` produce un salto de ruta visible o un bucle. | Usar redirección del servidor sin lógica adicional y comprobar con `curl -I` que `/` responde 307/308 a `/home`. |
| El layout flex del mockup (`flex: 1 1 440px`, `flex: 999 1 460px`) se traduce mal a utilidades de Tailwind. | Usar valores arbitrarios (`basis-[440px]`, `flex-[999_1_460px]`) y comparar a 1440, 768 y 375 px contra el mockup. |
| Las animaciones `.rise` hacen parpadear el contenido en la hidratación o el primer render. | Están en CSS puro con `backwards`; verificar a ojo en recarga completa. |
| Reemplazar textos por contenido real rompe el layout (nombres largos, más de 4 proyectos). | El contador y los delays se derivan por índice; los delays pasan de `d8` solo si se añaden más tarjetas. |

## Qué **no** está en esta spec

- Página de detalle de proyecto (siguiente spec).
- Contenido real, capturas reales y descarga real del CV.
- Metadatos y favicon.
- Componentes compartidos en `app/components/`.
- Modo oscuro, selector de acento e interruptor de animaciones.
- Interactividad de cliente, formularios o envío de correo.
