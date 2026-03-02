// [Footer] 사업자 정보 및 하단 정책 링크 담당
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Logo & Info */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            WebBuild<span className="text-primary">.Pro</span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            안정적이고 확장 가능한 웹사이트를 구축합니다.
                            성공적인 비즈니스를 위한 든든한 파트너가 되어 드립니다.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                            메뉴
                        </h3>
                        <ul className="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>
                                <Link href="/services" className="hover:text-primary transition-colors">서비스</Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="hover:text-primary transition-colors">포트폴리오</Link>
                            </li>
                            <li>
                                <Link href="/process" className="hover:text-primary transition-colors">진행 방식</Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-primary transition-colors">가격 설정</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">소개</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Business Info (Placeholder) */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                            사업자 정보
                        </h3>
                        <ul className="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>상호명 : (주)웹빌드프로</li>
                            <li>대표명 : 아무개</li>
                            <li>사업자등록번호 : 000-00-00000</li>
                            <li>주소 : 서울특별시 강남구 테헤란로 00, 00층</li>
                            <li>이메일 : contact@example.com</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {currentYear} WebBuild.Pro. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-primary transition-colors">개인정보처리방침</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">이용약관</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
