// [Terms] 서비스 이용약관 조항 담당 (법적 고지)
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "이용약관",
    description: "웹빌드프로 서비스 이용을 위한 기본 약관입니다.",
};

export default function TermsPage() {
    return (
        <div className="bg-white dark:bg-gray-950 pt-16 sm:pt-24 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white mb-8">
                    이용약관
                </h1>

                <div className="prose prose-base sm:prose-lg dark:prose-invert text-gray-600 dark:text-gray-400 max-w-none">
                    <p className="text-sm font-medium">제정일: 2024년 00월 00일</p>
                    <div className="p-4 bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-md mt-6">
                        본 페이지는 개발 외주 계약 시 활용될 수 있는 기본 이용약관(가이드)입니다.
                        실제 계약 시 작성될 계약서의 조항과 상충되는 부분이 있다면, 최종 날인된 별도 계약서의 내용이 우선합니다.
                    </div>

                    <h3 className="text-gray-900 dark:text-white mt-10">제1조 (목적)</h3>
                    <p>
                        본 약관은 (주)웹빌드프로(이하 "공급자")와 서비스를 이용하는 고객(이하 "이용자") 사이에
                        웹사이트 제작, 개발, 유지보수 등에 관한 기본적인 권리와 의무, 책임사항 및 기본적인
                        진행 절차를 규정함을 목적으로 합니다.
                    </p>

                    <h3 className="text-gray-900 dark:text-white mt-10">제2조 (계약의 성립과 서비스 성격)</h3>
                    <ol>
                        <li>서비스 이용계약은 이용자가 공급자의 견적서 및 제안서를 승낙하고 상호 날인된 계약서 작성 또는 계약금 입금 완료 시 성립됩니다.</li>
                        <li>본 서비스는 '도급계약'에 준하여 진행되며, 공급자는 계약된 범위 내에서 최선의 산출물을 제공할 의무를 가집니다.</li>
                    </ol>

                    <h3 className="text-gray-900 dark:text-white mt-10">제3조 (자료의 제공 및 협조)</h3>
                    <p>
                        이용자는 원활한 업무 진행을 위해 제작 기간 중 공급자가 요청하는 자료(로고, 이미지 원본, 텍스트 원고 등)를
                        성실하게 제공하여야 합니다. 자료 제공 지연으로 발생한 일정 변경은 공급자의 책임으로 묻지 않습니다.
                    </p>

                    <h3 className="text-gray-900 dark:text-white mt-10">제4조 (수정 및 추가 비용 범위)</h3>
                    <ol>
                        <li>각 진행 단계별(기획, 디자인, 퍼블리싱 등) 디자인/구조 수정은 사전에 협의된 횟수(예: 2회) 내에서 무상으로 제공됩니다.</li>
                        <li>범위를 초과하거나, 개발이 완료된 이후 발생한 근본적인 로직/구조 변경 요청은 별도의 인건비가 청구될 수 있습니다.</li>
                    </ol>

                    <h3 className="text-gray-900 dark:text-white mt-10">제5조 (저작권 및 소유권)</h3>
                    <ol>
                        <li>최종 제공된 작업물(소스코드, 디자인 파일 등)의 저작권과 소유권은 잔금이 전액 결제된 시점부터 이용자에게 귀속됩니다.</li>
                        <li>단, 공급자는 해당 작업물을 자사의 포트폴리오 용도로 활용할 수 있습니다. (이용자의 영업비밀은 제외)</li>
                    </ol>

                    <h3 className="text-gray-900 dark:text-white mt-10">제6조 (면책 조항)</h3>
                    <p>
                        공급자는 천재지변, 파업, 통신장애 등 불가항력적인 사유로 인하여 서비스를 제공할 수 없는 경우에는
                        서비스 제공에 관한 책임이 면제됩니다. 또한, 이용자가 제공한 소스(이미지, 폰트 등)로 인해 제3자와 발생한
                        저작권 분쟁에 대하여 공급자는 책임을 지지 않습니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
