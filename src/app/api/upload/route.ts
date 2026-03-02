import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File | null

        if (!file) {
            return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 })
        }

        // 파일 타입 검사 (이미지만 허용)
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "이미지 파일만 업로드할 수 있습니다." }, { status: 400 })
        }

        // 파일 크기 검사 (50MB 제한)
        const MAX_SIZE = 50 * 1024 * 1024
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "파일 크기는 50MB를 초과할 수 없습니다." }, { status: 400 })
        }

        const filename = `portfolio/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`

        const blob = await put(filename, file, {
            access: "public",
            contentType: file.type,
        })

        return NextResponse.json({ url: blob.url })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "파일 업로드에 실패했습니다." }, { status: 500 })
    }
}
