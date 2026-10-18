type ProjectMainShotProps = {
  label: string;
};

export default function ProjectMainShot({ label }: ProjectMainShotProps) {
  return (
    <section className="px-[clamp(24px,5vw,64px)] pb-[clamp(48px,6vw,80px)]">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex h-[clamp(260px,34vw,520px)] items-center justify-center rounded-[20px] border border-line bg-surface-sunken">
          <span className="font-mono text-[12px] tracking-[0.12em] text-faint">
            {label}
          </span>
        </div>
      </div>
    </section>
  );
}
