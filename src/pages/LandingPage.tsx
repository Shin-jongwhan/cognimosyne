// /src/pages/LandingPage.tsx
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const logoutToCurrentOrigin = () => {
  const clientId = "6le4d5j955jnmr8h4pe4vjs7ci";
  const domain = "https://ap-northeast-22qo22vonr.auth.ap-northeast-2.amazoncognito.com";
  const redirectUri = window.location.origin.startsWith("http://localhost")
    ? "http://localhost:5173/"
    : "https://cognimosyne.com/";
  try { window.sessionStorage.clear(); } catch {}
  window.location.href = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(redirectUri)}`;
};

export default function LandingPage() {
  const auth = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans scroll-smooth">
      {/* 상단 우측 로그인/로그아웃 영역 */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-end gap-3">
          {auth.isLoading ? (
            <span className="text-sm text-gray-400">Loading…</span>
          ) : auth.error ? (
            <span className="text-sm text-red-400">Error: {String(auth.error)}</span>
          ) : auth.isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-300">
                {auth.user?.profile?.email}
              </span>
              <button
                onClick={logoutToCurrentOrigin}
                className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
              >
                로그아웃
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => auth.signinRedirect()}
                className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-gray-200 text-sm"
              >
                로그인
              </button>
              <button
                onClick={() => auth.signinRedirect({ extraQueryParams: { screen_hint: "signup" } })}
                className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      </header>

      <HeroSection />

      {/* 기능 소개 섹션 */}
      <motion.section
        id="features"
        className="bg-gradient-to-b from-black to-gray-900 text-white py-20 sm:py-40 lg:py-60 px-6"
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
            {[
              { title: "자막 추출", description: "영상 또는 오디오에서 자동으로 자막을 추출하여 접근성과 편집 편의성을 향상시킵니다." },
              { title: "AI 교정", description: "AI 기반 언어 분석을 통해 자막 문장을 자연스럽고 정확하게 교정합니다." },
              { title: "다국어 번역", description: "전 세계 다양한 언어로 자막을 자동 번역하여 글로벌 접근성을 확보합니다." },
              { title: "SEO 키워드 생성", description: "자막 기반으로 메타데이터 및 키워드를 자동 생성하여 검색 노출을 강화합니다." },
              { title: "타임코드 정렬", description: "자막 텍스트에 정확한 타임코드를 자동으로 맞춰주어, 싱크 오류 없이 자연스럽게 재생됩니다." },
              { title: "자막 파일 다운로드", description: "완성된 자막을 SRT 또는 VTT 포맷으로 다운로드하여 다양한 영상 플랫폼에 손쉽게 적용할 수 있습니다." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all text-center w-full max-w-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{feature.description}</p>
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
            {[
              { title: "🎯 목적 중심의 자동화", description: "단순한 기술 구현을 넘어 콘텐츠의 본질에 집중한 자동화 기능을 제공합니다." },
              { title: "🌍 글로벌 콘텐츠 확장", description: "다국어 자막과 번역으로 전 세계 누구나 이해할 수 있는 콘텐츠로 확장하세요." },
              { title: "📈 SEO 최적화 자동화", description: "검색엔진이 좋아하는 메타데이터와 키워드를 자동으로 추출해 노출을 극대화합니다." },
              { title: "🌐 다국어 자막 생성", description: "한 번의 업로드로 다양한 언어의 자막을 동시에 생성하여 글로벌 시청자에게 손쉽게 도달할 수 있습니다." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-800 p-10 rounded-xl shadow-lg text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-5">{item.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
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
              <p className="font-semibold text-white">정책</p>
              <ul className="space-y-1">
                <li><a href="/policy" className="hover:underline">이용약관</a></li>
                <li><a href="/privacypolicy" className="hover:underline">개인정보처리방침</a></li>
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
