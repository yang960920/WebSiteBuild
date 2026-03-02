// [PortfolioCard] 포트폴리오 카드 UI 및 클릭 이동 담당
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PortfolioMeta {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    thumbnail: string;
}

export default function PortfolioCard({
    slug,
    title,
    summary,
    tags,
    thumbnail,
}: PortfolioMeta) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image
                    src={thumbnail || "/images/placeholder.webp"}
                    alt={`${title} 포트폴리오 썸네일`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground dark:bg-gray-800 dark:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                    <Link href={`/portfolio/${slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {title}
                    </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {summary}
                </p>
                <div className="mt-auto pt-6 flex items-center text-sm font-medium text-primary">
                    프로젝트 상세보기
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </div>
    );
}
