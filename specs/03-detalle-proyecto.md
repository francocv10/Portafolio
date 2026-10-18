# SPEC 03 — Maquetación del detalle de proyecto

> **Estado:** Implementado
> **Depende de:** SPEC 01, SPEC 02
> **Fecha:** 2026-10-17
> **Objetivo:** Construir la página de detalle de proyecto en `/proyectos/[slug]` replicando el mockup `references/Detalle-de-proyecto-html/Proyecto.dc.html`, con el contenido de cada proyecto en `app/data/data.ts` y conectando los enlaces "Ver caso" de la Home.

## Por qué existe esta spec

La SPEC 02 dejó la Home con cuatro tarjetas cuyo enlace "Ver caso" apunta a `#`. Esta spec construye el destino de esos enlaces. Reutiliza los tokens y las clases globales de la SPEC 01 y el patrón de la SPEC 02 (Server Components por sección, datos en `app/data/data.ts`). El mockup es referencia, no código: se replican sus valores (espaciados, `clamp()`, radios, tamaños), no su estructura (`<x-dc>`, estilos en línea, `{{accent}}`, `Main.dc.html` como destino de enlaces).

## Alcance

**Dentro:**

- Crear `app/proyectos/[slug]/page.tsx` como Server Component que compone las secciones del detalle. Una página por proyecto, con `generateStaticParams` a partir de los slugs de `data.ts`; un slug desconocido responde 404 (`notFound()`).
- Crear los componentes de sección en `app/proyectos/components/`: `ProjectHeader.tsx`, `ProjectHero.tsx`, `ProjectFacts.tsx` (franja Rol / Periodo / Stack / Enlaces), `ProjectMainShot.tsx`, `ProjectBody.tsx` (secciones de texto + aside "En resumen"), `ProjectGallery.tsx` (dos marcos de detalle), `ProjectFooter.tsx` ("Siguiente proyecto").
- Ampliar `app/data/data.ts`: `Project` gana `slug` y `detail`; `site` gana el objeto `projectPage` con las etiquetas fijas del detalle. Los cuatro proyectos usan los marcadores del mockup.
- Cambiar el `href` de cada `Project` de `"#"` a `/proyectos/<slug>`, de modo que "Ver caso" de la Home lleve al detalle sin tocar `Projects.tsx`.
- Traducir los estilos en línea del mockup a utilidades de Tailwind con los tokens de la SPEC 01. Los valores sin token se escriben como valores arbitrarios: radio `20px` (captura principal) y `16px` (capturas de detalle), `#EAE9E4` (separador del aside), `#3A3A42` (borde del botón del footer).
- Layout responsivo equivalente al del mockup: `clamp()` de padding, `flex-wrap` y bases `flex` (180 px en la franja, `999 1 520px` y `1 1 260px` en cuerpo/aside, 380 px en la galería).
- Enlaces: "← Volver al portafolio" → `/home`; "Contacto" → `/home#contacto`; "Ver todos los casos →" → `/home#proyectos`. Los enlaces internos usan `next/link`.

**Fuera de alcance (para specs futuras):**

- Contenido real de los proyectos, capturas reales y enlaces reales de repositorio/demo; se reemplazan después editando solo `app/data/data.ts`.
- Enlace al proyecto siguiente real: el cierre muestra el título "Siguiente proyecto" y el botón a todos los casos, como el mockup.
- `next/image`: los marcos de captura son `div` con texto marcador, como en la Home.
- Metadatos por proyecto (`generateMetadata`, `title`, `description`) y favicon.
- Mover `Header`/`Footer` de la Home a `app/components/`: el detalle tiene los suyos y no se toca la Home.
- Animaciones de entrada (`.rise`): el mockup del detalle no las define; no se añaden.
- Selector de acento, modo oscuro e interactividad de cliente (`"use client"`).

## Modelo de datos

Los tipos y el contenido viven en `app/data/data.ts`. `page.tsx` busca el proyecto por `slug` y pasa los datos a cada componente por props.

```ts
export type ProjectSection = {
  title: string;          // "El problema"
  body: string;           // "[Qué situación existía antes del proyecto ...]"
  bullets?: string[];     // solo "Cómo lo resolví": 3 × "[Decisión o módulo clave N]"
};

export type ProjectFact = { label: string; value: string };

export type ProjectDetail = {
  lead: string;           // "[Una o dos líneas que resumen el proyecto ...]"
  role: string;           // "[Tu rol]"
  period: string;         // "[Mes/Año – Mes/Año]"
  stack: string;          // "[Tecnologías]"
  links: SocialLink[];    // Repositorio, Demo en vivo
  mainShotLabel: string;  // "[CAPTURA PRINCIPAL — 1600 × 1000 px]"
  sections: ProjectSection[];   // problema, solución, resultado, aprendizaje
  summary: ProjectFact[];       // aside: Equipo, Tipo, Estado
  gallery: string[];            // "[DETALLE 1]", "[DETALLE 2]"
};

export type Project = {
  slug: string;           // "proyecto-1"
  title: string;
  summary: string;
  meta: string;
  href: string;           // `/proyectos/${slug}`
  detail: ProjectDetail;
};

// site.projectPage — etiquetas fijas de la página
projectPage: {
  back: { label: "← Volver al portafolio", href: "/home" },
  contact: { label: "Contacto", href: "/home#contacto" },
  eyebrow: "Caso de estudio",
  facts: { role: "Rol", period: "Periodo", stack: "Stack", links: "Enlaces" },
  summaryTitle: "En resumen",
  next: {
    title: "Siguiente proyecto",
    cta: { label: "Ver todos los casos →", href: "/home#proyectos" },
  },
}
```

