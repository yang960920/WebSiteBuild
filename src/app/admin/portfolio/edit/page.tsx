import { Suspense } from "react"
import PortfolioEditInner from "./PortfolioEditInner"

export default function PortfolioEditPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">로딩 중...</div>}>
            <PortfolioEditInner />
        </Suspense>
    )
}
