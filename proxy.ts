import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site } from "./app/data/data";

const slugs = new Set(site.projects.items.map(({ slug }) => slug));

// Con Cache Components, un slug fuera de generateStaticParams responde 200 en
// la primera visita (el streaming fija el estado antes de notFound()). Aquí se
// devuelve el 404 real antes de que la ruta se renderice.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];

  if (!slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
}

export const config = {
  matcher: "/proyectos/:slug",
};