Convenciones:

- El texto exacto sale del mockup; si un valor no aparece ahí, no se inventa.
- Los slugs son `proyecto-1` … `proyecto-4`. Se cambian junto con el contenido real, editando solo `data.ts`.
- El `href` se deriva del `slug` en la función que construye cada proyecto, no se escribe a mano.
- Los títulos de sección (`El problema`, `Cómo lo resolví`, `Resultado`, `Qué aprendí`) y las etiquetas del aside viven en `data.ts`; ningún componente tiene texto escrito a mano.

## Plan de implementación

Antes del paso 1, leer en `node_modules/next/dist/docs/` las guías de rutas dinámicas, `generateStaticParams` y `not-found` del App Router (en esta versión `params` es una `Promise`), como indica `CLAUDE.md`.

1. En `app/data/data.ts`, añadir los tipos nuevos, `site.projectPage`, y ampliar la función que construye cada `Project` con `slug`, `href` derivado y `detail` con los marcadores del mockup. Verificación: `npm run build` sin errores de tipos y la Home sigue igual salvo el destino de "Ver caso".
2. Crear `app/proyectos/[slug]/page.tsx` con `generateStaticParams`, búsqueda por slug y `notFound()`, mostrando solo el título del proyecto en un `<main>`. Verificación: `/proyectos/proyecto-1` responde 200 y `/proyectos/xyz` responde 404; "Ver caso" de la Home lleva al detalle.
3. Crear `ProjectHeader.tsx` (borde inferior, enlace "← Volver", botón "Contacto" píldora `bg-accent`) y montarlo. Verificación: ambos enlaces navegan a `/home` y `/home#contacto`.
4. Crear `ProjectHero.tsx` (eyebrow mono, `h1` con `max-w-[18ch]`, `lead` con `max-w-[60ch]`, columna `max-w-[1000px]` centrada) y montarlo. Verificación: tipografía fluida entre 375 y 1440 px.
5. Crear `ProjectFacts.tsx` (franja con bordes superior e inferior y cuatro columnas `flex-[1_1_180px]`, enlaces en `text-accent`) y `ProjectMainShot.tsx` (marco `rounded-[20px]` de altura `clamp(260px,34vw,520px)`) y montarlos. Verificación: la franja se reparte en 4 columnas a 1440 px y se apila a 375 px.
6. Crear `ProjectBody.tsx` (cuatro secciones `h2` con lista en "Cómo lo resolví" + aside blanco "En resumen" con `h3`, `align-self: flex-start`) y montarlo. Verificación: a menos de ~800 px el aside baja debajo del texto.
7. Crear `ProjectGallery.tsx` (dos marcos de 300 px, `rounded-[16px]`) y `ProjectFooter.tsx` (fondo `ink`, `h2` "Siguiente proyecto", botón con borde `#3A3A42`, `margin-top: auto`) y montarlos. Verificación: con poco contenido el footer queda pegado al borde inferior.
8. Revisar la página completa contra el mockup abierto en paralelo (servido con `python -m http.server`) en 1440 px, 768 px y 375 px, y ajustar diferencias de espaciado.

## Criterios de aceptación

