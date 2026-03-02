import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: {
        template: "%s | 프리랜서 웹사이트 구축 전문가",
        default: "프리랜서 포트폴리오 | 웹사이트 구축 전문가",
    },
    description: "신뢰할 수 있는 웹사이트 구축. 확실한 프로세스와 결과물로 비즈니스 성장을 돕습니다.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
