'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { label: '뜨는 부업', href: '/?section=trending' },
  { label: '인기 부업', href: '/?section=popular' },
  { label: '모든 부업', href: '/?section=all' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-primary hover:opacity-80 transition-opacity"
          aria-label="부업레이더 홈"
        >
          ☀️ 부업레이더
        </Link>

        {/* Desktop nav — 검색 아이콘 없음 (PRD Scope Freeze) */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:text-primary transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col gap-1"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block w-5 h-0.5 bg-gray-600 rounded" />
          <span className="block w-5 h-0.5 bg-gray-600 rounded" />
          <span className="block w-5 h-0.5 bg-gray-600 rounded" />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3">
          <ul className="flex flex-col gap-3 text-sm text-gray-500">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-1 hover:text-primary transition-colors"
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
  )
}
