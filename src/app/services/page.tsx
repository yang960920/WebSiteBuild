// [Services] 제공하는 서비스, 패키지 상세 안내, 제외 항목 담당
import { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
    title: "서비스 소개 | 패키지 및 혜택",
    description: "합리적이고 투명한 웹사이트 제작 서비스 패키지를 소개합니다.",
};

export default function ServicesPage() {
    return (
        <div className="bg-white dark:bg-gray-950 pt-16 sm:pt-24 pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mx-auto max-w-3xl text-center mb-20">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                        비즈니스 스케일에 맞춘 <br className="hidden sm:block" />
                        <span className="text-primary">최적의 패키지 </span>제공
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 text-balance">
                        불필요한 기능 추가로 비용을 높이지 않습니다. 현재의 목적과 예산에 가장 알맞은 구축 범위를 투명하게 제안해 드립니다.
                    </p>
                </div>

                {/* 패키지 상세 테이블 형식 */}
                <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
                        {/* Starter */}
                        <div className="p-8 sm:p-10 bg-white dark:bg-gray-950">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-gray-800">스타터 (원페이지 랜딩)</h3>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">단일 상품, 개인 브랜딩, 초기 이벤트 페이지 구축에 이상적입니다.</p>
                            <ul className="mt-8 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 반응형 원페이지 스크롤</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 메인 배너 + 소개 + 기능 + 문의폼 섹션</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 이메일/카카오톡 링크 연동</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 기본 SEO 및 오픈그래프 설정</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 모던 템플릿 기반 커스텀 2회</li>
                                <li className="flex items-start text-gray-400 dark:text-gray-500 line-through"><span className="mr-2">&nbsp;</span> 관리자 페이지(CMS) 제공</li>
                            </ul>
                        </div>
                        {/* Business */}
                        <div className="p-8 sm:p-10 bg-gray-50/50 dark:bg-gray-900/50 relative">
                            <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1 text-xs font-bold text-white tracking-wider">가장 인기</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white pb-4 border-b text-primary border-primary/20">비즈니스 (다중 포트폴리오형)</h3>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">신뢰감 있는 기업 정보 전달과 업로드할 자료가 많은 분께 추천합니다.</p>
                            <ul className="mt-8 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 5~10 페이지 이내의 컴포넌트 구조</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 공지사항 / 갤러리 게시판 기능</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 커스텀 디자인 시안(Figma) 제공 2종</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> Google Analytics 행동 분석 연결</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 초고속 이미지/폰트/LCP 성능 최적화</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> Headless CMS 기반 콘텐츠 자체 수정 지원</li>
                            </ul>
                        </div>
                        {/* Premium */}
                        <div className="p-8 sm:p-10 bg-white dark:bg-gray-950">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-gray-800">프리미엄 (맞춤형 플랫폼)</h3>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">결제나 회원 인증 등 복잡한 비즈니스 로직이 들어가는 서비스형 상품입니다.</p>
                            <ul className="mt-8 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 로그인 / Oauth 소셜 가입 지원</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 맞춤형 대시보드 어드민 개발</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 토스페이먼츠 등 결제 모듈 연동</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 외부 API 데이터 매시업 기능</li>
                                <li className="flex items-start"><span className="text-primary mr-2">✔</span> 유지보수 프라이어리티 서비스 제공</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 제외 항목 및 유의사항 */}
                <div className="mx-auto max-w-4xl mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📌 기본 제외 항목 및 별도 비용</h2>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 space-y-4">
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            성공적인 프로젝트를 위해 견적 외 발생할 수 있는 별도 비용 사항을 투명하게 안내합니다. 아래 항목들은 사전에 합의되거나 고객이 자체적으로 준비해주셔야 합니다.
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li><strong>브랜드 에셋:</strong> 로고(CI/BI) 기획 및 디자인 작업은 웹 제작 범위에 포함되지 않습니다.</li>
                            <li><strong>콘텐츠 저작:</strong> 사이트에 들어가는 텍스트 기획안, 카피라이팅, 원본 사진 촬영은 고객사에서 제공해주셔야 합니다. (무료 스톡 이미지 대체는 가능)</li>
                            <li><strong>서버/도메인 유지비:</strong> 구입비용 및 플랫폼 월 결제료는 고객 소유를 원칙으로 하여 고객사 계정으로 직접 결제합니다.</li>
                            <li><strong>다국어 추가:</strong> 언어 옵션 1개 추가 시, 페이지번역 컴포넌트 구성 비용이 패키지 외 별도 청구됩니다.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <CTASection
                title="나에게 맞는 서비스가 고민된다면?"
                description="요구사항에 맞춘 최적의 하이브리드 제안을 드립니다. 무료 상담을 받아보세요."
            />
        </div>
    );
}
