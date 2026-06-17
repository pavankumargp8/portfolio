import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
      className="max-w-2xl"
    >
      <p className="uppercase tracking-[0.45em] text-cyan-400 text-sm">
        Pavan Kumar
      </p>

      <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-7xl">
        Building
        <br />
        <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
          Intelligent Software
        </span>
        <br />
        for the Modern Web.
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
        I design and build AI-powered applications,
        full-stack platforms, and intelligent automation
        systems that solve real-world problems.
      </p>

      <HeroButtons />
    </motion.div>
  );
}