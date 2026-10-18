# SPEC 01 — Estilos globales basados en la Home

> **Estado:** Implementado
> **Depende de:** ninguna
> **Fecha:** 2026-10-17
> **Objetivo:** Reemplazar los estilos por defecto de Next.js por los tokens, tipografías, base y clases de animación globales extraídos del mockup `references/Home-html/Main.dc.html`.

## Por qué existe esta spec

El mockup de la Home y el del detalle de proyecto comparten la misma identidad visual (colores, tipografía, bordes, movimiento). Definirla una sola vez en `app/globals.css` evita repetir los valores en cada componente y deja una base única sobre la que se construyen las páginas en specs posteriores. El mockup es referencia, no código: se replican sus valores, no su estructura (`<x-dc>`, estilos en línea, `{{accent}}`).

## Alcance

**Dentro:**

- Sustituir las fuentes Geist por Manrope e IBM Plex Mono en `app/layout.tsx` usando `next/font/google`, expuestas como variables CSS.
- Cambiar `lang="en"` por `lang="es"` en `<html>` de `app/layout.tsx`.
- Reescribir `app/globals.css`: tokens en `@theme`, estilos base de `body` y enlaces, y clases globales de animación/hover.
- Eliminar el modo oscuro automático (`prefers-color-scheme`) y las variables `--background`/`--foreground` de la plantilla.
- Respetar `prefers-reduced-motion` en todas las animaciones y transiciones.

**Fuera de alcance (para specs futuras):**

- Maquetar el contenido de la Home (header, hero, proyectos, sobre mí, footer) en `app/page.tsx`.
- Página de detalle de proyecto (`references/Detalle de proyecto-html/Proyecto.dc.html`); es la siguiente spec.
- Componentes reutilizables en `app/components/`.
- Metadatos (`title`, `description`) y favicon.
- Selector de color de acento, interruptor de animaciones y modo oscuro.

## Modelo de datos

Esta funcionalidad no introduce estructuras de datos. Define tokens de diseño, tomados del mockup, que viven en `@theme` de `app/globals.css`:

```css
@theme inline {
  /* Color */
  --color-page: #FBFBF9;          /* fondo de página */
  --color-surface: #FFFFFF;       /* tarjetas */
  --color-surface-sunken: #F1F0EC;/* marco de capturas */
  --color-ink: #121214;           /* texto principal, fondo del footer */
  --color-ink-soft: #35353D;      /* texto de cuerpo (Sobre mí, chips) */
  --color-muted: #4A4A52;         /* nav, párrafos secundarios */
  --color-subtle: #5C5C66;        /* etiquetas mono */
  --color-faint: #6B6B74;         /* metadatos */
  --color-line: #E6E5E0;          /* bordes y separadores */
  --color-line-strong: #D6D5CE;   /* borde de tarjeta en hover */
  --color-accent: #2B5CE6;        /* CTA, enlaces de acción, caret */
  --color-link: #1E42A8;          /* a */
  --color-link-hover: #142C72;    /* a:hover */

  /* Tipografía */
  --font-sans: var(--font-manrope);
  --font-mono: var(--font-plex-mono);

  /* Radios */
  --radius-card: 18px;
  --radius-shot: 12px;
}
```

Clases globales previstas (nombres tomados del mockup): `.rise`, `.d1`–`.d8`, `.mask-line`, `.caret`, `.navlink`, `.cta`, `.card`, `.shot-inner`, `.arrow`, `.case`, `.chip`, `.social`. Keyframes: `dcRise`, `dcMask`, `dcBlink`.

Convención: los valores salen de los estilos en línea y del bloque `<style>` de `Main.dc.html`; si un valor no aparece en el mockup, no se inventa.

## Plan de implementación

1. En `app/layout.tsx`, reemplazar `Geist`/`Geist_Mono` por `Manrope` (pesos 400, 500, 600, 800) e `IBM_Plex_Mono` (400, 500) con variables `--font-manrope` y `--font-plex-mono`, y poner `lang="es"`. Verificación: `npm run dev` arranca y el texto se ve en Manrope.
2. En `app/globals.css`, reemplazar la plantilla por `@import "tailwindcss"` + bloque `@theme inline` con los tokens del modelo de datos y eliminar `prefers-color-scheme`. Verificación: sin errores de compilación.
3. Añadir los estilos base: `body` (fondo `page`, color `ink`, `font-sans`), `a` / `a:hover` con `link` y `link-hover`. Verificación: la página en blanco muestra el fondo `#FBFBF9`.
4. Añadir los keyframes `dcRise`, `dcMask`, `dcBlink` y las clases de entrada `.rise`, `.d1`–`.d8`, `.mask-line`, `.caret`.
5. Añadir las clases de interacción `.navlink`, `.cta`, `.card`, `.shot-inner`, `.arrow`, `.case`, `.chip`, `.social` con las mismas curvas y duraciones del mockup.
6. Añadir el bloque `@media (prefers-reduced-motion: reduce)` que anula animaciones y transiciones de todas las clases anteriores.

