interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Stable id for section `aria-labelledby` */
  titleId?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2
        id={titleId}
        className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-zinc-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
    </div>
  );
}
