"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type PortfolioForm = {
    slug: string
    title: string
    summary: string
    tags: string
    role: string
    period: string
    stack: string
    thumbnail: string
    images: string
    problem: string
    solution: string
    result: string
}

const emptyForm: PortfolioForm = {
    slug: "", title: "", summary: "", tags: "", role: "",
    period: "", stack: "", thumbnail: "", images: "", problem: "", solution: "", result: "",
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
                    images: Array.isArray(data.images) ? data.images.join("\n") : "",
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

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
            thumbnail: form.thumbnail.trim(),
            images: form.images.split("\n").map((t) => t.trim()).filter(Boolean),
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

    const fields: { name: keyof PortfolioForm; label: string; type?: "textarea"; placeholder?: string }[] = [
        { name: "slug", label: "Slug (고유키, 영문 소문자/하이픈)", placeholder: "my-project-slug" },
        { name: "title", label: "프로젝트 제목" },
        { name: "summary", label: "요약 설명", type: "textarea" },
        { name: "tags", label: "태그 (쉼표로 구분)", placeholder: "기획, 디자인, 프론트엔드" },
        { name: "role", label: "역할" },
        { name: "period", label: "기간", placeholder: "2024.01 - 2024.03 (8주)" },
        { name: "stack", label: "기술 스택 (쉼표로 구분)", placeholder: "Next.js, Tailwind CSS" },
        { name: "thumbnail", label: "썸네일 이미지 URL", placeholder: "https://..." },
        { name: "images", label: "상세 이미지 URL (줄바꿈으로 구분)", type: "textarea", placeholder: "https://...\nhttps://..." },
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
                    {fields.map(({ name, label, type, placeholder }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                            {type === "textarea" ? (
                                <textarea
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    rows={4}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    disabled={isEdit && name === "slug"}
                                    className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
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
