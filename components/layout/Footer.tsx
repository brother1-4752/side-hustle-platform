import Link from "next/link";

const LEGAL_LINKS = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white border-t-4 border-primary mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <span className="font-black text-white">☀️ 부업레이더</span>
          <span className="text-center">
            데이터는 정기적으로 업데이트됩니다. 수익은 개인 역량에 따라
            상이합니다.
          </span>
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-white transition-colors underline underline-offset-2 decoration-white/30"
              >
                {label}
              </Link>
            ))}
            <span>© 2026 부업레이더</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
