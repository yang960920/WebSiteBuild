// [PortfolioList] 포트폴리오 목록 탐색 담당
import { Metadata } from "next";
import PortfolioCard from "@/components/PortfolioCard";
import CTASection from "@/components/CTASection";
import portfolioData from "@/data/portfolio.json";

export const metadata: Metadata = {
    title: "포트폴리오 | 성공 사례",
    description: "웹사이트 구축 전문가가 작업한 다양한 포트폴리오와 성공 사례를 확인하세요.",
};

export default function PortfolioPage() {
    // 실제 프로젝트에서는 여기서 카테고리/태그 필터링 로직 추가 가능
    const portfolios = portfolioData;

    return (
        <div className="bg-gray-50 dark:bg-gray-950 pt-16 sm:pt-24 pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                        비즈니스 문제 해결 <span className="text-primary">사례</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        기획부터 디자인, 개발까지 전 과정을 책임진 결과물입니다.
                    </p>
                </div>

                {/* 필터링 UI (현재는 UI만 제공) */}
                <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
                    <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover">
                        전체 보기
                    </button>
                    <button className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                        기획/디자인
                    </button>
                    <button className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                        풀스택/기능개발
                    </button>
                    <button className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                        성능최적화
                    </button>
                </div>

                {/* 포트폴리오 그리드 */}
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolios.map((portfolio) => (
                        <PortfolioCard key={portfolio.slug} {...portfolio} />
                    ))}
                </div>
            </div>

            <CTASection />
        </div>
    );
}
