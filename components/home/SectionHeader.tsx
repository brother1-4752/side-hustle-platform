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
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <div className="flex-1 h-px bg-gray-200 ml-1" />
    </div>
  );
}
