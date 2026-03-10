// [Contact API] 견적 문의 폼 → 이메일 발송 API Route
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, phone, email, budget, deadline, message } = body;

        // 필수 필드 검증
        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: "이름, 연락처, 프로젝트 내용은 필수 항목입니다." },
                { status: 400 }
            );
        }

        // Nodemailer 트랜스포터 설정 (Gmail SMTP)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        // 이메일 본문 구성
        const htmlContent = `
            <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a1a1a; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                    📩 새 견적 문의가 접수되었습니다
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 12px 8px; font-weight: bold; color: #374151; width: 140px;">이름 / 담당자명</td>
                        <td style="padding: 12px 8px; color: #1f2937;">${name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 12px 8px; font-weight: bold; color: #374151;">연락처</td>
                        <td style="padding: 12px 8px; color: #1f2937;">${phone}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 12px 8px; font-weight: bold; color: #374151;">이메일</td>
                        <td style="padding: 12px 8px; color: #1f2937;">${email || "미입력"}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 12px 8px; font-weight: bold; color: #374151;">예산 범위</td>
                        <td style="padding: 12px 8px; color: #1f2937;">${budget || "미선택"}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 12px 8px; font-weight: bold; color: #374151;">희망 마감일정</td>
                        <td style="padding: 12px 8px; color: #1f2937;">${deadline || "미입력"}</td>
                    </tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">프로젝트 목적 및 필수 기능</h3>
                    <p style="margin: 0; color: #1f2937; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                </div>
                <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
                    이 메일은 홈페이지 견적 문의 폼을 통해 자동 발송되었습니다.
                </p>
            </div>
        `;

        // 이메일 발송
        await transporter.sendMail({
            from: `"웹사이트 문의폼" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email || undefined,
            subject: `[견적문의] ${name}님의 프로젝트 상담 요청`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("이메일 발송 실패:", error);
        return NextResponse.json(
            { error: "이메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
            { status: 500 }
        );
    }
}
