import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "zh-TW",
  label: "繁體中文",
  strings: {
    login: "登入",
    signup: "註冊",
    logout: "登出",
    languageSelectorLabel: "登入頁面語言",
  },
  landingPage: {
    featuresSection: {
      title: "我們提供的核心功能",
      description:
        "我們會自動從影片與音訊中擷取字幕，使用理解語境的AI潤飾，並翻譯成所需語言。\n同時自動產生適合SEO的關鍵字與中繼資料，並提供直覺的瀏覽器編輯器供你微調成果。",
      cards: [
        {
          title: "字幕擷取",
          description:
            "從任何影片或音訊精準擷取字幕，提升可及性並加快編輯流程。",
        },
        {
          title: "AI潤飾",
          description: "讓AI使每一行字幕自然又精確。",
        },
        {
          title: "多語翻譯",
          description:
            "一次上傳即可產生多種語言的字幕，立即觸及全球觀眾。",
        },
        {
          title: "SEO關鍵字",
          description:
            "自動產生符合語境的關鍵字與中繼資料，強化搜尋曝光。",
        },
        {
          title: "時間軸編輯",
          description:
            "以影格等級調整字幕時間，並在同一介面快速修改文字。",
        },
        {
          title: "彈性匯出",
          description:
            "將完成的字幕匯出為SRT或VTT格式，立即套用至各發佈渠道。",
        },
      ],
    },
    valuesSection: {
      title: "media translator追求的價值",
      description:
        "我們相信任何人都能輕鬆製作高品質字幕與翻譯。\n協助創作者、教育工作者與企業清楚而精準地觸及全球受眾。",
      cards: [
        {
          title: "🎯 目標導向自動化",
          description:
            "自動化聚焦內容核心，而不只是技術流程。",
        },
        {
          title: "🌍 全球拓展",
          description:
            "提供在地化的字幕體驗，讓世界各地的觀眾理解你的故事。",
        },
        {
          title: "📈 SEO自動化",
          description:
            "自動呈現搜尋引擎重視的中繼資料與關鍵字，最大化曝光。",
        },
        {
          title: "🌐 多語字幕",
          description:
            "在單一流程中產出多語字幕，同步服務所有市場。",
        },
      ],
    },
    footer: {
      businessLines: [
        "公司名稱：STOCKOP | 代表人：신종환",
        "營業登記號碼：321-26-01416",
        "Email：cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "政策",
      policies: [
        { label: "使用條款", href: "/policy" },
        { label: "隱私權政策", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
