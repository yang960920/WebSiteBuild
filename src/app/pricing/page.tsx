// [Pricing] 가격/견적 기준, 결제 방식 안내 담당
import { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { Check } from "lucide-react";

export const metadata: Metadata = {
    title: "비용 안내 | 견적 기준",
    description: "투명하고 합리적인 웹사이트 구축 비용과 결제 기준을 확인하세요.",
};

export default function PricingPage() {
    const tiers = [
        {
            name: "스타터 랜딩",
            id: "tier-starter",
            href: "/contact",
            priceMonthly: "10만원 ~",
            description: "단일 제품 홍보나 이벤트 신청을 목적으로 하는 1페이지 분량의 사이트.",
            features: [
                "섹션 5~7개 구성 원페이지",
                "반응형 웹 UI (모바일/PC)",
                "이메일 발송 문의 폼 1종",
                "기본 SEO 설정",
                "디자인 커스텀 1회 지원",
            ],
            mostPopular: false,
        },
        {
            name: "비즈니스 소개",
            id: "tier-business",
            href: "/contact",
            priceMonthly: "50만원 ~",
            description: "회사를 소개하고 여러 건의 포트폴리오(제품)를 노출해야 하는 기업형 사이트.",
            features: [
                "총 5~10장 분량의 다중 페이지",
                "게시판(공지사항, 갤러리) 기본 2종",
                "구글 애널리틱스 트래픽 분석 세팅",
                "디자인 시안 2종 제공",
            ],
            mostPopular: true,
        },
        {
            name: "프리미엄 & 커스텀",
            id: "tier-premium",
            href: "/contact",
            priceMonthly: "협의 (별도견적)",
            description: "인증, 결제 등 독자적인 비즈니스 로직과 시스템 연동이 필요한 맞춤형 서비스.",
            features: [
                "Next.js / React 숙련 기반 풀스택",
                "소셜 로그인 및 회원가입/관리자",
                "마이크로 인터랙션 애니메이션",
                "서드파티 API(지도, 공공데이터) 매시업",
                "3개월 성능 유지보수 보장",
            ],
            mostPopular: false,
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-950 pt-16 sm:pt-24 pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                        <span className="text-primary">퀄리티</span>에 비례하는 투명한 비용
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        예산이 허투루 쓰이지 않도록 코어한 부분에 집중합니다.
                        아래 가격은 최소 기준이며 상세 요구사항에 따라 변동될 수 있습니다.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`rounded-3xl p-8 xl:p-10 ${tier.mostPopular
                                ? "ring-2 ring-primary dark:ring-primary bg-white dark:bg-gray-900"
                                : "ring-1 ring-gray-200 dark:ring-gray-800 bg-white/60 dark:bg-gray-900/40"
                                }`}
                        >
                            <div className="flex items-center justify-between gap-x-4">
                                <h3
                                    id={tier.id}
                                    className={`text-lg font-semibold leading-8 ${tier.mostPopular ? "text-primary" : "text-gray-900 dark:text-white"
                                        }`}
                                >
                                    {tier.name}
                                </h3>
                                {tier.mostPopular ? (
                                    <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                                        Most popular
                                    </p>
                                ) : null}
                            </div>
                            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                {tier.description}
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {tier.priceMonthly}
                                </span>
                                {tier.id !== 'tier-premium' && (
                                    <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">/ 건</span>
                                )}
                            </p>
                            <Link
                                href={tier.href}
                                aria-describedby={tier.id}
                                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${tier.mostPopular
                                    ? "bg-primary text-white shadow-sm hover:bg-primary-hover focus-visible:outline-primary"
                                    : "text-primary ring-1 ring-inset ring-primary/20 hover:ring-primary/40 focus-visible:outline-primary"
                                    }`}
                            >
                                상담 진행하기
                            </Link>
                            <ul
                                role="list"
                                className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400"
                            >
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check
                                            className={`h-6 w-5 flex-none ${tier.mostPopular ? "text-primary" : "text-gray-400"
                                                }`}
                                            aria-hidden="true"
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 결제 방식 안내 */}
                <div className="mx-auto max-w-4xl mt-24 bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">결제 기준 안내</h3>
                            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                                <li>
                                    <strong className="text-gray-900 dark:text-white block font-medium">계약금 (50%)</strong>
                                    비용의 절반을 착수금으로 결제해주시면 즉시 작업을 시작합니다.
                                </li>
                                <li>
                                    <strong className="text-gray-900 dark:text-white block font-medium">잔금 (50%)</strong>
                                    결과물 최종 검수 후 이상이 없을 경우 잔금을 지급해주시면 즉시 소스 및 도메인 권한을 이전합니다.
                                </li>
                                <li className="text-sm pt-2 text-gray-500">
                                    * 전자세금계산서 발급이 가능하며, VAT 10%는 별도입니다.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">추가 비용 발생 조건</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400 list-disc pl-5">
                                <li>협의된 횟수를 초과하는 디자인 기획 전면 재수정 요청 시</li>
                                <li>개발이 상당 부분 진행된 후 발생하는 신규 레이아웃/기능 추가</li>
                                <li>다국어(영어/중국어 등) 번역 페이지 추가 구성</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <CTASection />
        </div>
    );
}
