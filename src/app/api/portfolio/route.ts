import { NextRequest, NextResponse } from "next/server"
import { getAllPortfolios, createPortfolio, initDb } from "@/lib/db"

export async function GET() {
    try {
        await initDb()
        const portfolios = await getAllPortfolios()
        return NextResponse.json(portfolios)
    } catch (error) {
        console.error("GET /api/portfolio error:", error)
        return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        await initDb()
        const body = await req.json()

        if (!body.slug || body.slug.trim() === "") {
            return NextResponse.json({ error: "Slug is required" }, { status: 400 })
        }

        const portfolio = await createPortfolio(body)
        return NextResponse.json(portfolio, { status: 201 })
    } catch (error) {
        console.error("POST /api/portfolio error:", error)
        return NextResponse.json({ error: "Failed to create portfolio" }, { status: 500 })
    }
}
