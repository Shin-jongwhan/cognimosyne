import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "it",
  label: "Italiano",
  strings: {
    login: "Accedi",
    signup: "Registrati",
    logout: "Esci",
    languageSelectorLabel: "Lingua della pagina di accesso",
  },
  landingPage: {
    featuresSection: {
      title: "Cosa offriamo",
      description:
        "Estraiamo automaticamente i sottotitoli da video e audio, li rifiniamo con un'IA attenta al contesto e li traduciamo nelle lingue di cui hai bisogno.\nGeneriamo anche parole chiave e metadati ottimizzati per la SEO e ti permettiamo di rifinire tutto in un editor web intuitivo.",
      cards: [
        {
          title: "Estrazione dei sottotitoli",
          description:
            "Ottieni sottotitoli precisi da qualsiasi video o audio per migliorare accessibilità e velocità di editing.",
        },
        {
          title: "Rifinitura IA",
          description: "Lascia che l'IA renda ogni riga naturale e accurata.",
        },
        {
          title: "Traduzione multilingue",
          description:
            "Crea tracce di sottotitoli in più lingue con un solo upload per raggiungere subito il pubblico globale.",
        },
        {
          title: "Parole chiave SEO",
          description:
            "Genera automaticamente parole chiave e metadati contestuali che aumentano la visibilità.",
        },
        {
          title: "Editor timeline",
          description:
            "Regola il timing con precisione al fotogramma e modifica rapidamente i testi in un'unica schermata.",
        },
        {
          title: "Esportazione flessibile",
          description:
            "Scarica i sottotitoli finali in formato SRT o VTT e utilizzali su ogni canale.",
        },
      ],
    },
    valuesSection: {
      title: "Il valore perseguito da media translator",
      description:
        "Crediamo che chiunque debba produrre facilmente sottotitoli e traduzioni di alta qualità.\nAiutiamo creatori, educatori e aziende a raggiungere il pubblico globale con chiarezza e precisione.",
      cards: [
        {
          title: "🎯 Automazione mirata",
          description:
            "Un'automazione che rimane centrata sul significato del tuo contenuto, non solo sui passaggi tecnici.",
        },
        {
          title: "🌍 Espansione globale",
          description:
            "Offri esperienze completamente localizzate in modo che ogni spettatore comprenda la tua storia.",
        },
        {
          title: "📈 Automazione SEO",
          description:
            "Metadati e parole chiave importanti emergono automaticamente per massimizzare la visibilità.",
        },
        {
          title: "🌐 Sottotitoli multilingue",
          description:
            "Produci sottotitoli in molte lingue in un unico flusso di lavoro per servire ogni mercato.",
        },
      ],
    },
    footer: {
      businessLines: [
        "Ragione sociale: STOCKOP | Rappresentante: 신종환",
        "Numero di registrazione: 321-26-01416",
        "Email: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "Policy",
      policies: [
        { label: "Termini d'uso", href: "/policy" },
        { label: "Informativa sulla privacy", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
