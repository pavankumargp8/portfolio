import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, 80, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
        }}
        className="absolute h-96 w-96 rounded-full bg-purple-700/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, -120, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
        }}
        className="absolute right-0 top-20 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
        }}
        className="absolute bottom-0 left-1/2 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[140px]"
      />
    </div>
  );
}