import { motion } from "framer-motion";
import { Github, ExternalLink } from "react-feather";
import { projects } from "../../data/portfolio";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[6px] text-cyan-400">
            Portfolio
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Featured Projects
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl">
            Projects focused on AI, Full Stack Development,
            Automation and Problem Solving.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mt-16">

          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              {/* Placeholder Banner */}
              <div
                className={`h-56 bg-gradient-to-r ${project.color} flex items-center justify-center`}
              >
                <h3 className="text-3xl font-bold text-white text-center px-8">
                  {project.title}
                </h3>
              </div>

              <div className="p-8">

                <p className="text-gray-300 leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-8">

                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full text-sm bg-cyan-500/20 border border-cyan-400/30"
                    >
                      {tech}
                    </span>
                  ))}

                </div>

                <div className="flex gap-5 mt-10">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-cyan-500 transition"
                  >
                    <Github size={18} />
                    GitHub
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-full border border-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}