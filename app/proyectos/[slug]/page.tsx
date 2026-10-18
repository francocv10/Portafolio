import { notFound } from "next/navigation";
import { site } from "../../data/data";
import ProjectBody from "../components/ProjectBody";
import ProjectFacts from "../components/ProjectFacts";
import ProjectFooter from "../components/ProjectFooter";
import ProjectGallery from "../components/ProjectGallery";
import ProjectHeader from "../components/ProjectHeader";
import ProjectHero from "../components/ProjectHero";
import ProjectMainShot from "../components/ProjectMainShot";

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

  const { back, contact, eyebrow, facts, summaryTitle, next } =
    site.projectPage;

  return (
    <div className="flex min-h-screen flex-col leading-[normal]">
      <ProjectHeader back={back} contact={contact} />
      <main>
        <ProjectHero
          eyebrow={eyebrow}
          title={project.title}
          lead={project.detail.lead}
        />
        <ProjectFacts
          labels={facts}
          role={project.detail.role}
          period={project.detail.period}
          stack={project.detail.stack}
          links={project.detail.links}
        />
        <ProjectMainShot label={project.detail.mainShotLabel} />
        <ProjectBody
          sections={project.detail.sections}
          summaryTitle={summaryTitle}
          summary={project.detail.summary}
        />
        <ProjectGallery labels={project.detail.gallery} />
      </main>
      <ProjectFooter title={next.title} cta={next.cta} />
    </div>
  );
}
