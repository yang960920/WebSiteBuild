// [Contact] 리드(문의) 전환 유도를 위한 폼 페이지 담당
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "문의접수 | 견적 상담",
    description: "프로젝트 요구사항을 남겨주시면 24시간 내에 상담 회신을 드립니다.",
};

export default function ContactPage() {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 pt-16 sm:pt-24 pb-24 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                        시작을 위한 <span className="text-primary">첫 걸음</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 text-balance">
                        여러분의 비즈니스에 필요한 웹사이트가 무엇인지 자유롭게 적어주세요.
                        예산이 확정되지 않았어도 가장 합리적인 가이드라인을 먼저 제시해 드립니다.
                    </p>
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">

                    {/* 연락처 정보 영역 (좌측) */}
                    <div className="lg:col-span-1 space-y-8 lg:mt-8">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                                다이렉트 연락처
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                폼 작성이 번거로우시다면 아래 연락처로 이메일 또는 메시지를 남겨주셔도 무방합니다.
                                편하신 채널로 연락해주세요.
                            </p>
                        </div>

                        <dl className="space-y-6 text-base leading-7 text-gray-600 dark:text-gray-400">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <Mail className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900 dark:hover:text-white" href="mailto:iumwebstudio@gmail.com">
                                        iumwebstudio@gmail.com
                                    </a>
                                    <p className="text-sm mt-1 text-gray-500">24시간 상시 접수</p>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">KakaoTalk</span>
                                    <MessageCircle className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900 dark:hover:text-white" href="#" target="_blank" rel="noreferrer">
                                        카카오톡 오픈채팅 상담
                                    </a>
                                    <p className="text-sm mt-1 text-gray-500">평일 10:00 - 18:00</p>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Address</span>
                                    <MapPin className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    서울특별시 강남구 테헤란로 00, 00층
                                    <p className="text-sm mt-1 text-gray-500">방문 미팅은 사전 예약 필수</p>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* 문의 폼 영역 (우측 2칼럼 차지) */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>

                </div>
            </div>
        </div>
    );
}
