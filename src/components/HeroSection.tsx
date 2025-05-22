import { motion } from "framer-motion";
import AnimatedTunnel from "./AnimatedTunnel";
import GlowingButton from "./GlowingButton";
import characterImg from "../assets/landing_page_character.png";
import bgImage from "../assets/bg_space.png";

export default function HeroSection() {
  return (
    <div className="relative w-screen h-screen overflow-hidden text-white font-sans">
      {/* 배경 이미지 */}
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 터널 애니메이션 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <AnimatedTunnel />
      </div>

      {/* 캐릭터 이미지 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        className="absolute z-20 left-1/2 bottom-[150px] md:bottom-[250px] -translate-x-1/2 
                  w-[80vw] max-w-[800px] aspect-[3/2] p-[2px] 
                  border border-white/30 rounded-md 
                  shadow-[0_0_40px_rgba(255,255,255,0.08)] pointer-events-none"
        style={{
          transform: 'perspective(1000px) rotateY(8deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={characterImg}
          alt="character"
          className="w-full h-full object-cover rounded"
        />
      </motion.div>
      
      {/* 텍스트 및 버튼 */}
      <div className="absolute z-20 bottom-20 w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extralight mb-4"
        >
          Voices Across Borders
        </motion.h1>
        <p className="mb-6 text-base md:text-lg text-gray-800">
          Bridging voices across languages and media
        </p>
        <GlowingButton />
      </div>

      {/* 상단 로고 및 메뉴 */}
      <div className="absolute z-30 top-10 left-10 font-bold text-xl">Media Translator</div>
      <div className="absolute z-30 top-10 right-10 text-sm cursor-pointer">☰</div>
    </div>
  );
}
