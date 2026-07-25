"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "뜨는 부업", href: "/?section=trending" },
  { label: "인기 부업", href: "/?section=popular" },
  { label: "모든 부업", href: "/?section=all" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-base/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2"
          aria-label="부업레이더 홈"
        >
          <span className="w-9 h-9 flex items-center justify-center bg-bg-sidebar rounded-lg text-lg">
            ☀️
          </span>
          <span className="text-lg font-bold text-ink tracking-tight">
            부업레이더
          </span>
        </Link>

        {/* Desktop nav — 검색 아이콘 없음 (PRD Scope Freeze) */}
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-3 py-1.5 rounded-full font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col gap-1 rounded-lg border border-gray-200"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block w-5 h-0.5 bg-ink rounded" />
          <span className="block w-5 h-0.5 bg-ink rounded" />
          <span className="block w-5 h-0.5 bg-ink rounded" />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-bg-base border-t border-gray-200 px-4 py-3">
          <ul className="flex flex-col gap-1 text-sm">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-3 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
