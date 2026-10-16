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
app/            Rutas, layout y estilos globales (App Router)
public/         Archivos estáticos
specs/          Specs de funcionalidades (se crea al usar /spec)
.claude/skills/ Skills de Claude Code (spec, spec-impl, frontend-design)
```

El alias de rutas `@/*` apunta a la raíz del repositorio. No hay ningún test runner configurado.

## Flujo de trabajo guiado por specs

Las funcionalidades grandes se diseñan primero como spec y después se implementan:

1. `/spec <descripción>` — diseña la spec de forma interactiva y la guarda en `specs/`. No escribe código.
2. `/spec-impl <NN-nombre-de-la-spec>` — implementa una spec aprobada en una rama de git con el mismo nombre.

Las ramas siguen el patrón `NN-nombre` (p. ej. `01-preparacion`, `02-preparacion`) y se fusionan en `main` mediante pull request.

