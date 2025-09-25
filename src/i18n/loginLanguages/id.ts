import type { LoginLanguageDefinition } from "./types";

const locale: LoginLanguageDefinition = {
  code: "id",
  label: "Bahasa Indonesia",
  strings: {
    login: "Masuk",
    signup: "Daftar",
    logout: "Keluar",
    languageSelectorLabel: "Bahasa halaman masuk",
  },
  landingPage: {
    featuresSection: {
      title: "Apa yang kami sediakan",
      description:
        "Kami mengekstrak subtitel secara otomatis dari video dan audio, merapikannya dengan AI yang memahami konteks, lalu menerjemahkannya ke bahasa yang Anda butuhkan.\nKami juga membuat kata kunci dan metadata siap SEO, dan memberi Anda editor web intuitif untuk memoles hasil akhirnya.",
      cards: [
        {
          title: "Ekstraksi subtitel",
          description:
            "Tarik subtitel akurat dari video atau audio apa pun untuk meningkatkan aksesibilitas dan kecepatan pengeditan.",
        },
        {
          title: "Perapihan AI",
          description: "Biarkan AI membuat setiap baris terdengar alami dan tepat.",
        },
        {
          title: "Terjemahan multibahasa",
          description:
            "Buat trek subtitel dalam banyak bahasa dengan satu unggahan agar langsung menjangkau audiens global.",
        },
        {
          title: "Kata kunci SEO",
          description:
            "Dapatkan kata kunci dan metadata kontekstual yang meningkatkan visibilitas pencarian tanpa riset manual.",
        },
        {
          title: "Editor timeline",
          description:
            "Sesuaikan timing subtitel hingga tingkat frame dan perbaiki teks dengan cepat di satu layar.",
        },
        {
          title: "Ekspor fleksibel",
          description:
            "Unduh subtitel selesai dalam format SRT atau VTT dan gunakan di semua kanal distribusi.",
        },
      ],
    },
    valuesSection: {
      title: "Nilai yang diupayakan media translator",
      description:
        "Kami percaya siapa pun dapat membuat subtitel dan terjemahan berkualitas tinggi dengan mudah.\nKami membantu kreator, pendidik, dan pelaku bisnis menjangkau audiens global dengan lebih jelas dan akurat.",
      cards: [
        {
          title: "🎯 Automasi berorientasi tujuan",
          description:
            "Automasi yang berfokus pada makna inti konten, bukan hanya langkah teknis.",
        },
        {
          title: "🌍 Perluasan jangkauan global",
          description:
            "Sajikan pengalaman subtitel yang terlokalisasi agar penonton di mana pun memahami cerita Anda.",
        },
        {
          title: "📈 Automasi SEO",
          description:
            "Secara otomatis tampilkan metadata dan kata kunci penting bagi mesin pencari.",
        },
        {
          title: "🌐 Subtitel multibahasa",
          description:
            "Hasilkan subtitel dalam banyak bahasa dalam satu alur kerja untuk melayani semua pasar sekaligus.",
        },
      ],
    },
    footer: {
      businessLines: [
        "Nama perusahaan: STOCKOP | Perwakilan: 신종환",
        "Nomor registrasi bisnis: 321-26-01416",
        "Email: cognimosyne@gmail.com",
        "Copyright © STOCKOP",
      ],
      policyHeading: "Kebijakan",
      policies: [
        { label: "Syarat penggunaan", href: "/policy" },
        { label: "Kebijakan privasi", href: "/privacypolicy" },
      ],
    },
  },
};

export default locale;
