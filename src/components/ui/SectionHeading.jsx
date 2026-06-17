import { motion } from "framer-motion";

export default function SectionHeading({
  number,
  title,
  subtitle,
}) {
  return (
    <motion.div
      initial={{
        opacity:0,
        y:40
      }}
      whileInView={{
        opacity:1,
        y:0
      }}
      viewport={{
        once:true
      }}
      className="mb-16"
    >
      <p className="text-cyan-400 tracking-[8px]">
        {number}
      </p>

      <h2 className="text-5xl font-bold mt-2">
        {title}
      </h2>

      <p className="text-slate-400 mt-4 max-w-xl">
        {subtitle}
      </p>
    </motion.div>
  );
}