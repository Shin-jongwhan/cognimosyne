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
      <motion.img
        src={characterImg}
        alt="character"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[50px] max-h-[85%] pointer-events-none"
      />

      {/* 텍스트 및 버튼 */}
      <div className="absolute z-20 bottom-20 w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extralight mb-4"
        >
          Virtual Production
        </motion.h1>
        <p className="mb-6 text-base md:text-lg text-gray-200">
          Connecting analogue and digital realms
        </p>
        <GlowingButton />
      </div>

      {/* 상단 로고 및 메뉴 */}
      <div className="absolute z-30 top-10 left-10 font-bold text-xl">UPP</div>
      <div className="absolute z-30 top-10 right-10 text-sm cursor-pointer">☰</div>
    </div>
  );
}
