import { motion } from "framer-motion";

export default function Aurora() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/12 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -100, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-32 h-[550px] w-[550px] rounded-full bg-violet-600/12 blur-[150px]"
      />

      <motion.div
        animate={{
          y: [0, -80, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-sky-500/10 blur-[140px]"
      />

    </div>
  );
}