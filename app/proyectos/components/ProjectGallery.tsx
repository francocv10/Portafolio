type ProjectGalleryProps = {
  labels: string[];
};

export default function ProjectGallery({ labels }: ProjectGalleryProps) {
  return (
    <section className="px-[clamp(24px,5vw,64px)] pb-[clamp(56px,7vw,96px)]">
      <div className="mx-auto flex max-w-[1000px] flex-wrap gap-6">
        {labels.map((label) => (
          <div
            key={label}
            className="flex h-[300px] min-w-0 flex-[1_1_380px] items-center justify-center rounded-[16px] border border-line bg-surface-sunken"
          >
            <span className="font-mono text-[12px] tracking-[0.12em] text-faint">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
