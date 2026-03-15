import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from "next/cache"

export async function initDb() {
    await sql`
    CREATE TABLE IF NOT EXISTS portfolios (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      summary TEXT DEFAULT '',
      tags TEXT[] DEFAULT '{}',
      role TEXT DEFAULT '',
      period TEXT DEFAULT '',
      stack TEXT[] DEFAULT '{}',
      thumbnail TEXT DEFAULT '',
      images TEXT[] DEFAULT '{}',
      problem TEXT DEFAULT '',
      solution TEXT DEFAULT '',
      result TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `
}

export type Portfolio = {
    id?: number
    slug: string
    title: string
    summary: string
    tags: string[]
    role: string
    period: string
    stack: string[]
    thumbnail: string
    images: string[]
    problem: string
    solution: string
    result: string
}

export async function getAllPortfolios(): Promise<Portfolio[]> {
    noStore()
    const { rows } = await sql`SELECT * FROM portfolios ORDER BY created_at DESC`
    return rows as Portfolio[]
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
    noStore()
    const { rows } = await sql`SELECT * FROM portfolios WHERE slug = ${slug} LIMIT 1`
    return (rows[0] as Portfolio) || null
}

export async function createPortfolio(data: Omit<Portfolio, "id">): Promise<Portfolio> {
    const { rows } = await sql`
    INSERT INTO portfolios (slug, title, summary, tags, role, period, stack, thumbnail, images, problem, solution, result)
    VALUES (
      ${data.slug}, ${data.title}, ${data.summary},
      ${data.tags as unknown as string}, ${data.role}, ${data.period},
      ${data.stack as unknown as string}, ${data.thumbnail},
      ${data.images as unknown as string}, ${data.problem},
      ${data.solution}, ${data.result}
    )
    RETURNING *
  `
    return rows[0] as Portfolio
}

export async function updatePortfolio(slug: string, data: Partial<Portfolio>): Promise<Portfolio> {
    const { rows } = await sql`
    UPDATE portfolios SET
      title = COALESCE(${data.title}, title),
      summary = COALESCE(${data.summary}, summary),
      tags = COALESCE(${data.tags as unknown as string}, tags),
      role = COALESCE(${data.role}, role),
      period = COALESCE(${data.period}, period),
      stack = COALESCE(${data.stack as unknown as string}, stack),
      thumbnail = COALESCE(${data.thumbnail}, thumbnail),
      images = COALESCE(${data.images as unknown as string}, images),
      problem = COALESCE(${data.problem}, problem),
      solution = COALESCE(${data.solution}, solution),
      result = COALESCE(${data.result}, result)
    WHERE slug = ${slug}
    RETURNING *
  `
    return rows[0] as Portfolio
}

export async function deletePortfolio(slug: string): Promise<void> {
    await sql`DELETE FROM portfolios WHERE slug = ${slug}`
}