## Criterios de aceptación

- [ ] `npm run build` termina sin errores.
- [ ] `npm run lint` termina sin errores.
- [ ] `app/layout.tsx` ya no importa `Geist` ni `Geist_Mono`.
- [ ] `<html>` tiene `lang="es"` y las clases de las variables `--font-manrope` y `--font-plex-mono`.
- [ ] `getComputedStyle(document.body).backgroundColor` es `rgb(251, 251, 249)` y `color` es `rgb(18, 18, 20)`.
- [ ] `getComputedStyle(document.body).fontFamily` empieza por la familia de Manrope.
- [ ] `app/globals.css` no contiene `prefers-color-scheme`.
- [ ] Un elemento con clase `text-accent` usa `#2B5CE6` y uno con `font-mono` usa IBM Plex Mono.
- [ ] Con el emulador de `prefers-reduced-motion: reduce` activado, un elemento con `.rise` no tiene animación y `.card:hover` no tiene transición.
- [ ] Un elemento de prueba con `.card` sube 5 px y cambia su borde a `#D6D5CE` al pasar el cursor (con movimiento permitido).
- [ ] Todos los valores de color, radio y duración de `globals.css` existen en `Main.dc.html`.

## Decisiones tomadas y descartadas

- **Sí:** esta spec cubre solo estilos globales; la Home y el detalle de proyecto van en specs separadas. Razón: mantiene cada spec dentro de un solo área y revisable.
- **Sí:** fuentes con `next/font/google`. Razón: se autoalojan en el build, sin petición externa en runtime ni salto de layout.
- **No:** `<link>` a Google Fonts como en el mockup. Razón: más lento y sin optimización de Next.
- **Sí:** eliminar el modo oscuro. Razón: el diseño es solo claro; el footer oscuro (`#121214`) es parte del diseño, no un tema.
- **No:** inventar una paleta oscura. Razón: no existe en el diseño.
- **Sí:** tokens en `@theme` de Tailwind (utilidades como `bg-page`, `text-muted`, `font-mono`) y clases de animación en `globals.css`. Razón: los colores se reutilizan desde Tailwind y las animaciones con keyframes y `:hover` anidados no se expresan bien como utilidades.
- **No:** solo variables CSS sin utilidades de Tailwind. Razón: obliga a usar `style` o valores arbitrarios en cada componente.
- **Sí:** quitar el ámbito `.anim` del mockup; las animaciones siempre están disponibles y se desactivan solo con `prefers-reduced-motion`. Razón: `.anim` era un interruptor del editor de diseño, no una necesidad del producto.
- **No:** replicar la propiedad `accent` editable del mockup. Razón: es un control del editor; el acento queda fijo en `#2B5CE6`. Si se quiere cambiar, se edita un solo token.
- **Sí:** cambiar `lang` a `es`. Razón: el contenido del mockup está en español.

## Riesgos identificados

| Riesgo | Mitigación |
| ------ | ---------- |
| Las clases globales (`.card`, `.chip`, `.case`) colisionan con nombres de Tailwind o de futuras librerías. | Los nombres se comprueban contra Tailwind 4 antes de implementar; si colisionan, se prefija con `ui-`. |
| Tailwind 4 con `@theme inline` y `next/font` resuelve mal `var(--font-manrope)`. | Seguir el patrón que ya usa la plantilla (`--font-sans: var(--font-geist-sans)`) y verificar el criterio de `fontFamily` del `body`. |
| Esta versión de Next.js tiene cambios incompatibles con lo habitual. | Antes de tocar `layout.tsx`, leer la guía de fuentes en `node_modules/next/dist/docs/` como indica `CLAUDE.md`. |
| Los estilos no se pueden comprobar sin contenido en `page.tsx`. | Verificar con un elemento de prueba temporal o en las DevTools; no se deja en el commit. |

## Qué **no** está en esta spec

- Maquetación de la Home en `app/page.tsx`.
- Página de detalle de proyecto (siguiente spec).
- Componentes reutilizables.
- Metadatos y favicon.
- Modo oscuro, selector de acento e interruptor de animaciones.
