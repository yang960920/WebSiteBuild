"use client"

import { useEffect, useState, useCallback } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Pencil, Trash2, PlusCircle, LogOut } from "lucide-react"

type Portfolio = {
    id: number
    slug: string
    title: string
    summary: string
    tags: string[]
}

export default function AdminDashboard() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingSlug, setDeletingSlug] = useState<string | null>(null)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const fetchPortfolios = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/portfolio")
            const data = await res.json()
            if (!res.ok || !Array.isArray(data)) {
                throw new Error(data?.error || "서버 오류가 발생했습니다.")
            }
            setPortfolios(data)
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "포트폴리오 목록을 불러오지 못했습니다."
            setMessage({ type: "error", text: msg })
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPortfolios()
    }, [fetchPortfolios])

    const handleDelete = async (slug: string, title: string) => {
        if (!confirm(`"${title}" 포트폴리오를 삭제하시겠습니까?`)) return
        setDeletingSlug(slug)
        try {
            const res = await fetch(`/api/portfolio/${slug}`, { method: "DELETE" })
            if (res.ok) {
                setMessage({ type: "success", text: `"${title}"이(가) 삭제되었습니다.` })
                setPortfolios((prev) => prev.filter((p) => p.slug !== slug))
            } else {
                throw new Error()
            }
        } catch {
            setMessage({ type: "error", text: "삭제 중 오류가 발생했습니다." })
        } finally {
            setDeletingSlug(null)
            setTimeout(() => setMessage(null), 4000)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Top Bar */}
            <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">🛠 포트폴리오 관리자</h1>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    로그아웃
                </button>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-10">
                {/* Notice Banner */}
                {message && (
                    <div className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${message.type === "success" ? "bg-green-900/50 text-green-300 border border-green-700" : "bg-red-900/50 text-red-300 border border-red-700"}`}>
                        {message.text}
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">포트폴리오 목록</h2>
                        <p className="text-sm text-gray-400 mt-1">총 {portfolios.length}개의 프로젝트</p>
                    </div>
                    <Link
                        href="/admin/portfolio/edit"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" />
                        새 포트폴리오 추가
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">로딩 중...</div>
                ) : portfolios.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg mb-2">등록된 포트폴리오가 없습니다.</p>
                        <p className="text-sm">위의 &quot;새 포트폴리오 추가&quot; 버튼으로 추가해 보세요.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {portfolios.map((p) => (
                            <div
                                key={p.slug}
                                className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-white truncate">{p.title}</h3>
                                    <p className="text-sm text-gray-400 truncate mt-0.5">{p.summary}</p>
                                    {p.tags && (
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {p.tags.slice(0, 4).map((tag) => (
                                                <span key={tag} className="text-xs bg-gray-800 border border-gray-700 rounded-full px-2 py-0.5 text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Link
                                        href={`/admin/portfolio/edit?slug=${p.slug}`}
                                        className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-blue-400 transition-colors"
                                        title="수정"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(p.slug, p.title)}
                                        disabled={deletingSlug === p.slug}
                                        className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                                        title="삭제"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
