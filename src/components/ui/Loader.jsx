import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050816]"
        >
          <h1 className="text-4xl font-bold tracking-[8px]">
            PAVAN
          </h1>

          <p className="mt-6 text-slate-400">
            Initializing Workspace...
          </p>

          <div className="w-72 h-1 bg-slate-800 mt-8 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6 }}
              className="h-full bg-cyan-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}