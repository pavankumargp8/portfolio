import { useState, useEffect } from "react";
import { Menu, X } from "react-feather";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => setBlur(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        blur
          ? "backdrop-blur-xl bg-white/5 border-b border-white/10"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">
          Pavan<span className="text-cyan-400">.</span>
        </h1>

        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-cyan-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0b1120]/95 backdrop-blur-xl">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-8 py-5 border-b border-white/10"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}