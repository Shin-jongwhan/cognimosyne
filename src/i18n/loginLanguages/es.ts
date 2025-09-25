import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "es",
  label: "Español",
  strings: {
    login: "Iniciar sesión",
    signup: "Crear cuenta",
    logout: "Cerrar sesión",
    languageSelectorLabel: "Idioma de la página de inicio de sesión",
  },
  landingPage: {
    featuresSection: {
      title: "Lo que ofrecemos",
      description:
        "Extraemos subtítulos automáticamente del video y el audio, los pulimos con IA consciente del contexto y los traducimos a los idiomas que necesitas.\nTambién generamos palabras clave y metadatos listos para SEO, y te permitimos ajustarlo todo en un editor web intuitivo.",
      cards: [
        {
          title: "Extracción de subtítulos",
          description:
            "Obtén subtítulos precisos de cualquier video o audio para mejorar la accesibilidad y acelerar la edición.",
        },
        {
          title: "Corrección con IA",
          description: "Deja que la IA haga que cada línea suene natural y exacta.",
        },
        {
          title: "Traducción multilingüe",
          description:
            "Genera pistas de subtítulos en varios idiomas con una sola carga y llega al instante a una audiencia global.",
        },
        {
          title: "Palabras clave SEO",
          description:
            "Genera palabras clave y metadatos contextuales que impulsan tu visibilidad en buscadores.",
        },
        {
          title: "Editor de timeline",
          description:
            "Ajusta el tiempo de los subtítulos con precisión de fotograma y corrige textos rápidamente en una sola pantalla.",
        },
        {
          title: "Exportación flexible",
          description:
            "Descarga los subtítulos finales en SRT o VTT y publícalos en todos tus canales.",
        },
      ],
    },
    valuesSection: {
      title: "El valor que persigue media translator",
      description:
        "Creemos que cualquiera debería producir subtítulos y traducciones de alta calidad sin esfuerzo.\nAyudamos a creadores, educadores y empresas a llegar con claridad y precisión a audiencias globales.",
      cards: [
        {
          title: "🎯 Automatización con propósito",
          description:
            "Automatización enfocada en el sentido del contenido, no solo en pasos técnicos.",
        },
        {
          title: "🌍 Expansión global",
          description:
            "Entrega experiencias totalmente localizadas para que cualquier espectador comprenda tu mensaje.",
        },
        {
          title: "📈 Automatización SEO",
          description:
            "Obtén automáticamente los metadatos y palabras clave que importan a los buscadores.",
        },
        {
          title: "🌐 Subtítulos multilingües",
          description:
            "Produce conjuntos de subtítulos en múltiples idiomas en un solo flujo de trabajo.",
        },
      ],
    },
    footer: {
      businessLines: [
        "Razón social: STOCKOP | Representante: 신종환",
        "Número de registro: 321-26-01416",
        "Correo: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "Políticas",
      policies: [
        { label: "Términos de uso", href: "/policy" },
        { label: "Política de privacidad", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
