import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-cyan-400 to-purple-600"
      style={{
        scaleX: scrollYProgress,
        width: "100%",
      }}
    />
  );
}