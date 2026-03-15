// [PortfolioDetail] 특정 포트폴리오의 문제/해결/결과 상세 페이지 담당
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { getPortfolioBySlug, getAllPortfolios, initDb } from "@/lib/db";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";

interface Props {
    params: { slug: string };
}

// 동적 파라미터 기반 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    await initDb();
    const portfolio = await getPortfolioBySlug(params.slug);
    if (!portfolio) {
        return { title: "포트폴리오를 찾을 수 없습니다" };
    }
    return {
        title: `${portfolio.title} | 포트폴리오 상세`,
        description: portfolio.summary,
    };
}

// 동적 렌더링 (DB 데이터 실시간 반영)
export const dynamic = 'force-dynamic';

export default async function PortfolioDetailPage({ params }: Props) {
    await initDb();
    const portfolio = await getPortfolioBySlug(params.slug);

    if (!portfolio) {
        notFound();
    }

    return (
        <article className="bg-white dark:bg-gray-950 pb-0">
            {/* 상세 헤더 (Hero) */}
            <header className="bg-gray-50 py-16 sm:py-24 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 mb-8 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        목록으로 돌아가기
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {portfolio.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-6 text-balance">
                        {portfolio.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                        {portfolio.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">담당 역할</h3>
                            <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">{portfolio.role}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">제작 기간</h3>
                            <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">{portfolio.period}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">사용 기술</h3>
                            <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">{portfolio.stack.join(", ")}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* 썸네일/메인 이미지(Optional) */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl -mt-12 relative z-10">
                <div className="aspect-[21/9] w-full relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-900">
                    <Image
                        src={portfolio.thumbnail || "/images/placeholder-large.webp"}
                        alt={`${portfolio.title} 메인 화면`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* 상세 내용 (문제-해결-결과 분절 구조) */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-20 pb-24">

                {/* 문제/요구사항 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 text-sm mr-3 dark:bg-red-900/30 dark:text-red-400">1</span>
                        기존의 문제 및 요구사항
                    </h2>
                    <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400">
                        <p className="whitespace-pre-line">{portfolio.problem}</p>
                    </div>
                </section>

                {/* 해결 방식 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm mr-3">2</span>
                        해결 과정 및 솔루션
                    </h2>
                    <div className="bg-primary/5 rounded-2xl p-6 md:p-8 dark:bg-primary/10 border border-primary/10">
                        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium whitespace-pre-line">
                            {portfolio.solution}
                        </p>
                    </div>
                </section>

                {/* 상세 이미지 갤러리 */}
                <ImageGallery images={portfolio.images} title={portfolio.title} />

                {/* 결과/성과 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 text-sm mr-3 dark:bg-green-900/30 dark:text-green-400">3</span>
                        비즈니스 성과
                    </h2>
                    <div className="flex items-start bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                        <p className="text-lg text-gray-800 dark:text-gray-200 font-semibold leading-relaxed whitespace-pre-line">
                            {portfolio.result}
                        </p>
                    </div>
                </section>

            </div>

            <CTASection
                title="비슷한 프로젝트를 준비 중이신가요?"
                description="이 레퍼런스를 바탕으로 어떤 확장이 가능한지 먼저 상담해보세요."
                buttonText="프로젝트 문의하기"
            />
        </article>
    );
}
