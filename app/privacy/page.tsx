import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "부업레이더의 개인정보처리방침입니다. Google AdSense 쿠키 사용 및 이용자 데이터 처리 방법을 안내합니다.",
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    id: "overview",
    title: "1. 개요",
    content: (
      <>
        <p>
          부업레이더(이하 &ldquo;서비스&rdquo;)는 이용자의 개인정보를 소중히
          여기며 「개인정보 보호법」 및 관련 법령을 준수합니다. 본 방침은
          서비스가 이용자의 정보를 어떻게 수집·이용·보호하는지 안내합니다.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          시행일: 2026년 6월 17일 | 최종 수정: 2026년 6월 17일
        </p>
      </>
    ),
  },
  {
    id: "collection",
    title: "2. 수집하는 개인정보 항목 및 수집 방법",
    content: (
      <>
        <p>서비스는 다음과 같은 정보를 자동으로 수집합니다.</p>
        <h3 className="mt-5 mb-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
          자동 수집 항목
        </h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span>
              <strong>서비스 이용 기록</strong> — 접속 IP 주소, 브라우저 종류 및
              버전, 방문 페이지 URL, 방문 일시, 클릭 이벤트 (Vercel Analytics를
              통해 자동 수집)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span>
              <strong>쿠키(Cookie) 데이터</strong> — 광고 성과 측정 및 맞춤형
              광고 제공을 위해 Google AdSense가 쿠키를 설정합니다
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span>
              <strong>기기 및 환경 정보</strong> — 운영체제, 화면 해상도, 사용
              언어 등 통계적 분석을 위한 기술 정보
            </span>
          </li>
        </ul>
        <div className="mt-5 rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-500">
          서비스는 별도의 회원가입 절차가 없어 성명, 이메일, 연락처 등의 식별
          개인정보를 직접 수집하지 않습니다.
        </div>
      </>
    ),
  },
  {
    id: "purpose",
    title: "3. 개인정보 이용 목적",
    content: (
      <ul className="space-y-2 text-gray-600">
        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          <span>서비스 품질 개선 및 이용자 경험 분석</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          <span>
            이용자 관심사 기반의 맞춤형 광고 제공 (Google AdSense 연동)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          <span>서비스 접속 패턴 분석 및 안정성 모니터링</span>
        </li>
      </ul>
    ),
  },
  {
    id: "adsense",
    title: "4. 제3자 광고주(Google AdSense)의 쿠키 사용",
    content: (
      <>
        <p>
          본 서비스는 <strong>Google LLC</strong>의 광고 서비스인{" "}
          <strong>Google AdSense</strong>를 통해 광고를 게재합니다. Google
          AdSense는 다음과 같이 쿠키를 사용합니다.
        </p>
        <ul className="mt-4 space-y-3 text-gray-600">
          <li className="flex gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
            <span>
              Google은 이용자의 이전 방문 기록 및 관심사를 기반으로{" "}
              <strong>맞춤형 광고(Interest-Based Advertising)</strong>를
              제공합니다.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
            <span>
              Google의 DoubleClick 쿠키는 이용자가 부업레이더 및 다른 웹사이트를
              방문할 때 광고 클릭 이력을 수집합니다.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
            <span>
              Google의 개인정보 처리 방식에 대한 자세한 내용은{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                Google 개인정보처리방침
              </a>
              을 참조하십시오.
            </span>
          </li>
        </ul>
        <div className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-sm text-amber-800">
          <strong>맞춤형 광고 옵트아웃(Opt-out)</strong>
          <br />
          Google의 맞춤형 광고 제공을 원하지 않으실 경우{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80"
          >
            Google 광고 설정
          </a>
          에서 맞춤 광고를 비활성화할 수 있습니다.
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. 쿠키 차단 방법",
    content: (
      <>
        <p>
          이용자는 브라우저 설정을 통해 쿠키 수집을 거부하거나 삭제할 수
          있습니다. 단, 쿠키를 차단할 경우 일부 서비스 기능이 제한될 수
          있습니다.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { browser: "Chrome", path: "설정 → 개인정보 및 보안 → 쿠키" },
            { browser: "Safari", path: "설정 → Safari → 쿠키 차단" },
            { browser: "Firefox", path: "설정 → 개인정보 및 보안 → 쿠키" },
            { browser: "Edge", path: "설정 → 쿠키 및 사이트 권한" },
          ].map(({ browser, path }) => (
            <div
              key={browser}
              className="rounded-xl bg-gray-50 border border-gray-100 p-4"
            >
              <p className="text-sm font-semibold text-gray-700">{browser}</p>
              <p className="mt-1 text-xs text-gray-400">{path}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "retention",
    title: "6. 개인정보 보유 및 파기",
    content: (
      <p>
        서비스가 직접 수집한 데이터(Vercel Analytics 통계)는 서비스 운영 기간
        동안 보유하며, 서비스 종료 시 지체 없이 삭제합니다. Google AdSense가
        수집하는 데이터의 보유 기간은 Google의 정책에 따릅니다.
      </p>
    ),
  },
  {
    id: "rights",
    title: "7. 이용자의 권리",
    content: (
      <p>
        이용자는 언제든지 브라우저 설정을 통해 쿠키 수집을 거부하거나, Google
        광고 설정을 통해 맞춤형 광고를 차단할 수 있습니다. 추가적인 개인정보
        관련 문의는 아래 개인정보 보호책임자에게 연락해 주십시오.
      </p>
    ),
  },
  {
    id: "contact",
    title: "8. 개인정보 보호책임자",
    content: (
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
        <p className="font-semibold text-gray-800">부업레이더 운영팀</p>
        <p className="mt-2 text-sm text-gray-500">
          이메일:{" "}
          <a
            href="mailto:privacy@bupyeradar.com"
            className="text-primary hover:opacity-80"
          >
            privacy@bupyeradar.com
          </a>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          운영 시간: 평일 10:00 ~ 18:00 (주말·공휴일 제외)
        </p>
        <p className="mt-3 text-xs text-gray-400">
          개인정보 관련 민원은 개인정보침해 신고센터(privacy.kisa.or.kr) 또는
          개인정보 분쟁조정위원회(www.kopico.go.kr)에 신청하실 수 있습니다.
        </p>
      </div>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
          법적 문서
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          개인정보처리방침
        </h1>
        <p className="text-gray-400 text-sm">
          본 방침은 부업레이더 서비스 내 개인정보 처리 기준을 안내합니다.
        </p>
        <div className="mt-6 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />
      </div>

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
        본 개인정보처리방침은 법령 또는 서비스 변경 시 개정될 수 있으며, 개정 시
        시행일 7일 전에 공지합니다.
      </div>
    </div>
  );
}
