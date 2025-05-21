import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 space-y-12">
      <motion.h1
        className="text-5xl font-bold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        media translator
      </motion.h1>

      <motion.p
        className="text-lg text-center max-w-2xl text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        AI 기반 다국어 자막 자동 생성 및 번역 SaaS. 영상과 오디오를 업로드하면 자막을 추출하고, 교정하고, 다양한 언어로 번역하며, SEO를 위한 메타데이터까지 자동으로 생성합니다.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {["자막 추출", "AI 교정", "다국어 번역", "SEO 키워드 생성", "웹 기반 편집기", "API 제공"].map((feature, index) => (
          <motion.div
            key={index}
            className="w-full"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6 text-center text-gray-700 font-medium">
                {feature}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Button className="text-lg px-6 py-3 rounded-2xl shadow-lg">
          시작하기
        </Button>
      </motion.div>
    </div>
  );
}
