// [FAQAccordion] FAQ를 아코디언 UI로 보여주는 컴포넌트 담당
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mx-auto max-w-3xl divide-y divide-gray-200 dark:divide-gray-800">
            {items.map((item, index) => (
                <div key={index} className="py-6">
                    <dt>
                        <button
                            onClick={() => toggleItem(index)}
                            className="flex w-full items-start justify-between text-left text-gray-900 dark:text-gray-100"
                        >
                            <span className="text-base font-semibold leading-7">
                                {item.question}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                                <ChevronDown
                                    className={`h-6 w-6 transform transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                    aria-hidden="true"
                                />
                            </span>
                        </button>
                    </dt>
                    <dd
                        className={`mt-2 pr-12 transition-all duration-200 ease-in-out ${openIndex === index ? "block" : "hidden"
                            }`}
                    >
                        <p className="text-base leading-7 text-gray-600 dark:text-gray-400">
                            {item.answer}
                        </p>
                    </dd>
                </div>
            ))}
        </div>
    );
}
