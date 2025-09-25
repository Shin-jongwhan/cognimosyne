import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "ja",
  label: "日本語",
  strings: {
    login: "ログイン",
    signup: "新規登録",
    logout: "ログアウト",
    languageSelectorLabel: "ログインページの言語",
  },
  landingPage: {
    featuresSection: {
      title: "私たちが提供する機能",
      description:
        "動画や音声から字幕を自動抽出し、文脈を理解するAIで校正して必要な言語へ翻訳します。\nSEO向けのキーワードとメタデータも自動生成し、直感的なブラウザエディタで最終調整できます。",
      cards: [
        {
          title: "字幕抽出",
          description:
            "あらゆる動画・音声から正確な字幕を抽出し、アクセシビリティと編集効率を高めます。",
        },
        {
          title: "AI校正",
          description: "AIが一行一行を自然で正確な表現に整えます。",
        },
        {
          title: "多言語翻訳",
          description:
            "1回のアップロードで複数言語の字幕を作成し、世界中の視聴者に届けます。",
        },
        {
          title: "SEOキーワード抽出",
          description:
            "検索露出を高める文脈に沿ったキーワードとメタデータを自動生成します。",
        },
        {
          title: "タイムライン編集",
          description:
            "フレーム単位でタイミングを調整し、テキストも素早く修正できます。",
        },
        {
          title: "柔軟なエクスポート",
          description:
            "完成した字幕をSRTやVTT形式で出力し、各配信先にすぐ反映できます。",
        },
      ],
    },
    valuesSection: {
      title: "media translatorが追求する価値",
      description:
        "誰もが簡単に高品質な字幕と翻訳を作れる世界を目指しています。\nクリエイター、教育者、ビジネス利用者が世界の視聴者に正確かつ明瞭に届けられるよう支援します。",
      cards: [
        {
          title: "🎯 目的重視の自動化",
          description:
            "技術的な手順にとどまらず、コンテンツの本質に寄り添う自動化を提供します。",
        },
        {
          title: "🌍 グローバル展開",
          description:
            "ローカライズされた字幕体験で、どこにいる視聴者にもストーリーが伝わります。",
        },
        {
          title: "📈 SEO自動化",
          description:
            "検索エンジンが重視するメタデータとキーワードを自動で提示し、露出を最大化します。",
        },
        {
          title: "🌐 多言語字幕",
          description:
            "一つのワークフローで多言語字幕を生成し、あらゆる市場に同時に対応します。",
        },
      ],
    },
    footer: {
      businessLines: [
        "商号: STOCKOP | 代表者: 신종환",
        "事業者登録番号: 321-26-01416",
        "メール: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "ポリシー",
      policies: [
        { label: "利用規約", href: "/policy" },
        { label: "プライバシーポリシー", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
