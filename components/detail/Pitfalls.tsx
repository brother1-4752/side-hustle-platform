interface PitfallsProps {
  items: string[];
}

export default function Pitfalls({ items }: PitfallsProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="chip-brutal w-8 h-8 flex items-center justify-center rounded-lg bg-amber-400 text-ink text-sm">
          ⚠️
        </div>
        <h2 className="text-xl font-black text-ink tracking-tight">
          이런 점은 조심하세요
        </h2>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="card-brutal flex gap-2.5 text-sm text-gray-700 leading-relaxed bg-amber-50 rounded-xl px-4 py-3"
          >
            <span className="text-amber-600 font-black flex-shrink-0">!</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
