# Portafolio

Sitio de portafolio personal construido con Next.js (App Router), React y Tailwind CSS.

## Tecnologías

- [Next.js 16](https://nextjs.org/) (App Router, `app/` en la raíz del repo)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) mediante `@tailwindcss/turbopack`
- [TypeScript](https://www.typescriptlang.org/)
- ESLint


## Estructura del proyecto

```
app/home/       Página principal (page.tsx + components/)
app/proyectos/  Detalle de proyecto (/proyectos/[slug]) y sus componentes
app/data/       Contenido del sitio (data.ts): textos, enlaces y proyectos
app/            Layout y estilos globales (App Router)
proxy.ts        Resuelve los slugs de proyecto y devuelve 404 si no existen
public/         Archivos estáticos
specs/          Especificaciones de funcionalidades (diseño y prueba)
```

El alias de rutas `@/*` apunta a la raíz del repositorio. Se utiliza Playwright como test runner para la ejecución de pruebas de extremo a extremo (E2E) basadas en las especificaciones.

## Flujo de trabajo guiado por specs

Las funcionalidades grandes se diseñan primero como spec y después se implementan:

1. `/spec <descripción>` — diseña la spec de forma interactiva y la guarda en `specs/`. No escribe código.
2. `/spec-impl <NN-nombre-de-la-spec>` — implementa una spec aprobada en una rama de git con el mismo nombre.

Las ramas siguen el patrón `NN-nombre` (p. ej. `01-preparacion`, `02-preparacion`) y se fusionan en `main` mediante pull request.

