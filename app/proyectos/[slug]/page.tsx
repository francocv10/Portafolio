import { notFound } from "next/navigation";
import { site } from "../../data/data";

export function generateStaticParams() {
  return site.projects.items.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = site.projects.items.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="leading-[normal]">
      <h1>{project.title}</h1>
    </main>
  );
}
