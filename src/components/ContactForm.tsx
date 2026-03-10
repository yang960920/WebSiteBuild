// [ContactForm] 리드 수집을 위한 문의 폼 UI 및 필수 필드 담당
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            budget: formData.get("budget"),
            deadline: formData.get("deadline"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error || "전송에 실패했습니다.");
            }

            setIsSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setErrorMessage(
                err instanceof Error ? err.message : "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-950 dark:border-gray-800">
            {isSuccess ? (
                <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        문의가 접수되었습니다!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        남겨주신 내용을 꼼꼼히 확인한 후, 24시간 내에 기재해주신 연락처로 회신드리겠습니다.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="text-primary font-medium hover:underline focus:outline-none"
                    >
                        다른 문의 남기기
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* 이름 */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                이름 / 담당자명 <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700"
                                    placeholder="홍길동"
                                />
                            </div>
                        </div>

                        {/* 연락처 */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                연락처 <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    required
                                    className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700"
                                    placeholder="010-0000-0000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* 이메일 */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                이메일 (선택)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700"
                                    placeholder="example@email.com"
                                />
                            </div>
                        </div>

                        {/* 예산 */}
                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                예산 범위
                            </label>
                            <div className="mt-2 text-gray-900 dark:text-gray-100">
                                <select
                                    id="budget"
                                    name="budget"
                                    className="block w-full rounded-md border-0 py-2.5 px-3.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-white dark:bg-gray-900 dark:ring-gray-700"
                                >
                                    <option>300만 원 이하</option>
                                    <option>300만 원 - 500만 원</option>
                                    <option>500만 원 - 1,000만 원</option>
                                    <option>1,000만 원 이상</option>
                                    <option>아직 정해지지 않음 / 상담 필요</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 희망 마감일 */}
                    <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            희망 마감일정
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="deadline"
                                id="deadline"
                                className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700"
                                placeholder="예: 5월 중순까지 필요합니다"
                            />
                        </div>
                    </div>

                    {/* 프로젝트 목적/필요 기능 */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            프로젝트 목적 및 필수 기능, 참고 사이트 <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="block w-full rounded-md border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700"
                                defaultValue={""}
                                placeholder="어떤 목적의 웝사이트가 필요하신가요? 구현하고 싶은 기능과 벤치마킹하는 사이트 링크를 남겨주시면 상담에 큰 도움이 됩니다."
                            />
                        </div>
                    </div>

                    {/* 개인정보 동의 */}
                    <div className="flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="privacy"
                                name="privacy"
                                type="checkbox"
                                required
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="privacy" className="text-gray-600 dark:text-gray-400">
                                문의 처리를 위한 개인정보 수집 및 이용에 동의합니다.{" "}
                                <Link href="/privacy" className="font-semibold text-primary hover:text-primary-hover">
                                    개인정보처리방침 전문 보기
                                </Link>
                            </label>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="rounded-md bg-red-50 dark:bg-red-950 p-4">
                            <p className="text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="block w-full rounded-md bg-primary px-3.5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "전송 중..." : "프로젝트 상담 접수하기"}
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-500">
                            주말/공휴일 제외 24시간 내에 답변을 드립니다.
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
}
