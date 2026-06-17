import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modes } from "./DeveloperModes";


export default function DeveloperConsole() {
   const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % modes.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);

const mode = modes[index];
  return (
   
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: .8 }}
      className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="flex items-center gap-2 border-b border-white/10 p-4">

        <span className="h-3 w-3 rounded-full bg-red-400" />

        <span className="h-3 w-3 rounded-full bg-yellow-400" />

        <span className="h-3 w-3 rounded-full bg-green-400" />

        <span className="ml-4 text-sm text-slate-400">
          engineer.ts
        </span>

      </div>

      {/* Code */}

     <div className="p-8">

  <div className="mb-6 flex items-center justify-between">

    <span className={`${mode.color} font-semibold`}>
      {mode.title} Mode
    </span>

    <span className="text-green-400">
      ● Active
    </span>

  </div>

  <AnimatePresence mode="wait">

    <motion.pre
      key={mode.title}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: .4 }}
      className="text-sm leading-8 text-slate-300"
    >
      {mode.code}
    </motion.pre>

  </AnimatePresence>

</div>

      

    </motion.div>
  );
}