// [Home] 메인 페이지 (Hero, 포트폴리오 요약, 서비스 요약, 프로세스, FAQ, 최종 CTA) 담당
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import PortfolioCard from "@/components/PortfolioCard";
import FAQAccordion from "@/components/FAQAccordion";
import portfolioData from "@/data/portfolio.json";

export default function Home() {
    const recentPortfolios = portfolioData.slice(0, 3);

    const faqs = [
        {
            question: "웹사이트 제작 기간은 얼마나 걸리나요?",
            answer: "페이지 수와 기능의 복잡도에 따라 다르지만, 일반적으로 기업 홈페이지나 랜딩 페이지의 경우 기획부터 오픈까지 3주에서 6주 정도 소요됩니다. 첫 상담 시 프로젝트 요구사항을 파악한 후 구체적인 일정을 안내해 드립니다."
        },
        {
            question: "유지보수도 해주시나요?",
            answer: "네, 가능합니다. 프로젝트 완료 후 1개월은 버그 수정 등 무상 유지보수를 제공합니다. 이후에는 주기적인 업데이트나 콘텐츠 관리가 필요한 기업을 위해 월간/건별 결제 방식의 유지보수 플랜을 운영하고 있습니다."
        },
        {
            question: "도메인과 호스팅은 어떻게 처리되나요?",
            answer: "고객님의 비즈니스 상황에 맞춰 Vercel, AWS, 카페24 등 적절한 호스팅 서버를 추천해드리며, 직접 가입하여 소유권을 가지시도록 안내해 드립니다. 도메인 연결 등 기술적인 초기 세팅은 모두 제가 진행합니다."
        }
    ];

    return (
        <>
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white text-balance">
                        단순한 웹사이트가 아닌,<br className="hidden sm:block" />
                        <span className="text-primary">비즈니스 결과를 만드는 </span>
                        플랫폼
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 text-balance">
                        방문자에게 신뢰를 주고 문의로 이어지는 최적의 UI/UX를 설계합니다.
                        투명한 프로세스와 모던 웹 기술로 안정적인 브랜드를 구축하세요.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/portfolio"
                            className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
                        >
                            포트폴리오 보기
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                        >
                            무료 견적 받기 <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. 포트폴리오 요약 Section */}
            <section className="bg-gray-50 py-20 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            최근 작업물
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            다양한 산업군의 비즈니스 문제를 해결한 사례를 확인해보세요.
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {recentPortfolios.map((portfolio) => (
                            <PortfolioCard key={portfolio.slug} {...portfolio} />
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            모든 프로젝트 보기
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. 서비스 요약 Section */}
            <section className="bg-white py-20 dark:bg-gray-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            제공하는 서비스
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            초기 기획부터 안정적인 유지보수까지 풀스택 솔루션을 제공합니다.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto">
                        <div className="rounded-2xl border border-gray-200 p-8 shadow-sm dark:border-gray-800">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">스타터 패키지</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">초기 스타트업이나 개인 브랜드를 위한 빠르고 완성도 높은 원페이지 구축.</p>
                            <ul className="space-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                                <li>✨ 반응형 원페이지 랜딩</li>
                                <li>✨ 기본 SEO 설정</li>
                                <li>✨ 문의 폼 연동</li>
                                <li>⏱ 2~3주 소요</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border-2 border-primary bg-primary/5 p-8 shadow-md dark:bg-primary/10 relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">추천</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">비즈니스 패키지</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">기업의 신뢰도를 높이고 상세한 정보 전달이 필요한 다중 페이지 포트폴리오형.</p>
                            <ul className="space-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                                <li>✨ 5~10 페이지 구성</li>
                                <li>✨ 상세 마이크로 인터랙션</li>
                                <li>✨ 프리미엄 SEO 및 성능 최적화</li>
                                <li>⏱ 4~6주 소요</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-8 shadow-sm dark:border-gray-800">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">프리미엄 패키지</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">단순 소개를 넘어 맞춤형 복잡한 기능(결제, 예약, 회원가입 등)이 탑재된 솔루션.</p>
                            <ul className="space-y-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
                                <li>✨ 풀스택 맞춤형 백엔드/어드민</li>
                                <li>✨ 서드파티 API 연동</li>
                                <li>✨ 월 단위 지속 관리 플랜</li>
                                <li>⏱ 8주 이상 소요</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/services" className="text-primary font-medium hover:underline">패키지별 상세 스펙 확인하기 →</Link>
                    </div>
                </div>
            </section>

            {/* 4. 작업 프로세스 Section */}
            <section className="bg-gray-50 py-20 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            투명하고 명확한 작업 프로세스
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            각 단계별 산출물을 문서로 공유하여 커뮤니케이션 오류를 방지합니다.
                        </p>
                    </div>
                    <div className="mt-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xl">1</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">상담 및 기획</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">목적과 타겟을 분석하고 상세한 견적서와 메뉴 구조도(IA)를 전달합니다.</p>
                            </div>
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xl">2</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">시안 디자인</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">UI/UX 설계 후 Figma로 제작된 시안을 통해 화면을 실제로 확인하고 피드백을 수용합니다.</p>
                            </div>
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xl">3</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">개발 & 최적화</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">컨펌된 시안을 바탕으로 성능과 반응형을 고려한 프론트/백엔드 코드를 작성합니다.</p>
                            </div>
                            <div className="relative">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xl">4</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">검수 및 런칭</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">테스트 링크 기반 꼼꼼한 코드/에러 검수 후 실서버 호스팅 및 도메인을 배포합니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/process" className="text-primary font-medium hover:underline">준비사항 및 수정 정책 자세히 보기 →</Link>
                    </div>
                </div>
            </section>

            {/* 5. FAQ Section */}
            <section className="bg-white py-20 dark:bg-gray-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            자주 묻는 질문
                        </h2>
                    </div>
                    <FAQAccordion items={faqs} />
                </div>
            </section>

            {/* 6. CTA Section */}
            <CTASection />
        </>
    );
}
