export type NavLink = { label: string; href: string };
export type SocialLink = { label: string; href: string };

export type ProjectSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type ProjectFact = { label: string; value: string };

export type ProjectDetail = {
  lead: string;
  role: string;
  period: string;
  stack: string;
  links: SocialLink[];
  mainShotLabel: string;
  sections: ProjectSection[];
  summary: ProjectFact[];
  gallery: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  meta: string;
  href: string;
  detail: ProjectDetail;
};

const project = (n: number): Project => {
  const slug = `proyecto-${n}`;
  return {
    slug,
    title: `[Proyecto ${n}]`,
    summary: "[Una línea sobre qué resuelve y para quién.]",
    meta: "[Stack] · [Año]",
    href: `/proyectos/${slug}`,
    detail: {
      lead: "[Una o dos líneas que resumen el proyecto: qué es, para quién, y cuál fue tu aporte.]",
      role: "[Tu rol]",
      period: "[Mes/Año – Mes/Año]",
      stack: "[Tecnologías]",
      links: [
        { label: "Repositorio", href: "https://github.com" },
        { label: "Demo en vivo", href: "https://example.com" },
      ],
      mainShotLabel: "[CAPTURA PRINCIPAL — 1600 × 1000 px]",
      sections: [
        {
          title: "El problema",
          body: "[Qué situación existía antes del proyecto y por qué había que resolverla. Dos o tres frases bastan.]",
        },
        {
          title: "Cómo lo resolví",
          body: "[Las decisiones técnicas importantes: arquitectura, qué elegiste y por qué, qué descartaste.]",
          bullets: [
            "[Decisión o módulo clave 1]",
            "[Decisión o módulo clave 2]",
            "[Decisión o módulo clave 3]",
          ],
        },
        {
          title: "Resultado",
          body: "[Qué cambió: métricas reales si las tienes, o el impacto concreto para quien usa el producto. No inventes números.]",
        },
        {
          title: "Qué aprendí",
          body: "[Una reflexión corta y honesta. Esta sección es la que más leen quienes contratan.]",
        },
      ],
      summary: [
        { label: "Equipo", value: "[Solo / N personas]" },
        { label: "Tipo", value: "[Personal / Cliente / Laboral]" },
        { label: "Estado", value: "[En producción / Archivado]" },
      ],
      gallery: ["[DETALLE 1]", "[DETALLE 2]"],
    },
  };
};

export const site = {
  name: "[TU NOMBRE]",
  nav: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Contacto", href: "#contacto" },
  ] satisfies NavLink[],
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
  projectPage: {
    back: {
      label: "← Volver al portafolio",
      href: "/home",
    } satisfies NavLink,
    contact: { label: "Contacto", href: "/home#contacto" } satisfies NavLink,
    eyebrow: "Caso de estudio",
    facts: {
      role: "Rol",
      period: "Periodo",
      stack: "Stack",
      links: "Enlaces",
    },
    summaryTitle: "En resumen",
    next: {
      title: "Siguiente proyecto",
      cta: {
        label: "Ver todos los casos →",
        href: "/home#proyectos",
      } satisfies NavLink,
    },
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
