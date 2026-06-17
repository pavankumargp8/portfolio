import { motion } from "framer-motion";

const education = [
  {
    year: "2023 - 2027",
    title: "B.E. Computer Science & Engineering",
    school: "P.E.S Institute of Technology and Management",
    detail: "CGPA: 8.9",
  },
  {
    year: "2021 - 2023",
    title: "PUC (Science)",
    school: "Shree Guru Independent PU College",
    detail: "93.33%",
  },
  {
    year: "2020 - 2021",
    title: "SSLC",
    school: "Mount Carmel Convent School",
    detail: "89.28%",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[6px] text-cyan-400">
            Education
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Academic Journey
          </h2>
        </motion.div>

        <div className="relative mt-20 border-l border-cyan-500">

          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="ml-8 mb-14 relative"
            >
              <div className="absolute -left-11 top-2 h-5 w-5 rounded-full bg-cyan-400"></div>

              <span className="text-cyan-400">
                {item.year}
              </span>

              <h3 className="text-2xl font-semibold mt-2">
                {item.title}
              </h3>

              <p className="text-gray-300 mt-2">
                {item.school}
              </p>

              <p className="text-gray-500 mt-1">
                {item.detail}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}