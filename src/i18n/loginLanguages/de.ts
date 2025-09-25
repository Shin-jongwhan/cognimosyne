import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "de",
  label: "Deutsch",
  strings: {
    login: "Anmelden",
    signup: "Registrieren",
    logout: "Abmelden",
    languageSelectorLabel: "Sprache der Anmeldeseite",
  },
  landingPage: {
    featuresSection: {
      title: "Was wir liefern",
      description:
        "Wir extrahieren Untertitel automatisch aus Video und Audio, verfeinern sie kontextbewusst mit KI und übersetzen sie in die benötigten Sprachen.\nSEO-fertige Keywords und Metadaten entstehen ebenfalls automatisch, danach können Sie alles im intuitiven Browser-Editor nachbearbeiten.",
      cards: [
        {
          title: "Untertitel-Extraktion",
          description:
            "Gewinnen Sie exakte Untertitel aus jedem Video oder Audio und steigern Sie so Barrierefreiheit und Bearbeitungstempo.",
        },
        {
          title: "KI-Nachbearbeitung",
          description:
            "Lassen Sie KI die Sätze sprachlich und stilistisch glätten, damit jede Zeile natürlich klingt.",
        },
        {
          title: "Mehrsprachige Übersetzung",
          description:
            "Erstellen Sie aus einem Upload automatisch Untertitel in vielen Sprachen und erreichen Sie sofort ein globales Publikum.",
        },
        {
          title: "SEO-Schlüsselwörter",
          description:
            "Erhalten Sie kontextsensitive Keywords und Metadaten, die Ihre Sichtbarkeit in Suchmaschinen erhöhen.",
        },
        {
          title: "Timeline-Editor",
          description:
            "Passen Sie Zeiten framegenau an und korrigieren Sie Textstellen schnell innerhalb einer Oberfläche.",
        },
        {
          title: "Flexible Exporte",
          description:
            "Laden Sie finale Untertitel als SRT oder VTT herunter und verwenden Sie sie in allen Distributionen.",
        },
      ],
    },
    valuesSection: {
      title: "Die Werte von media translator",
      description:
        "Wir glauben, dass jeder hochwertige Untertitel und Übersetzungen mühelos erstellen können sollte.\nWir unterstützen Creator, Lehrende und Unternehmen dabei, ihr Publikum weltweit klar und präzise zu erreichen.",
      cards: [
        {
          title: "🎯 Zweckorientierte Automatisierung",
          description:
            "Automatisierung, die sich auf die Aussage Ihres Inhalts konzentriert – nicht nur auf technische Arbeitsschritte.",
        },
        {
          title: "🌍 Globale Reichweite",
          description:
            "Liefern Sie komplett lokalisierte Untertitel-Erlebnisse, damit Zuschauer überall Ihre Geschichte verstehen.",
        },
        {
          title: "📈 SEO-Automatisierung",
          description:
            "Die relevanten Metadaten und Keywords werden automatisch generiert, um Ihre Sichtbarkeit zu maximieren.",
        },
        {
          title: "🌐 Mehrsprachige Untertitel",
          description:
            "Produzieren Sie Untertitel in vielen Sprachen in einem Workflow und bedienen Sie alle Märkte gleichzeitig.",
        },
      ],
    },
    footer: {
      businessLines: [
        "Unternehmensname: STOCKOP | Vertreter: 신종환",
        "Handelsregisternummer: 321-26-01416",
        "E-Mail: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "Richtlinien",
      policies: [
        { label: "Nutzungsbedingungen", href: "/policy" },
        { label: "Datenschutzerklärung", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
