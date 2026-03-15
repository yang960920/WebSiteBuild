"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
    images: string[]
    title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    if (!images || images.length === 0) return null

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const updateScrollButtons = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 4)
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    }, [])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        updateScrollButtons()
        el.addEventListener("scroll", updateScrollButtons, { passive: true })
        window.addEventListener("resize", updateScrollButtons)
        return () => {
            el.removeEventListener("scroll", updateScrollButtons)
            window.removeEventListener("resize", updateScrollButtons)
        }
    }, [updateScrollButtons])

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current
        if (!el) return
        const amount = el.clientWidth * 0.7
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
    }

    // 라이트박스 키보드 네비게이션
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (lightboxIndex === null) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxIndex(null)
            if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
            if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev))
        }
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", handler)
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handler)
        }
    }, [lightboxIndex, images.length])

    return (
        <>
            {/* ── 슬라이드 갤러리 ── */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm mr-3 dark:bg-blue-900/30 dark:text-blue-400">
                        📷
                    </span>
                    프로젝트 상세 이미지
                </h2>

                <div className="relative group/gallery">
                    {/* 좌우 스크롤 버튼 */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700 -ml-4"
                            aria-label="이전 이미지"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                        </button>
                    )}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700 -mr-4"
                            aria-label="다음 이미지"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                        </button>
                    )}

                    {/* 이미지 슬라이드 */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-2"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {images.map((url, idx) => (
                            <button
                                key={idx}
                                onClick={() => setLightboxIndex(idx)}
                                className="relative flex-shrink-0 snap-start rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg group/item cursor-zoom-in"
                                style={{ width: images.length === 1 ? "100%" : "clamp(280px, 45vw, 420px)" }}
                            >
                                <div className="aspect-video relative w-full">
                                    <Image
                                        src={url}
                                        alt={`${title} 상세 이미지 ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover/item:scale-105"
                                        sizes="(min-width: 1024px) 420px, 45vw"
                                        unoptimized
                                    />
                                </div>
                                {/* 호버 오버레이 */}
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover/item:opacity-100 transition-opacity bg-black/60 text-white text-xs font-medium rounded-full px-3 py-1.5">
                                        🔍 클릭하여 확대
                                    </span>
                                </div>
                                {/* 번호 표시 */}
                                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs rounded-md px-2 py-0.5">
                                    {idx + 1} / {images.length}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 라이트박스 팝업 ── */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* 닫기 버튼 */}
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                        aria-label="닫기"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* 이미지 번호 */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                        {lightboxIndex + 1} / {images.length}
                    </div>

                    {/* 이전 버튼 */}
                    {lightboxIndex > 0 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setLightboxIndex(lightboxIndex - 1)
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                            aria-label="이전"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                    )}

                    {/* 다음 버튼 */}
                    {lightboxIndex < images.length - 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setLightboxIndex(lightboxIndex + 1)
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                            aria-label="다음"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    )}

                    {/* 확대 이미지 */}
                    <div
                        className="relative w-[90vw] h-[85vh] max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[lightboxIndex]}
                            alt={`${title} 상세 이미지 ${lightboxIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                            unoptimized
                        />
                    </div>

                    {/* 하단 썸네일 네비게이션 */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-sm rounded-xl p-2 max-w-[90vw] overflow-x-auto"
                            style={{ scrollbarWidth: "none" }}
                        >
                            {images.map((url, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setLightboxIndex(idx)
                                    }}
                                    className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${
                                        idx === lightboxIndex
                                            ? "ring-2 ring-white scale-105"
                                            : "opacity-50 hover:opacity-80"
                                    }`}
                                >
                                    <Image
                                        src={url}
                                        alt={`썸네일 ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                        unoptimized
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
