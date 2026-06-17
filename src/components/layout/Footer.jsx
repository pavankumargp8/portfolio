import { Github, Linkedin, Mail } from "react-feather";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/10 mt-20">

      <div className="max-w-7xl mx-auto px-8 text-center">

        <h2 className="text-3xl font-bold">
          Pavan Kumar
        </h2>

        <p className="text-gray-400 mt-4">
          Full Stack Developer • AI Enthusiast • Automation Builder
        </p>

        <div className="flex justify-center gap-8 mt-10">

          <a
            href="https://github.com/pavankumargp8"
            target="_blank"
            rel="noreferrer"
          >
            <Github />
          </a>

          <a
            href="https://linkedin.com/in/pavan-kumar"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin />
          </a>

          <a href="mailto:pavankumargp88@gmail.com">
            <Mail />
          </a>

        </div>

        <p className="text-gray-500 mt-10 text-sm">
          © {new Date().getFullYear()} Pavan Kumar. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}