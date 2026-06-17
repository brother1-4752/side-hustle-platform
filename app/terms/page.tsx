import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "부업레이더 서비스 이용약관입니다. 서비스 이용 조건, 책임 한계, 저작권 정책을 안내합니다.",
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    id: "purpose",
    title: "제1조 (목적)",
    content: (
      <p>
        본 약관은 부업레이더(이하 &ldquo;서비스&rdquo;)가 제공하는 부업 정보
        플랫폼 서비스의 이용 조건 및 절차, 서비스 제공자와 이용자 간의 권리·
        의무·책임 사항을 규정함을 목적으로 합니다.
      </p>
    ),
  },
  {
    id: "definitions",
    title: "제2조 (정의)",
    content: (
      <ul className="space-y-3 text-gray-600">
        <li className="flex gap-3">
          <span className="font-bold text-gray-800 shrink-0 w-20">서비스</span>
          <span>
            부업레이더가 운영하는 부업 정보 제공 웹사이트(
            side-hustle-platform.vercel.app) 및 이와 관련된 모든 콘텐츠
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-gray-800 shrink-0 w-20">이용자</span>
          <span>본 약관에 따라 서비스를 이용하는 모든 방문자</span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-gray-800 shrink-0 w-20">콘텐츠</span>
          <span>
            서비스에 게재된 부업 정보, 가이드, 수익 지표, 이미지 등 일체의 자료
          </span>
        </li>
      </ul>
    ),
  },
  {
    id: "conditions",
    title: "제3조 (서비스 이용 조건)",
    content: (
      <>
        <p>
          이용자는 다음 조건에 동의하는 경우에만 서비스를 이용할 수 있습니다.
        </p>
        <ul className="mt-4 space-y-2 text-gray-600">
          {[
            "본 약관의 모든 조항을 이해하고 동의함",
            "서비스 이용 목적이 합법적이며 타인의 권리를 침해하지 않음",
            "서비스 콘텐츠를 상업적 목적으로 무단 복제·배포하지 않음",
            "자동화된 수단(봇, 크롤러 등)으로 서비스를 과도하게 이용하지 않음",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "제4조 (정보의 정확성 및 책임의 한계)",
    content: (
      <>
        <div className="rounded-xl border border-rose-200/70 bg-rose-50/50 p-5 mb-5">
          <p className="font-semibold text-rose-800 mb-2">⚠️ 중요 고지사항</p>
          <p className="text-rose-700 text-sm leading-relaxed">
            부업레이더에 수록된 예상 수익, 초기 비용, 소요 시간 등 모든 정보는
            일반적인 참고 목적으로만 제공됩니다.{" "}
            <strong>
              실제 수익은 개인의 역량, 시장 상황, 투입 시간 등에 따라 크게 다를
              수 있으며, 서비스는 특정 수익을 보장하지 않습니다.
            </strong>
          </p>
        </div>
        <ul className="space-y-3 text-gray-600">
          {[
            "서비스 콘텐츠는 정기적으로 업데이트되나, 모든 정보의 최신성·정확성·완전성을 보증하지 않습니다.",
            "서비스를 통해 소개된 부업 활동의 개시, 투자 결정 및 그 결과에 대한 모든 책임은 이용자 본인에게 있습니다.",
            "특정 플랫폼(쿠팡파트너스, 크몽 등) 이용 시 발생하는 문제에 대해 서비스는 책임을 지지 않습니다.",
            "서비스에 게재된 제3자 광고(Google AdSense)의 내용에 대해 서비스는 책임을 지지 않습니다.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "copyright",
    title: "제5조 (지식재산권 및 저작권)",
    content: (
      <>
        <p>
          서비스에 게재된 모든 콘텐츠(텍스트, 레이아웃, 아이콘, 데이터 구조
          등)의 저작권은 부업레이더에 귀속됩니다.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-50/60 border border-emerald-100 p-4">
            <p className="text-sm font-bold text-emerald-800 mb-1">
              ✅ 허용되는 이용
            </p>
            <ul className="text-xs text-emerald-700 space-y-1">
              <li>개인적·비상업적 목적의 정보 열람</li>
              <li>출처 명시를 전제로 한 소량 인용</li>
              <li>SNS 공유 (원본 링크 유지 조건)</li>
            </ul>
          </div>
          <div className="rounded-xl bg-rose-50/60 border border-rose-100 p-4">
            <p className="text-sm font-bold text-rose-800 mb-1">
              🚫 금지되는 이용
            </p>
            <ul className="text-xs text-rose-700 space-y-1">
              <li>콘텐츠 무단 복제·배포·판매</li>
              <li>타 플랫폼 재게시 (출처 미표기 포함)</li>
              <li>데이터베이스 크롤링 및 대량 추출</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          저작권 침해가 발견된 경우 DMCA 절차 또는 관련 법령에 따라 조치할 수
          있습니다.
        </p>
      </>
    ),
  },
  {
    id: "service-changes",
    title: "제6조 (서비스 변경 및 중단)",
    content: (
      <p>
        서비스는 운영상·기술상 필요에 따라 사전 공지 없이 서비스의 일부 또는
        전부를 변경하거나 중단할 수 있습니다. 서비스 변경·중단으로 인해
        이용자에게 발생한 손해에 대해 서비스는 책임을 지지 않습니다.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "제7조 (준거법 및 관할)",
    content: (
      <p>
        본 약관의 해석 및 이용자와의 분쟁에 관해서는 대한민국 법률을 적용하며,
        분쟁 발생 시 서울중앙지방법원을 전속 관할 법원으로 합니다.
      </p>
    ),
  },
  {
    id: "amendments",
    title: "제8조 (약관 변경)",
    content: (
      <p>
        서비스는 필요한 경우 약관을 변경할 수 있으며, 변경 시 시행 7일 전에
        서비스 내 공지합니다. 변경된 약관 시행일 이후에도 서비스를 계속 이용하는
        경우 변경 약관에 동의한 것으로 간주합니다.
      </p>
    ),
  },
  {
    id: "contact",
    title: "제9조 (문의처)",
    content: (
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
        <p className="font-semibold text-gray-800">부업레이더 운영팀</p>
        <p className="mt-2 text-sm text-gray-500">
          이메일:{" "}
          <a
            href="mailto:contact@bupyeradar.com"
            className="text-primary hover:opacity-80"
          >
            contact@bupyeradar.com
          </a>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          운영 시간: 평일 10:00 ~ 18:00 (주말·공휴일 제외)
        </p>
      </div>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
          법적 문서
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          이용약관
        </h1>
        <p className="text-gray-400 text-sm">
          부업레이더 서비스 이용 전 반드시 본 약관을 확인해 주십시오.
        </p>
        <div className="mt-6 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
      </div>

      {/* Table of Contents */}
      <nav
        aria-label="약관 목차"
        className="mb-10 rounded-2xl border border-gray-100 bg-gray-50 p-5"
      >
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          목차
        </p>
        <ol className="space-y-1.5 text-sm text-gray-500 columns-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="hover:text-primary transition-colors"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-20"
            aria-labelledby={`${section.id}-heading`}
          >
            <h2
              id={`${section.id}-heading`}
              className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100"
            >
              {section.title}
            </h2>
            <div className="text-gray-600 leading-relaxed text-[15px]">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-gray-100 text-xs text-gray-400 text-center">
        본 약관은 2026년 6월 17일부터 시행됩니다.
      </div>
    </div>
  );
}
