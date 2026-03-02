// [About] 신뢰 및 브랜딩 요소, 강점 어필 담당
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import { Zap, ShieldCheck, MessageSquare, Wrench } from "lucide-react";

export const metadata: Metadata = {
    title: "만든이 소개 | 강점 및 작업 원칙",
    description: "책임감 있는 커뮤니케이션과 탄탄한 기술력을 바탕으로 작업합니다.",
};

export default function AboutPage() {
    const strengths = [
        {
            name: "완벽한 반응형 & 렌더링 속도",
            description: "Lighthouse 100점에 가까운 최적화와 모바일 우선 방식(Mobile-First) 디자인으로, 어떤 기기에서도 빠르고 쾌적한 화면을 제공합니다.",
            icon: Zap,
        },
        {
            name: "책임 있는 커뮤니케이션",
            description: "고객의 언어로 설명합니다. 어려운 IT 용어 대신 비즈니스 언어로 이야기하며, 응답 지연 없이 24시간 내 빠른 피드백을 원칙으로 합니다.",
            icon: MessageSquare,
        },
        {
            name: "확장 가능한 클린 코드",
            description: "당장 동작하기만 하는 스파게티 코드가 아닙니다. Next.js, React 기반의 컴포넌트화된 코드로 추후 인수인계 및 기능 확장이 용이합니다.",
            icon: ShieldCheck,
        },
        {
            name: "든든한 사후 유지보수",
            description: "프로젝트 오픈 후 버려두지 않습니다. 지속적인 모니터링은 물론, 자체 관리가 가능하도록 매뉴얼(CMS 가이드 등)을 함께 인계해 드립니다.",
            icon: Wrench,
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-950 pt-16 sm:pt-24 pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">

                {/* Profile Section */}
                <section className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="relative aspect-square sm:aspect-auto sm:h-[600px] w-full max-w-md md:max-w-none mx-auto overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                            {/* 프로필 이미지 플레이스홀더 */}
                            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                                <span className="text-gray-400 dark:text-gray-600 font-medium">프로필 사진 영역</span>
                            </div>
                        </div>

                        <div className="lg:pl-8 xl:pl-16">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white mb-6">
                                웹사이트로 고객의 <span className="text-primary">비즈니스 가치</span>를 증명합니다.
                            </h1>
                            <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-8">
                                프론트엔드 개발자 & UI/UX 디자이너
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400">
                                <p>
                                    안녕하세요. 기획부터 디자인, 개발까지 전 과정을 아우르는 풀스택 지향 프론트엔드 개발자입니다.
                                    고객의 추상적인 아이디어를 구체적인 웹 서비스 플랫폼으로 만들어 내는 일에 열정을 가지고 있습니다.
                                </p>
                                <p>
                                    단순히 예쁜 디자인을 넘어, 접근성, SEO 최적화, 그리고 무엇보다 사용자의 편의성을 최우선으로 생각합니다.
                                    "개발 용어를 몰라서 요구사항을 전달하기 막막하다"는 고객님들의 피로도를 줄여드리기 위해,
                                    투명한 소통과 친절한 가이드라인을 제공합니다.
                                </p>
                            </div>
                            <div className="mt-10 flex gap-4">
                                <Link href="/portfolio" className="text-primary font-semibold hover:underline">
                                    저의 작업물 확인하기 →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Strengths / Core Values Section */}
                <section className="mx-auto max-w-7xl mt-32">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">나의 4가지 핵심 경쟁력</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {strengths.map((feature) => (
                            <div key={feature.name} className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-sm ring-1 ring-primary-hover shrink-0">
                                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        {feature.name}
                                    </h3>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mx-auto max-w-7xl mt-32 p-8 sm:p-12 rounded-3xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 text-center">사용 기술 스택</h2>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
                        {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand", "Node.js", "Vercel", "Figma"].map(tech => (
                            <span key={tech} className="px-4 py-2 bg-white dark:bg-gray-900 rounded-full font-medium text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-800">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        안정성이 검증된 모던 프론트엔드 생태계 기술을 주로 활용하여 유지보수를 용이하게 구축합니다.
                    </p>
                </section>

            </div>

            <CTASection
                title="신뢰할 수 있는 개발 파트너"
                description="전문가와 함께 비즈니스에 날개를 달아보세요."
            />
        </div>
    );
}
