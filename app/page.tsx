import Sidebar from '@/components/layout/Sidebar'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          지금 가장 뜨는 부업, 광고 없이 한눈에. 🌿
        </h1>
        <p className="text-gray-500 text-base">
          사기 없이, 지금 바로 시작할 수 있는 부업 정보만 모았습니다.
        </p>
      </section>

      {/* Main layout: feed + sidebar */}
      <div className="flex gap-8 items-start">
        {/* Feed — card sections will be wired in next BUILD task */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-300 py-12 text-center">
            🔥 뜨는 부업 · 💡 인기 부업 · 📚 모든 부업 섹션 — 다음 빌드에서 구현
          </p>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}
