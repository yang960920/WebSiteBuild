import { NextRequest, NextResponse } from "next/server"
import { getPortfolioBySlug, updatePortfolio, deletePortfolio, initDb } from "@/lib/db"

type Params = { params: { slug: string } }

export async function GET(_req: NextRequest, { params }: Params) {
    try {
        await initDb()
        const portfolio = await getPortfolioBySlug(params.slug)
        if (!portfolio) return NextResponse.json({ error: "Not found" }, { status: 404 })
        return NextResponse.json(portfolio)
    } catch (error) {
        console.error("GET /api/portfolio/[slug] error:", error)
        return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        await initDb()
        const body = await req.json()
        const portfolio = await updatePortfolio(params.slug, body)
        return NextResponse.json(portfolio)
    } catch (error) {
        console.error("PUT /api/portfolio/[slug] error:", error)
        return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 })
    }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    try {
        await initDb()
        await deletePortfolio(params.slug)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("DELETE /api/portfolio/[slug] error:", error)
        return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 })
    }
}
