import { notFound } from "next/navigation";
import { site } from "../../data/data";
import ProjectHeader from "../components/ProjectHeader";

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

  const { back, contact } = site.projectPage;

  return (
    <div className="flex min-h-screen flex-col leading-[normal]">
      <ProjectHeader back={back} contact={contact} />
      <main>
        <h1>{project.title}</h1>
      </main>
    </div>
  );
}
