interface SectionHeaderProps {
  emoji: string;
  title: string;
}

export default function SectionHeader({ emoji, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="text-xl leading-none" aria-hidden="true">
        {emoji}
      </span>
      <h2 className="text-lg font-black text-ink relative inline-block">
        <span className="relative z-10">{title}</span>
        <span
          className="absolute left-0 right-0 bottom-0.5 h-2 bg-accent-lime -z-0"
          aria-hidden="true"
        />
      </h2>
      <div className="flex-1 h-0.5 bg-ink/10 ml-1" />
    </div>
  );
}
