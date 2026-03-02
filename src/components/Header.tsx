// [Header] 상단 네비게이션 및 CTA 버튼 담당
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "홈" },
    { href: "/services", label: "서비스" },
    { href: "/portfolio", label: "포트폴리오" },
    { href: "/process", label: "진행 방식" },
    { href: "/pricing", label: "가격" },
    { href: "/about", label: "소개" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/im-logo.png"
                            alt="이음웹스튜디오 Logo"
                            width={160}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:ml-auto md:flex md:space-x-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href
                                ? "text-primary"
                                : "text-gray-600 dark:text-gray-300"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:ml-8 md:flex md:items-center">
                    <Link
                        href="/contact"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        견적 문의
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center md:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">메뉴 열기</span>
                        {isMenuOpen ? (
                            <X className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 pb-3 pt-2 px-2 sm:px-3 text-center">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === link.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="mt-4 block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-hover"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            견적 문의하기
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
