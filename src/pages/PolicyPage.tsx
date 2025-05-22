// /src/pages/PolicyPage.tsx
export default function PolicyPage() {
  return (
    <main className="min-h-screen w-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-20 font-sans overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto text-left px-4">
        <h1 className="text-5xl font-extrabold mb-16 text-center">이용약관</h1>

        <h2 className="text-3xl font-bold my-12">제 1 장 총칙</h2>

        <h3 className="text-xl font-semibold mb-2">제 1 조 (목적)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          본 약관은 STOCKOP(이하 “회사”라 합니다)이 운영하는 웹사이트 ‘cognimosyne’ (www.cognimosyne.com)
          (이하 “웹사이트”라 합니다)를 통해 제공하는 온라인 기반 자막 처리 및 번역 자동화 서비스(이하 “서비스”)의 이용과 관련하여,
          회사와 서비스 이용자 간의 권리, 의무 및 책임을 규정함을 목적으로 합니다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 2 조 (용어의 정의)</h3>
        <p className="mb-4 leading-relaxed text-lg text-gray-300">본 약관에서 사a용하는 용어는 다음과 같이 정의한다.</p>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>
            “웹사이트”란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는
            용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
          </li>
          <li>“이용자”란 “웹사이트”에 접속하여 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
          <li>
            “회원”이라 함은 “웹사이트”에 개인정보를 제공하여 회원등록을 한 자로서, “웹사이트”의 정보를 지속적으로 제공받으며,
            “웹사이트”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
          </li>
          <li>“비회원”이라 함은 회원에 가입하지 않고, “웹사이트”이 제공하는 서비스를 이용하는 자를 말합니다.</li>
          <li>“ID”라 함은 이용자가 회원가입 당시 등록한 사용자 “개인이용문자”를 말합니다.</li>
          <li>“멤버십”이라 함은 회원등록을 한 자로서, 별도의 온/오프라인 상에서 추가 서비스를 제공 받을 수 있는 회원을 말합니다.</li>
          <li>“API Key”란 회사가 제공하는 Open API 서비스 이용을 위하여 회원에게 발급하는 고유 인증 수단을 말합니다.</li>
          <li>“자막”이란 음성이나 영상 콘텐츠로부터 자동 생성 또는 수동 입력된 텍스트 정보를 말하며, 이를 번역하거나 교정하는 것도 포함합니다.</li>
          <li>“미디어 트랜슬레이터(Media Translator)”란 본 서비스에서 제공하는 핵심 기술로, 음성 및 텍스트를 인식하고 이를 다국어로 변환, 생성하는 AI 기반의 언어 처리 기능을 의미합니다.</li>
          <li>“토큰”이란 사용량 기반 요금제를 적용하기 위해 콘텐츠 분석 또는 번역 등의 처리 시 소비되는 디지털 단위로, 회원은 사전 구매 또는 구독을 통해 토큰을 충전하여 사용할 수 있습니다.</li>
          <li>“콘텐츠”란 이용자가 서비스에 업로드하거나 생성한 영상, 오디오, 자막, 번역 결과물 등을 포함하는 디지털 데이터를 말합니다.</li>
          <li>“번역 언어”란 본 서비스에서 지원하는 다국어 자막 번역 대상 언어로, 현재 영어, 일본어, 스페인어 등 다양한 언어를 포함합니다.</li>
          <li>“SEO 키워드”란 자막 또는 콘텐츠로부터 자동 추출된 검색 최적화용 핵심 단어로, 영상 설명 또는 메타데이터에 활용됩니다.</li>
          <li>“에디터”란 이용자가 웹 브라우저 상에서 자막 및 번역 결과를 직접 확인, 수정 및 저장할 수 있도록 제공되는 편집 인터페이스를 말합니다.</li>
          <li>“유료 기능”이란 회사가 별도 비용을 받고 제공하는 프리미엄 서비스로, 고급 번역 품질, API 연동, 확장된 저장 용량 또는 고속 처리 기능 등이 포함됩니다.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">제 3 조 (약관의 공시 및 효력과 변경)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          본 약관은 회원가입 화면에 게시하여 공시하며 회사는 사정변경 및 영업상 중요한 사유가 있을 경우 약관을 변경할 수
          있으며 변경된 약관은 공지사항을 통해 공시한다. 본 약관 및 차후 회사 사정에 따라 변경된 약관은 이용자에게
          공시함으로써 효력을 발생한다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 4 조 (약관 외 준칙)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법, ‘전자상거래등에서의 소비자 보호에
          관한 법률’, ‘약관의 규제에 관한 법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망 이용촉진 등에 관한 법률’,
          ‘소비자보호법’ 등 기타 관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다.
        </p>

        <h2 className="text-3xl font-bold my-12">제 2 장 이용계약</h2>

        <h3 className="text-xl font-semibold mb-2">제 5 조 (이용신청)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          이용신청자가 회원가입 안내에서 본 약관과 개인정보보호정책에 동의하고 등록절차(회사의 소정 양식의 가입 신청서 작성)를 거쳐 ‘확인’ 버튼을 누르면 이용신청을 할 수 있다.
          이용신청자는 반드시 실명과 실제 정보를 사용해야 하며 1개의 생년월일에 대하여 1건의 이용신청을 할 수 있다.
          실명이나 실제 정보를 입력하지 않은 이용자는 법적인 보호를 받을 수 없으며, 서비스 이용에 제한을 받을 수 있다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 6 조 (이용신청의 승낙)</h3>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>회사는 제5조에 따른 이용신청자에 대하여 제2항 및 제3항의 경우를 예외로 하여 서비스 이용을 승낙한다.</li>
          <li>
            회사는 아래 사항에 해당하는 경우에 그 제한사유가 해소될 때까지 승낙을 유보할 수 있다.
            <ul className="list-none pl-6 space-y-1">
              <li>가. 서비스 관련 설비에 여유가 없는 경우</li>
              <li>나. 기술상 지장이 있는 경우</li>
              <li>다. 기타 회사 사정상 필요하다고 인정되는 경우</li>
            </ul>
          </li>
          <li>
            회사는 아래 사항에 해당하는 경우에 승낙을 하지 않을 수 있다.
            <ul className="list-none pl-6 space-y-1">
              <li>가. 다른 사람의 명의를 사용하여 신청한 경우</li>
              <li>나. 이용자 정보를 허위로 기재하여 신청한 경우</li>
              <li>다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우</li>
              <li>라. 기타 회사가 정한 이용신청 요건이 미비한 경우</li>
            </ul>
          </li>
        </ul>

		<h2 className="text-3xl font-bold my-12">제 3 장 계약 당사자의 의무</h2>

        <h3 className="text-xl font-semibold mb-2">제 7 조 (회사의 의무)</h3>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>회사는 사이트를 안정적이고 지속적으로 운영할 의무가 있다.</li>
          <li>회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정될 경우에는 즉시 처리해야 한다. 단, 즉시 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 공지사항 또는 전자우편을 통해 통보해야 한다.</li>
          <li>제1항의 경우 수사상의 목적으로 관계기관 및 정보통신윤리위원회의 요청이 있거나 영장 제시가 있는 경우, 기타 관계 법령에 의한 경우는 예외로 한다.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">제 8 조 (이용자의 의무)</h3>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>이용자는 본 약관 및 회사의 공지사항, 사이트 이용안내 등을 숙지하고 준수해야 하며 기타 회사의 업무에 방해되는 행위를 해서는 안된다.</li>
          <li>이용자는 회사의 사전 승인 없이 본 사이트를 이용해 어떠한 영리행위도 할 수 없다.</li>
          <li>이용자는 본 사이트를 통해 얻는 정보를 회사의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송 및 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없다.</li>
        </ul>

		<h2 className="text-3xl font-bold my-12">제 4 장 서비스의 제공 및 이용</h2>

        <h3 className="text-xl font-semibold mb-2">제 9 조 (서비스 이용)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          이용자는 본 약관의 규정된 사항을 준수해 사이트를 이용한다.<br />
          본 약관에 명시되지 않은 서비스 이용에 관한 사항은 회사가 정해 ‘공지사항’에 게시하거나 또는 별도로 공지하는 내용에 따른다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 10 조 (정보의 제공)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          회사는 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보에 대하여 전자메일이나 서신우편 등의 방법으로 회원에게 정보를 제공할 수 있다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 11 조 (광고게재)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          회사는 서비스의 운용과 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고 등을 게재할 수 있다.<br />
          회사는 사이트에 게재되어 있는 광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래의 결과로서 발생하는 모든 손실 또는 손해에 대해 책임을 지지 않는다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 12 조 (서비스 이용의 제한)</h3>
        <p className="mb-2 leading-relaxed text-lg text-gray-300">본 사이트 이용 및 행위가 다음 각 항에 해당하는 경우 회사는 해당 이용자의 이용을 제한할 수 있다.</p>
        <ul className="list-none pl-6 mb-6 text-lg text-gray-300 space-y-1">
          <li>1. 공공질서 및 미풍양속, 기타 사회질서를 해하는 경우</li>
          <li>2. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된다고 객관적으로 인정되는 경우</li>
          <li>3. 타인의 명예를 손상시키거나 타인의 서비스 이용을 현저히 저해하는 경우</li>
          <li>4. 타인의 의사에 반하는 내용이나 광고성 정보 등을 지속적으로 전송하는 경우</li>
          <li>5. 해킹 및 컴퓨터 바이러스 유포 등으로 서비스의 건전한 운영을 저해하는 경우</li>
          <li>6. 다른 이용자 또는 제3자의 지적재산권을 침해하거나 지적재산권자가 지적 재산권의 침해를 주장할 수 있다고 판단되는 경우</li>
          <li>7. 타인의 아이디 및 비밀번호를 도용한 경우</li>
          <li>8. 기타 관계 법령에 위배되는 경우 및 회사가 이용자로서 부적당하다고 판단한 경우</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">제 13 조 (서비스 제공의 중지)</h3>
        <p className="mb-2 leading-relaxed text-lg text-gray-300">회사는 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부의 제공을 중지할 수 있다.</p>
        <ul className="list-none pl-6 mb-6 text-lg text-gray-300 space-y-1">
          <li>1. 전기통신사업법 상에 규정된 기간통신 사업자 또는 인터넷 망 사업자가 서비스를 중지했을 경우</li>
          <li>2. 정전으로 서비스 제공이 불가능할 경우</li>
          <li>3. 설비의 이전, 보수 또는 공사로 인해 부득이한 경우</li>
          <li>4. 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 어려운 경우</li>
          <li>5. 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">제 14 조 (게시물 관리)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          회사는 건전한 통신문화 정착과 효율적인 사이트 운영을 위하여 이용자가 게시하거나 제공하는 자료가 제12조에 해당한다고 판단되는 경우에 임의로 삭제, 자료이동, 등록거부를 할 수 있다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 15 조 (서비스 이용 책임)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          이용자는 회사에서 권한 있는 사원이 서명한 명시적인 서면에 구체적으로 허용한 경우를 제외하고는 서비스를 이용하여 불법상품을 판매하는 영업활동을 할 수 없으며 특히 해킹, 돈벌기 광고, 음란 사이트를 통한 상업행위, 상용 S/W 불법제공 등을 할 수 없다. 이를 어기고 발생한 영업활동의 결과 및 손실, 관계기관에 의한 구속 등 법적 조치 등에 관해서는 회사가 책임을 지지 않는다.
        </p>

		<h2 className="text-3xl font-bold my-12">제 5 장 재화의 주문 및 결제 관련</h2>

        <h3 className="text-xl font-semibold mb-2">제 16 조 (결제방법)</h3>
        <p className="mb-4 leading-relaxed text-lg text-gray-300">
          ‘회원’은 ‘회사’에서 판매하는 재화에 대하여 ‘선불카드, 직불카드, 신용카드 등의 각종 카드 결제 수단’을 이용하여 결제할 수 있다. 이때 ‘회사’는 이용자의 지급방법에 대하여 재화외 어떠한 명목의 수수료를 추가 징수하지 않는다.
        </p>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>‘회사’는 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 한다. 주문확인에 대한 내용은 해당게시판에서 확인 할 수 있다.</li>
          <li>수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 ‘회사’는 배송전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리한다. 다만 이미 대금을 지불한 경우에는 제18조의 ‘반품규정’을 따른다.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">제 17 조 (디지털 서비스 제공 정책)</h3>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
        <li>‘회사’는 이용자가 서비스 이용 요금 결제를 완료한 즉시, 해당 디지털 서비스(자막 생성, 번역, 편집 등)를 지체 없이 제공할 수 있도록 시스템을 운영합니다.</li>
        <li>일부 기능은 처리량 제한 또는 AI 처리 시간에 따라 일정 지연이 발생할 수 있으며, 이 경우 ‘회사’는 이용자에게 해당 사유를 사전 안내합니다.</li>
        <li>서비스 제공 과정에서 불가피한 시스템 점검, 서버 장애 등이 발생할 경우 회사는 지체 없이 이를 공지하고 서비스 제공 중단 기간을 최소화하기 위해 최선을 다합니다.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">제 18 조 (취소 및 반품 환불 규정)</h3>
        <p className="mb-4 leading-relaxed text-lg text-gray-300">
          ‘회사’는 이용자가 구매 신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 한다.
        </p>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>재화가 발송 되기전 이용자가 결제를 취소할 경우 ‘회사’는 해당 주문건을 취소 처리하고 카드결제 승인을 취소한다.</li>
          <li>재화가 발송 된 이후 결제 취소는 불가하다. 단, ‘회사’의 부주의 ‘배송’상의 문제로 인한 재화의 파손, 변질의 경우 ‘회사’는 이용자에게 구매 금액의 반품 및 환불 조취 및 교환 조취를 취한다.</li>
        </ul>

		<h2 className="text-3xl font-bold my-12">제 6 장 기타</h2>

        <h3 className="text-xl font-semibold mb-2">제 19 조 (면책 및 손해배상)</h3>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 회사의 서비스 제공 책임이 면제된다.</li>
          <li>회사는 이용자간 또는 이용자와 제3자간의 상호거래 관계에서 발생되는 결과에 대하여 어떠한 책임도 부담하지 않는다.</li>
          <li>회사는 이용자가 게시판에 게재한 정보, 자료, 내용 등에 관하여 사실의 정확성, 신뢰도 등에 어떠한 책임도 부담하지 않으며 이용자는 본인의 책임 아래 본 사이트를 이용해야 한다.</li>
          <li>이용자가 게시 또는 전송한 자료 등에 관하여 손해가 발생하거나 자료의 취사선택, 기타 무료로 제공되는 서비스 이용과 관련해 어떠한 불이익이 발생하더라도 이에 대한 모든 책임은 이용자에게 있다.</li>
          <li>아이디와 비밀번호의 관리 및 이용자의 부주의로 인하여 발생되는 손해 또는 제3자에 의한 부정사용 등에 대한 책임은 이용자에게 있다.</li>
          <li>이용자가 본 약관의 규정을 위반함으로써 회사에 손해가 발생하는 경우 이 약관을 위반한 이용자는 회사에 발생한 모든 손해를 배상해야 하며 동 손해로부터 회사를 면책시켜야 한다.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">제 20 조 (개인신용정보 제공 및 활용에 대한 동의서)</h3>
        <p className="mb-6 leading-relaxed text-lg text-gray-300">
          회사가 회원 가입과 관련해 취득한 개인 신용 정보는 신용정보의 이용 및 보호에 관한 법률 제23조의 규정에 따라 타인에게 제공 및 활용 시 이용자의 동의를 얻어야 한다. 이용자의 동의는 회사가 회원으로 가입한 이용자의 신용정보를 신용정보기관, 신용정보업자 및 기타 이용자 등에게 제공해 이용자의 신용을 판단하기 위한 자료로서 활용하거나 공공기관에서 정책자료로 활용하는데 동의하는 것으로 간주한다.
        </p>

        <h3 className="text-xl font-semibold mb-2">제 21 조 (분쟁의 해결)</h3>
        <ul className="list-decimal pl-6 mb-6 text-lg text-gray-300 space-y-2">
          <li>회사와 이용자는 본 사이트 이용과 관련해 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 해야 한다.</li>
          <li>제1항의 규정에도 불구하고 동 분쟁으로 인하여 소송이 제기될 경우 동 소송은 회사의 본사 소재지를 관할하는 법원의 관할로 본다.</li>
        </ul>

		<p className="text-sm text-gray-500 mt-16">&lt;부칙&gt;<br />본 약관은 2025년 05월 22일부터 적용한다.</p>
      </div>
    </main>
  );
}
