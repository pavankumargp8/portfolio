import { motion } from "framer-motion";
import { Code2, Briefcase, GraduationCap } from "react-feather";

const stats = [
  {
    icon: <Code2 size={28} />,
    title: "15+",
    subtitle: "Projects Built",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Full Stack",
    subtitle: "Developer",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "B.Tech",
    subtitle: "Computer Science",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 uppercase tracking-[6px]">
            About Me
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Passionate Developer
          </h2>

          <p className="text-gray-400 mt-8 leading-8 max-w-3xl text-lg">
            I'm Pavan, a Full Stack Developer passionate about building
            responsive, scalable, and user-friendly web applications.
            I enjoy transforming ideas into modern digital experiences using
            React, Java, Spring Boot, and contemporary web technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-cyan-400">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-2">
                {item.subtitle}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}