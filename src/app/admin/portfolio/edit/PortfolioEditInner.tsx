"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Upload, X, Loader2, ImageIcon } from "lucide-react"

type PortfolioForm = {
    slug: string
    title: string
    summary: string
    tags: string
    role: string
    period: string
    stack: string
    thumbnail: string       // blob URL
    images: string[]        // blob URL 배열
    problem: string
    solution: string
    result: string
}

const emptyForm: PortfolioForm = {
    slug: "", title: "", summary: "", tags: "", role: "",
    period: "", stack: "", thumbnail: "", images: [],
    problem: "", solution: "", result: "",
}

// ─────────────────────────────────────────────
// 단일 파일을 /api/upload 에 업로드하고 URL 반환
// ─────────────────────────────────────────────
async function uploadFile(file: File): Promise<string> {
    const fd = new FormData()
    fd.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: fd })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "업로드 실패")
    }
    const { url } = await res.json()
    return url
}

export default function PortfolioEditInner() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const editSlug = searchParams.get("slug")
    const isEdit = !!editSlug

    const [form, setForm] = useState<PortfolioForm>(emptyForm)
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(isEdit)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    // 업로드 진행 상태
    const [thumbUploading, setThumbUploading] = useState(false)
    const [imagesUploading, setImagesUploading] = useState(false)
    const [uploadingCount, setUploadingCount] = useState(0)

    const thumbInputRef = useRef<HTMLInputElement>(null)
    const imagesInputRef = useRef<HTMLInputElement>(null)

    // ── 기존 데이터 로드 (수정 모드) ──
    useEffect(() => {
        if (!editSlug) return
        const load = async () => {
            try {
                const res = await fetch(`/api/portfolio/${editSlug}`)
                const data = await res.json()
                setForm({
                    slug: data.slug || "",
                    title: data.title || "",
                    summary: data.summary || "",
                    tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
                    role: data.role || "",
                    period: data.period || "",
                    stack: Array.isArray(data.stack) ? data.stack.join(", ") : "",
                    thumbnail: data.thumbnail || "",
                    images: Array.isArray(data.images) ? data.images : [],
                    problem: data.problem || "",
                    solution: data.solution || "",
                    result: data.result || "",
                })
            } catch {
                setMessage({ type: "error", text: "데이터를 불러오지 못했습니다." })
            } finally {
                setFetchLoading(false)
            }
        }
        load()
    }, [editSlug])

    // ── 일반 텍스트 필드 핸들러 ──
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // ── 썸네일 업로드 ──
    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setThumbUploading(true)
        setMessage(null)
        try {
            const url = await uploadFile(file)
            setForm((prev) => ({ ...prev, thumbnail: url }))
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "썸네일 업로드 실패"
            setMessage({ type: "error", text: msg })
        } finally {
            setThumbUploading(false)
            if (thumbInputRef.current) thumbInputRef.current.value = ""
        }
    }

    // ── 상세 이미지 다중 업로드 ──
    const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return
        setImagesUploading(true)
        setUploadingCount(files.length)
        setMessage(null)
        const results: string[] = []
        let done = 0
        for (const file of files) {
            try {
                const url = await uploadFile(file)
                results.push(url)
            } catch {
                // 실패한 파일은 건너뜀
            }
            done++
            setUploadingCount(files.length - done)
        }
        setForm((prev) => ({ ...prev, images: [...prev.images, ...results] }))
        setImagesUploading(false)
        if (imagesInputRef.current) imagesInputRef.current.value = ""
    }

    // ── 상세 이미지 개별 삭제 ──
    const removeImage = (idx: number) => {
        setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
    }

    // ── 폼 제출 ──
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const payload = {
            slug: form.slug.trim(),
            title: form.title.trim(),
            summary: form.summary.trim(),
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            role: form.role.trim(),
            period: form.period.trim(),
            stack: form.stack.split(",").map((t) => t.trim()).filter(Boolean),
            thumbnail: form.thumbnail,
            images: form.images,
            problem: form.problem.trim(),
            solution: form.solution.trim(),
            result: form.result.trim(),
        }

        try {
            const res = await fetch(
                isEdit ? `/api/portfolio/${editSlug}` : "/api/portfolio",
                {
                    method: isEdit ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            )
            if (res.ok) {
                setMessage({ type: "success", text: isEdit ? "수정이 완료되었습니다." : "새 포트폴리오가 등록되었습니다." })
                setTimeout(() => router.push("/admin/dashboard"), 1500)
            } else {
                const err = await res.json()
                throw new Error(err.error || "Unknown error")
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "저장 중 오류가 발생했습니다."
            setMessage({ type: "error", text: msg })
        } finally {
            setLoading(false)
        }
    }

    if (fetchLoading) {
        return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">로딩 중...</div>
    }

    const textFields: { name: keyof PortfolioForm; label: string; type?: "textarea"; placeholder?: string }[] = [
        { name: "slug", label: "Slug (고유키, 영문 소문자/하이픈)", placeholder: "my-project-slug" },
        { name: "title", label: "프로젝트 제목" },
        { name: "summary", label: "요약 설명", type: "textarea" },
        { name: "tags", label: "태그 (쉼표로 구분)", placeholder: "기획, 디자인, 프론트엔드" },
        { name: "role", label: "역할" },
        { name: "period", label: "기간", placeholder: "2024.01 - 2024.03 (8주)" },
        { name: "stack", label: "기술 스택 (쉼표로 구분)", placeholder: "Next.js, Tailwind CSS" },
        { name: "problem", label: "문제 상황", type: "textarea" },
        { name: "solution", label: "해결 방안", type: "textarea" },
        { name: "result", label: "결과물/성과", type: "textarea" },
    ]

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4">
                <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-xl font-bold">{isEdit ? "포트폴리오 수정" : "새 포트폴리오 추가"}</h1>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-10">
                {message && (
                    <div className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${message.type === "success" ? "bg-green-900/50 text-green-300 border border-green-700" : "bg-red-900/50 text-red-300 border border-red-700"}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ── 일반 텍스트 필드들 ── */}
                    {textFields.map(({ name, label, type, placeholder }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                            {type === "textarea" ? (
                                <textarea
                                    name={name}
                                    value={form[name] as string}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    rows={4}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={name}
                                    value={form[name] as string}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    disabled={isEdit && name === "slug"}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            )}
                        </div>
                    ))}

                    {/* ── 썸네일 업로드 ── */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            썸네일 이미지
                            <span className="ml-2 text-xs text-gray-500 font-normal">JPG, PNG, WebP — 최대 50MB</span>
                        </label>

                        {/* 미리보기 */}
                        {form.thumbnail && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700 mb-3">
                                <Image
                                    src={form.thumbnail}
                                    alt="썸네일 미리보기"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <button
                                    type="button"
                                    onClick={() => setForm((p) => ({ ...p, thumbnail: "" }))}
                                    className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 rounded-full p-1 transition-colors"
                                    title="삭제"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* 업로드 버튼 */}
                        <button
                            type="button"
                            onClick={() => thumbInputRef.current?.click()}
                            disabled={thumbUploading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 border border-dashed border-gray-600 hover:border-blue-500 hover:bg-gray-700 text-gray-400 hover:text-white text-sm transition-all disabled:opacity-60 w-full justify-center"
                        >
                            {thumbUploading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> 업로드 중...</>
                            ) : (
                                <><Upload className="w-4 h-4" /> {form.thumbnail ? "다른 이미지로 교체" : "이미지 파일 선택"}</>
                            )}
                        </button>
                        <input
                            ref={thumbInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleThumbnailChange}
                        />
                    </div>

                    {/* ── 상세 이미지 다중 업로드 ── */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            상세 이미지
                            <span className="ml-2 text-xs text-gray-500 font-normal">여러 장 선택 가능 — 각 최대 50MB</span>
                        </label>

                        {/* 업로드된 이미지 목록 */}
                        {form.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {form.images.map((url, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700 group">
                                        <Image
                                            src={url}
                                            alt={`상세 이미지 ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                                            title="삭제"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 rounded px-1.5 py-0.5 text-xs text-gray-300">
                                            {idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 다중 업로드 버튼 */}
                        <button
                            type="button"
                            onClick={() => imagesInputRef.current?.click()}
                            disabled={imagesUploading}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 border border-dashed border-gray-600 hover:border-blue-500 hover:bg-gray-700 text-gray-400 hover:text-white text-sm transition-all disabled:opacity-60 w-full justify-center"
                        >
                            {imagesUploading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> {uploadingCount}장 업로드 중...</>
                            ) : (
                                <><ImageIcon className="w-4 h-4" /> 이미지 추가 (여러 장 선택 가능)</>
                            )}
                        </button>
                        <input
                            ref={imagesInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImagesChange}
                        />
                    </div>

                    {/* ── 저장 / 취소 버튼 ── */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading || thumbUploading || imagesUploading}
                            className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-60"
                        >
                            {loading ? "저장 중..." : isEdit ? "수정 완료" : "등록하기"}
                        </button>
                        <Link
                            href="/admin/dashboard"
                            className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors text-center"
                        >
                            취소
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    )
}
