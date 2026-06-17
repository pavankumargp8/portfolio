import { motion } from "framer-motion";

const achievements = [
  "Participated in MONAITHON Hackathon (Medical AI).",
  "Developed AI Legal Buddy using LLMs and NLP.",
  "Built Examination Seat Allotment System under VTU Curriculum.",
  "Built Deep Learning models using MONAI & PyTorch.",
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity:0,y:40 }}
          whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }}
        >
          <p className="uppercase tracking-[6px] text-cyan-400">
            Achievements
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Highlights
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {achievements.map((item,index)=>(
            <motion.div
              key={index}
              initial={{opacity:0,y:60}}
              whileInView={{opacity:1,y:0}}
              transition={{delay:index*0.15}}
              viewport={{once:true}}
              className="rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-cyan-400 hover:-translate-y-2 transition-all"
            >
              <p className="text-lg leading-8">
                {item}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}