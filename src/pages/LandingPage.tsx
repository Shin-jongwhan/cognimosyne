// /src/pages/LandingPage.tsx
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans scroll-smooth">
      <HeroSection />

      {/* 기능 소개 섹션 */}
      <motion.section
        id="features"
        className="bg-gradient-to-b from-black to-gray-900 text-white py-60 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-7xl font-extrabold mb-20 tracking-tight leading-tight">
            우리가 제공하는 핵심 기능
          </h2>
          <p className="max-w-4xl text-2xl text-gray-300 mb-24 leading-loose">
            영상과 오디오로부터 자막을 자동 추출하고, AI가 문맥을 고려해 교정하며 다양한 언어로 번역합니다.<br />
            SEO 최적화를 위한 키워드와 메타데이터도 자동으로 생성되고, 직관적인 웹 기반 편집기로 결과물을 다듬을 수 있습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 max-w-6xl w-full justify-items-center">
            {["자막 추출", "AI 교정", "다국어 번역", "SEO 키워드 생성", "웹 기반 편집기", "API 제공"].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center w-full max-w-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{feature}</h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  {feature} 기능을 통해 콘텐츠 접근성과 검색 최적화를 극대화하세요.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 서비스 설명 및 가치 섹션 */}
      <motion.section
        className="bg-gray-900 text-white py-60 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-7xl font-extrabold mb-20">media translator가 추구하는 가치</h2>
          <p className="text-2xl text-gray-300 leading-loose mb-24 max-w-4xl">
            우리는 누구나 손쉽게 고품질 자막과 번역을 제작할 수 있는 세상을 추구합니다. 콘텐츠 제작자, 교육자, 비즈니스 사용자들이
            글로벌 시청자에게 더 쉽고 정확하게 도달할 수 있도록 지원합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full">
            {["🎯 목적 중심의 자동화", "🌍 글로벌 콘텐츠 확장", "📈 SEO 최적화 자동화", "🛠 편집기와 API 제공"].map((title, i) => (
              <motion.div
                key={i}
                className="bg-gray-800 p-10 rounded-xl shadow-lg text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-5">{title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {/* 내용은 생략 가능하거나 props로 분리 가능 */}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-6 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 text-sm">
          <div className="space-y-2">
            <p>상호: STOCKOP | 대표자명: 신종환</p>
            <p>사업자등록번호: 321-26-01416</p>
            <p>이메일: cognimosyne@gmail.com</p>
            <p className="mt-2">Copyright © STOCKOP</p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="space-y-1">
              <p className="font-semibold text-white">서비스</p>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">SHOP</a></li>
                <li><a href="#" className="hover:underline">REVIEW</a></li>
                <li><a href="#" className="hover:underline">COMMUNITY</a></li>
                <li><a href="#" className="hover:underline">ABOUT</a></li>
              </ul>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-white">정책</p>
              <ul className="space-y-1">
                <li><a href="/policy" className="hover:underline">이용약관</a></li>
                <li><a href="#" className="hover:underline">개인정보처리방침</a></li>
              </ul>
            </div>
            <div className="space-x-4 flex items-center mt-4 md:mt-0">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-kakaotalk"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
