import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "pt-BR",
  label: "Português (Brasil)",
  strings: {
    login: "Entrar",
    signup: "Criar conta",
    logout: "Sair",
    languageSelectorLabel: "Idioma da página de login",
  },
  landingPage: {
    featuresSection: {
      title: "O que entregamos",
      description:
        "Extraímos legendas automaticamente de vídeos e áudios, refinamos tudo com IA que entende o contexto e traduzimos para os idiomas necessários.\nTambém geramos palavras-chave e metadados prontos para SEO e oferecemos um editor web intuitivo para os ajustes finais.",
      cards: [
        {
          title: "Extração de legendas",
          description:
            "Obtenha legendas precisas de qualquer vídeo ou áudio para melhorar a acessibilidade e acelerar a edição.",
        },
        {
          title: "Refino com IA",
          description: "Deixe a IA tornar cada linha natural e correta.",
        },
        {
          title: "Tradução multilíngue",
          description:
            "Crie trilhas de legendas em vários idiomas com um único upload e alcance o mundo todo.",
        },
        {
          title: "Palavras-chave de SEO",
          description:
            "Gere automaticamente palavras-chave e metadados contextuais que aumentam a visibilidade nas buscas.",
        },
        {
          title: "Editor de timeline",
          description:
            "Ajuste o tempo das legendas quadro a quadro e edite o texto rapidamente em uma só tela.",
        },
        {
          title: "Exportação flexível",
          description:
            "Baixe as legendas prontas em SRT ou VTT e use em todos os canais de distribuição.",
        },
      ],
    },
    valuesSection: {
      title: "O valor que a media translator persegue",
      description:
        "Acreditamos que qualquer pessoa deve produzir legendas e traduções de alta qualidade com facilidade.\nAjudamos criadores, educadores e empresas a alcançar públicos globais com clareza e precisão.",
      cards: [
        {
          title: "🎯 Automação orientada ao propósito",
          description:
            "Automação focada no significado do conteúdo, não apenas em tarefas técnicas.",
        },
        {
          title: "🌍 Alcance global",
          description:
            "Ofereça experiências localizadas para que qualquer espectador compreenda sua mensagem.",
        },
        {
          title: "📈 Automação de SEO",
          description:
            "Mostre automaticamente os metadados e palavras-chave que importam para os buscadores.",
        },
        {
          title: "🌐 Legendas multilíngues",
          description:
            "Produza legendas em vários idiomas em um único fluxo e atenda todos os mercados de uma vez.",
        },
      ],
    },
    footer: {
      businessLines: [
        "Nome empresarial: STOCKOP | Representante: 신종환",
        "Número de registro: 321-26-01416",
        "E-mail: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "Políticas",
      policies: [
        { label: "Termos de uso", href: "/policy" },
        { label: "Política de privacidade", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
