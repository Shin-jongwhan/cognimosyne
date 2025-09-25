import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "fr",
  label: "Français",
  strings: {
    login: "Se connecter",
    signup: "Créer un compte",
    logout: "Se déconnecter",
    languageSelectorLabel: "Langue de la page de connexion",
  },
  landingPage: {
    featuresSection: {
      title: "Ce que nous proposons",
      description:
        "Nous extrayons automatiquement les sous-titres des vidéos et des audios, les affinons grâce à une IA contextuelle et les traduisons dans les langues nécessaires.\nNous générons aussi des mots-clés et métadonnées prêts pour le SEO, puis vous pouvez tout ajuster dans un éditeur web intuitif.",
      cards: [
        {
          title: "Extraction des sous-titres",
          description:
            "Obtenez des sous-titres précis à partir de n'importe quelle vidéo ou audio pour améliorer l'accessibilité et accélérer le montage.",
        },
        {
          title: "Affinage par IA",
          description: "Laissez l'IA rendre chaque ligne fluide et juste.",
        },
        {
          title: "Traduction multilingue",
          description:
            "Générez des pistes de sous-titres dans plusieurs langues avec un seul import pour toucher un public mondial.",
        },
        {
          title: "Mots-clés SEO",
          description:
            "Générez automatiquement des mots-clés et métadonnées contextuels pour booster votre visibilité.",
        },
        {
          title: "Éditeur de timeline",
          description:
            "Ajustez le minutage au niveau de la frame et corrigez rapidement le texte sur une seule interface.",
        },
        {
          title: "Export flexible",
          description:
            "Téléchargez vos sous-titres en SRT ou VTT et diffusez-les sur tous vos canaux.",
        },
      ],
    },
    valuesSection: {
      title: "La valeur que recherche media translator",
      description:
        "Nous pensons que chacun doit pouvoir produire facilement des sous-titres et traductions de haute qualité.\nNous aidons créateurs, enseignants et entreprises à atteindre des audiences internationales avec clarté et précision.",
      cards: [
        {
          title: "🎯 Automatisation orientée objectif",
          description:
            "Une automatisation centrée sur l’essence de votre contenu, au-delà de la technique.",
        },
        {
          title: "🌍 Extension de l'audience",
          description:
            "Offrez une expérience localisée pour que chaque spectateur comprenne votre histoire.",
        },
        {
          title: "📈 Automatisation SEO",
          description:
            "Obtenez automatiquement les métadonnées et mots-clés importants pour les moteurs de recherche.",
        },
        {
          title: "🌐 Sous-titres multilingues",
          description:
            "Produisez plusieurs langues de sous-titres en un seul flux de travail pour couvrir tous les marchés.",
        },
      ],
    },
    footer: {
      businessLines: [
        "Raison sociale : STOCKOP | Représentant : 신종환",
        "Numéro d’enregistrement : 321-26-01416",
        "E-mail : cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "Politiques",
      policies: [
        { label: "Conditions d’utilisation", href: "/policy" },
        { label: "Politique de confidentialité", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
