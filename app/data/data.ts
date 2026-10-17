export type Project = {
  title: string;
  summary: string;
  meta: string;
  href: string;
};

export type NavLink = { label: string; href: string };
export type SocialLink = { label: string; href: string };

const project = (n: number): Project => ({
  title: `[Proyecto ${n}]`,
  summary: "[Una línea sobre qué resuelve y para quién.]",
  meta: "[Stack] · [Año]",
  href: "#",
});

export const site = {
  name: "[TU NOMBRE]",
  nav: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Contacto", href: "#contacto" },
  ] satisfies NavLink[],
  cv: { label: "Descargar CV", href: "#contacto" } satisfies NavLink,
  hero: {
    eyebrow: "Desarrollo de software · Santiago, Chile",
    title: "Construyo productos web de principio a fin.",
    description:
      "[Dos líneas sobre qué tipo de problemas resuelves y para quién. Ej: backend y frontend para equipos pequeños que necesitan salir a producción rápido.]",
    stack: ["[Stack 1]", "[Stack 2]", "[Stack 3]", "[Stack 4]"],
  },
  projects: {
    title: "Proyectos seleccionados",
    countLabel: "casos",
    captureLabel: "[CAPTURA DEL PROYECTO]",
    caseLabel: "Ver caso",
    items: [project(1), project(2), project(3), project(4)] satisfies Project[],
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "[Tres o cuatro líneas: cómo llegaste al desarrollo, qué tipo de equipos o problemas te interesan, y qué estás buscando ahora.]",
      "[Opcional: estudios, certificaciones o algo que te distinga fuera del código.]",
    ],
    toolsTitle: "Herramientas",
    tools: [
      "[Lenguajes]",
      "[Frameworks]",
      "[Bases de datos]",
      "[Infra y herramientas]",
    ],
  },
  contact: {
    eyebrow: "Hablemos",
    title: "¿Tienes un proyecto en mente?",
    email: "[tu@email.com]",
    socials: [
      { label: "GitHub", href: "https://github.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ] satisfies SocialLink[],
  },
};
