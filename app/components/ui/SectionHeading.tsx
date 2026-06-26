type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="text-center mb-16">

      {subtitle && (
        <p className="uppercase tracking-[0.3em] text-yellow-400 text-sm mb-3">
          {subtitle}
        </p>
      )}

      <h2 className="text-5xl font-black">
        {title}
      </h2>

    </div>
  );
}