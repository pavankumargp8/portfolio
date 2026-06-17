import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "Java", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "C", level: 75 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
    ],
  },
  {
    title: "Automation",
    skills: [
      { name: "n8n", level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 uppercase tracking-[6px]">
            Skills
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Tech Stack
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mt-16">

          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-cyan-400 transition"
            >
              <h3 className="text-2xl font-semibold mb-8">
                {group.title}
              </h3>

              {group.skills.map((skill) => (
                <div key={skill.name} className="mb-6">

                  <div className="flex justify-between mb-2">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-800">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1 }}
                      viewport={{ once: true }}
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    />

                  </div>

                </div>
              ))}

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}