- [x] `npm run build` termina sin errores y genera las cuatro rutas `/proyectos/proyecto-1` … `proyecto-4`.
- [x] `npm run lint` termina sin errores.
- [x] `/proyectos/proyecto-1` responde 200 y `/proyectos/no-existe` responde 404.
- [x] Existen `app/proyectos/[slug]/page.tsx` y los siete archivos de `app/proyectos/components/`.
- [x] Ningún archivo del detalle contiene `"use client"` ni estilos en línea (`style=`), salvo que un valor no pueda expresarse con Tailwind.
- [x] Todo texto visible del detalle se importa de `app/data/data.ts`; ningún componente tiene texto escrito a mano.
- [x] Hay un solo `h1`; los títulos de sección y "Siguiente proyecto" son `h2`; "En resumen" es `h3`.
- [x] Los cuatro enlaces "Ver caso" de la Home tienen `href` `/proyectos/proyecto-1` … `proyecto-4` y navegan sin recargar la página completa.
- [x] "← Volver al portafolio" lleva a `/home`, "Contacto" a `/home#contacto` y "Ver todos los casos →" a `/home#proyectos`.
- [x] A 375 px de ancho no hay scroll horizontal.
- [x] A 1440 px la franja de datos muestra 4 columnas y el cuerpo muestra texto y aside lado a lado; a 375 px todo va en una columna.
- [x] `getComputedStyle` del botón "Contacto" da `background-color: rgb(43, 92, 230)` y `border-radius` de 999 px.
- [x] El `h1` tiene `max-width: 18ch` y `font-weight: 800`.
- [x] La captura principal tiene `border-radius: 20px` y las de la galería, `16px`.
- [x] El footer tiene fondo `rgb(18, 18, 20)`.
- [x] Los archivos de la Home no cambian, salvo `app/data/data.ts`.

## Decisiones tomadas y descartadas

- **Sí:** ruta dinámica `/proyectos/[slug]`, aprobada por el usuario. Razón: escala a los cuatro proyectos y a los reales sin duplicar páginas.
- **No:** una sola página `/proyecto` ni anidar bajo `/home`. Razón: no admite contenido por proyecto; `/home` es la Home, no un prefijo de sitio.
- **Sí:** ampliar `Project` con `slug` y `detail` en `data.ts`. Razón: pasar a contenido real toca un solo archivo, como pidió la SPEC 02.
- **No:** un único `detail` genérico compartido. Razón: no sirve cuando el contenido deje de ser marcador.
- **Sí:** `href` derivado del `slug` dentro de `data.ts`. Razón: `Projects.tsx` no cambia y un slug nuevo actualiza el enlace solo.
- **Sí:** `ProjectHeader` y `ProjectFooter` propios en `app/proyectos/components/`. Razón: difieren de los de la Home en contenido y estructura; no se toca la SPEC 02 ya implementada.
- **No:** mover los de la Home a `app/components/` y parametrizarlos. Razón: más superficie de cambio y riesgo de regresión en la Home para compartir muy poco código.
- **Sí:** el cierre replica el mockup (título + botón a todos los casos). Razón: el mockup no define un enlace al proyecto siguiente; no se inventa.
- **No:** enlace circular al proyecto siguiente. Razón: queda para una spec posterior si se desea.
- **Sí:** `next/link` para enlaces internos. Razón: navegación del lado del cliente sin pasar a Client Components.
- **Sí:** Server Components únicamente. Razón: no hay interactividad.
- **No:** `.rise` ni otras animaciones de entrada. Razón: el mockup del detalle no las incluye.
- **No:** tokens nuevos en `@theme` para `20px`, `16px`, `#EAE9E4` y `#3A3A42`. Razón: cada valor se usa en un solo sitio; modificaría la SPEC 01 sin necesidad.
- **No:** `next/image` ni `generateMetadata`. Razón: no hay imágenes ni metadatos reales todavía.
- **Reemplaza:** el criterio de la SPEC 02 "Todos los enlaces 'Ver caso' tienen `href="#"`". Razón: era provisional hasta esta spec.

## Riesgos identificados

| Riesgo | Mitigación |
| ------ | ---------- |
| Esta versión de Next.js cambia `params` (es una `Promise`) y la API de rutas dinámicas. | Leer la guía en `node_modules/next/dist/docs/` antes de escribir `page.tsx` y verificar con `npm run build`. |
| Un slug inexistente rompe la página en lugar de dar 404. | `notFound()` explícito y criterio de aceptación con `/proyectos/no-existe`. |
| Ampliar `Project` rompe el uso actual en `Projects.tsx` y `page.tsx` de la Home. | Los campos existentes se conservan; solo se añaden `slug` y `detail`. Verificar con `npm run build`. |
| El `next/link` en el botón del footer no hereda los estilos del enlace global (`a:hover` cambia el color). | Fijar `text-page` (`#FBFBF9`) y comprobar el color en hover; si la clase `.social` de la Home coincide con el botón, reutilizarla en vez de duplicar estilos. |
| El layout flex del mockup (`flex: 999 1 520px`, `flex: 1 1 260px`) se traduce mal a utilidades. | Usar valores arbitrarios (`flex-[999_1_520px]`) y comparar a 1440, 768 y 375 px contra el mockup. |
| Contenido real largo (títulos, listas de stack) rompe la franja de datos. | `min-w-0` en cada columna, como el mockup; revisar con textos largos al pasar a contenido real. |

## Qué **no** está en esta spec

- Contenido real, capturas reales y enlaces reales de repositorio/demo.
- Enlace al proyecto siguiente.
- Metadatos por proyecto y favicon.
- Componentes compartidos en `app/components/`.
- Animaciones de entrada, modo oscuro y selector de acento.
- Interactividad de cliente.
