import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "zh-CN",
  label: "简体中文",
  strings: {
    login: "登录",
    signup: "注册",
    logout: "退出登录",
    languageSelectorLabel: "登录页面语言",
  },
  landingPage: {
    featuresSection: {
      title: "我们的核心功能",
      description:
        "我们会自动从视频和音频中提取字幕，利用理解语境的AI进行润色，并翻译成所需语言。\n同时自动生成适合SEO的关键词和元数据，并提供直观的浏览器编辑器进行最终调整。",
      cards: [
        {
          title: "字幕提取",
          description:
            "从任何视频或音频中精准提取字幕，提升可访问性并加快编辑速度。",
        },
        {
          title: "AI润色",
          description: "让AI使每一句字幕都自然准确。",
        },
        {
          title: "多语言翻译",
          description:
            "一次上传即可生成多语言字幕，立即触达全球受众。",
        },
        {
          title: "SEO关键词",
          description:
            "自动生成符合语境的关键词和元数据，提升搜索曝光。",
        },
        {
          title: "时间轴编辑",
          description:
            "以帧为单位调整字幕时间，并在同一界面快速修改文本。",
        },
        {
          title: "灵活导出",
          description:
            "以SRT或VTT格式下载最终字幕，轻松应用于各类平台。",
        },
      ],
    },
    valuesSection: {
      title: "media translator的价值愿景",
      description:
        "我们相信任何人都能轻松制作高质量的字幕和翻译。\n帮助创作者、教育者和企业以更清晰准确的方式触达全球观众。",
      cards: [
        {
          title: "🎯 目标导向自动化",
          description:
            "自动化聚焦内容核心，而不仅仅是技术步骤。",
        },
        {
          title: "🌍 全球覆盖扩展",
          description:
            "提供本地化字幕体验，让世界各地的观众理解您的故事。",
        },
        {
          title: "📈 SEO自动化",
          description:
            "自动呈现搜索引擎关注的元数据和关键词，最大化曝光。",
        },
        {
          title: "🌐 多语言字幕",
          description:
            "在单一流程中生成多语言字幕，同时服务所有市场。",
        },
      ],
    },
    footer: {
      businessLines: [
        "公司名称：STOCKOP | 代表人：신종환",
        "营业登记号：321-26-01416",
        "邮箱：cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "政策",
      policies: [
        { label: "使用条款", href: "/policy" },
        { label: "隐私政策", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
