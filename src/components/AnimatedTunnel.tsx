import { motion } from "framer-motion";

export default function AnimatedTunnel() {
  const layers = Array.from({ length: 10 });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {layers.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="absolute border border-white rounded-lg w-[300px] h-[200px] md:w-[500px] md:h-[300px]"
          style={{ transform: `translateZ(${i * -50}px)` }}
        />
      ))}
    </div>
  );
}
