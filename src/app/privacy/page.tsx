// [Privacy] 개인정보처리방침 내용 담당 (법적 고지)
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "개인정보처리방침",
    description: "웹빌드프로의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
    return (
        <div className="bg-white dark:bg-gray-950 pt-16 sm:pt-24 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white mb-8">
                    개인정보처리방침
                </h1>

                <div className="prose prose-base sm:prose-lg dark:prose-invert text-gray-600 dark:text-gray-400 max-w-none">
                    <p>
                        본 방침은 (주)웹빌드프로(이하 "회사")가 제공하는 서비스 이용에 수반되는 개인정보 침해를 예방하고
                        안전하게 보호하기 위한 지침입니다. (이하 본문 내용은 회사의 정책에 맞게 수정하여 사용하시기 바랍니다.)
                    </p>

                    <h3 className="text-gray-900 dark:text-white mt-10">1. 개인정보의 수집 및 이용 목적</h3>
                    <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
                    <ul>
                        <li>견적 문의 확인 및 상담 의사 타진</li>
                        <li>서비스 제공에 관한 계약 이행 및 요금 정산</li>
                        <li>마케팅 및 광고에의 활용 (선택적)</li>
                    </ul>

                    <h3 className="text-gray-900 dark:text-white mt-10">2. 수집하는 개인정보의 항목</h3>
                    <p>회사는 견적 문의 및 상담을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                    <ul>
                        <li>필수항목: 이름(또는 담당자명), 연락처, 프로젝트 관련 정보</li>
                        <li>선택항목: 이메일</li>
                        <li>자동수집항목: 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 등</li>
                    </ul>

                    <h3 className="text-gray-900 dark:text-white mt-10">3. 개인정보의 보유 및 이용기간</h3>
                    <p>
                        원칙적으로, 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                        단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관련 법령에서 정한 일정한 기간 동안
                        회원정보를 보관합니다.
                    </p>
                    <ul>
                        <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
                        <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
                        <li>문의 내용 및 상담 이력: 3년 (회사 내부 방침)</li>
                    </ul>

                    <h3 className="text-gray-900 dark:text-white mt-10">4. 개인정보의 파기절차 및 방법</h3>
                    <p>
                        회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
                        전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
                    </p>

                    <h3 className="text-gray-900 dark:text-white mt-10">5. 개인정보 제공 (제3자 제공 여부)</h3>
                    <p>
                        회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 법령의 규정에 의거하거나,
                        수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다.
                    </p>

                    <h3 className="text-gray-900 dark:text-white mt-10">6. 문의처</h3>
                    <p>
                        개인정보 보호책임자 또는 담당부서로 연락하시면 신속하게 답변 드리겠습니다.<br />
                        - 이메일: privacy@example.com (실제 이메일로 변경 요망)<br />
                        - 연락처: 010-0000-0000
                    </p>
                </div>
            </div>
        </div>
    );
}
