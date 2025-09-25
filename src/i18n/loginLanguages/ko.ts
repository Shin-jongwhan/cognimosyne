import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "ko",
  label: "한국어",
  strings: {
    login: "로그인",
    signup: "회원가입",
    logout: "로그아웃",
    languageSelectorLabel: "로그인 페이지 언어",
  },
  landingPage: {
    featuresSection: {
      title: "우리가 제공하는 핵심 기능",
      description:
        "영상과 오디오에서 자막을 자동 추출하고, 문맥을 이해하는 AI로 교정한 뒤 필요한 언어로 번역합니다.\nSEO 최적화를 위한 키워드와 메타데이터도 자동으로 생성되고, 직관적인 웹 기반 편집기에서 결과물을 다듬을 수 있습니다.",
      cards: [
        {
          title: "자막 추출",
          description: "모든 영상과 오디오에서 정확한 자막을 추출해 접근성과 편집 효율을 높여줍니다.",
        },
        {
          title: "AI 교정",
          description: "AI 언어 분석으로 자막 문장을 자연스럽고 정확하게 다듬습니다.",
        },
        {
          title: "다국어 번역",
          description: "한 번의 업로드로 여러 언어의 자막을 자동 생성해 글로벌 시청자에게 바로 도달합니다.",
        },
        {
          title: "SEO 키워드 추출",
          description: "콘텐츠 맥락에 맞는 키워드와 메타데이터를 만들어 검색 노출을 극대화합니다.",
        },
        {
          title: "타임라인 편집",
          description: "프레임 단위로 타이밍을 조정하고 텍스트도 빠르게 수정할 수 있습니다.",
        },
        {
          title: "유연한 내보내기",
          description: "완성된 자막을 SRT나 VTT 등 다양한 형식으로 내려받아 배포 채널에 바로 적용하세요.",
        },
      ],
    },
    valuesSection: {
      title: "media translator가 추구하는 가치",
      description:
        "우리는 누구나 손쉽게 고품질 자막과 번역을 제작할 수 있는 세상을 꿈꿉니다.\n콘텐츠 제작자, 교육자, 비즈니스 사용자가 글로벌 시청자에게 더욱 쉽고 정확하게 도달하도록 돕습니다.",
      cards: [
        {
          title: "🎯 목적 중심 자동화",
          description: "기술 구현을 넘어 콘텐츠 본질에 집중한 자동화 기능을 제공합니다.",
        },
        {
          title: "🌍 글로벌 확장",
          description: "완전히 현지화된 자막 경험으로 전 세계 어디든 메시지를 전달합니다.",
        },
        {
          title: "📈 SEO 자동화",
          description: "검색엔진이 좋아하는 메타데이터와 키워드를 자동으로 제안해 노출을 높입니다.",
        },
        {
          title: "🌐 다국어 자막",
          description: "하나의 워크플로로 여러 언어 자막을 생성해 모든 시장을 동시에 공략하세요.",
        },
      ],
    },
    footer: {
      businessLines: [
        "상호: STOCKOP | 대표자명: 신종환",
        "사업자등록번호: 321-26-01416",
        "이메일: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "정책",
      policies: [
        { label: "이용약관", href: "/policy" },
        { label: "개인정보처리방침", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
