// [CTASection] 전환 유도 섹션 담당
import Link from "next/link";

interface CTASectionProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

export default function CTASection({
    title = "프로젝트 상담하기",
    description = "비즈니스에 최적화된 웹사이트 구축이 필요하신가요? 지금 바로 여러분의 목표와 예산을 자유롭게 남겨주세요.",
    buttonText = "견적 문의하기",
    buttonLink = "/contact"
}: CTASectionProps) {
    return (
        <section className="bg-primary py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {title}
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">
                    {description}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href={buttonLink}
                        className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
