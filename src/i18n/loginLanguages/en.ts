import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "en",
  label: "English",
  strings: {
    login: "Log in",
    signup: "Sign up",
    logout: "Log out",
    languageSelectorLabel: "Login page language",
  },
  landingPage: {
    featuresSection: {
      title: "What we deliver",
      description:
        "We automatically extract subtitles from video and audio, polish them with context-aware AI, and translate them into the languages you need.\nWe also generate SEO-ready keywords and metadata, then let you fine-tune everything inside an intuitive browser editor.",
      cards: [
        {
          title: "Subtitle extraction",
          description:
            "Automatically pull precise subtitles from any video or audio file to improve accessibility and editing speed.",
        },
        {
          title: "AI refinement",
          description: "Use AI language analysis to make every subtitle line sound natural and accurate.",
        },
        {
          title: "Multilingual translation",
          description:
            "Create subtitle tracks in multiple languages with one upload so you can reach a global audience instantly.",
        },
        {
          title: "SEO keyword discovery",
          description:
            "Generate contextual keywords and metadata that boost search visibility without manual research.",
        },
        {
          title: "Timeline editor",
          description:
            "Adjust subtitle timing with frame-level control and make quick text tweaks on one screen.",
        },
        {
          title: "Flexible export",
          description:
            "Download finished subtitles as SRT or VTT and deliver them to every distribution channel.",
        },
      ],
    },
    valuesSection: {
      title: "The value media translator pursues",
      description:
        "We believe anyone should be able to produce high-quality subtitles and translations with ease.\nWe help creators, educators, and businesses reach global audiences more clearly and accurately.",
      cards: [
        {
          title: "🎯 Purpose-driven automation",
          description:
            "Automation that stays focused on the core meaning of your content, not just technical steps.",
        },
        {
          title: "🌍 Global reach expansion",
          description: "Deliver localized subtitle experiences so viewers everywhere understand your story.",
        },
        {
          title: "📈 SEO automation",
          description:
            "Surface the metadata and keywords search engines care about to maximize exposure automatically.",
        },
        {
          title: "🌐 Multilingual subtitles",
          description:
            "Produce subtitles in many languages within a single workflow to serve every market at once.",
        },
      ],
    },
    footer: {
      businessLines: [
        "Business name: STOCKOP | Representative: 신종환",
        "Business registration number: 321-26-01416",
        "Email: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "Policies",
      policies: [
        { label: "Terms of use", href: "/policy" },
        { label: "Privacy policy", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
