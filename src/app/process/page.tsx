// [Process] 작업 진행 방식, 고객 준비사항, 수정 정책 안내 담당
import { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
    title: "프로세스 | 작업 진행 방식",
    description: "투명하고 체계적인 웹사이트 구축 프로세스를 안내합니다.",
};

export default function ProcessPage() {
    const processes = [
        {
            step: "01",
            title: "문의 접수 및 1차 상담",
            desc: "남겨주신 문의 내용을 바탕으로 프로젝트의 목적과 기능 요구사항을 파악합니다. 필요시 비대면 화상 미팅을 통해 구체적인 일정을 조율합니다.",
        },
        {
            step: "02",
            title: "견적서 및 IA 전달",
            desc: "요구사항 분석을 토대로 개발 비용과 일정이 포함된 견적서와 전체 메뉴 구조도(IA, Information Architecture)를 공유합니다.",
        },
        {
            step: "03",
            title: "계약 및 자료 수집",
            desc: "계약 진행 후 본격적인 작업을 위해 로고 파일, 삽입될 텍스트 기획안, 레퍼런스 이미지 등 기초 자료를 요청드립니다.",
        },
        {
            step: "04",
            title: "UI 디자인 및 피드백 (Figma)",
            desc: "수집된 자료를 바탕으로 메인/서브 페이지의 디자인 시안을 Figma로 제작하여 공유합니다. 확인 후 수정 피드백을 반영하여 디자인을 확정합니다.",
        },
        {
            step: "05",
            title: "프론트엔드/백엔드 개발",
            desc: "확정된 디자인을 기반으로 모바일 및 데스크톱 반응형 웹 개발을 진행합니다. 관리자 기능이 있다면 함께 구현됩니다.",
        },
        {
            step: "06",
            title: "테스트 빌드 및 최종 검수",
            desc: "임시 도메인에 개발된 사이트를 업로드하여 고객님과 함께 버튼 오작동, 브라우저 호환성 등을 테스트하고 오류를 수정합니다.",
        },
        {
            step: "07",
            title: "최종 배포 및 호스팅 이전",
            desc: "모든 검수가 완료되면 고객님의 도메인으로 실서버 접속을 오픈하며, 구글 검색 등록(SEO) 신청 구성을 마무리합니다.",
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-950 pt-16 sm:pt-24 pb-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mx-auto max-w-2xl text-center mb-20">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                        <span className="text-primary">실패 없는</span> 프로젝트를 위한<br className="hidden sm:block" />
                        체계적인 프로세스
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        주먹구구식 개발이 아닌 명확한 단계별 검증을 통해 일정 지연과 커뮤니케이션 오해를 방지합니다.
                    </p>
                </div>

                {/* 타임라인 형식 프로세스 */}
                <div className="mx-auto max-w-4xl relative">
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -ml-px"></div>

                    <div className="space-y-12">
                        {processes.map((process, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row items-center justify-between">

                                {/* 왼쪽 콘텐츠 (홀수/짝수 교차를 위해 데스크탑에서 순서 변경) */}
                                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:order-last md:text-left md:pl-12"}`}>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{process.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">{process.desc}</p>
                                </div>

                                {/* 중앙 숫자 마커 */}
                                <div className="absolute left-0 md:left-1/2 w-16 h-16 rounded-full bg-white dark:bg-gray-950 border-4 border-primary flex items-center justify-center -ml-8 text-primary font-bold text-lg shadow-sm z-10 transition-transform hover:scale-110">
                                    {process.step}
                                </div>

                                {/* 빈 공간 맞추기 */}
                                <div className={`hidden md:block w-5/12 ${index % 2 === 0 ? "order-last" : ""}`}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto max-w-4xl mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 고객 준비 사항 */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔔 프로젝트 착수 준비물</h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                            <li className="flex items-start"><span className="mr-2">✓</span> 메뉴 기획안 (엑셀/워드)</li>
                            <li className="flex items-start"><span className="mr-2">✓</span> 사업자등록증 사본 (호스팅 가입용)</li>
                            <li className="flex items-start"><span className="mr-2">✓</span> 디자인 레퍼런스 링크 2~3개</li>
                            <li className="flex items-start"><span className="mr-2">✓</span> 서비스 소개 텍스트 및 사진 원본</li>
                        </ul>
                    </div>

                    {/* 커뮤니케이션 및 수정 정책 */}
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
                        <h3 className="text-xl font-bold text-primary mb-4">✍ 커뮤니케이션 & 수정 정책</h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                            <li className="flex items-start"><span className="text-primary mr-2">•</span> 주 채널: 슬랙(Slack) 또는 이메일</li>
                            <li className="flex items-start"><span className="text-primary mr-2">•</span> 백업 채널: 카카오톡 (긴급 연락망)</li>
                            <li className="flex items-start"><span className="text-primary mr-2">•</span> 디자인 시안 수정: <strong>기본 2회 무상</strong></li>
                            <li className="flex items-start"><span className="text-primary mr-2">•</span> 개발 완료 후 레이아웃/기능 변경 시 <strong>별도 비용 청구</strong></li>
                        </ul>
                    </div>
                </div>

            </div>

            <CTASection
                title="빠르고 정확하게 시작해볼까요?"
                description="프로세스에 동의하신다면 1단계 미팅을 신청해주세요."
            />
        </div>
    );
}
