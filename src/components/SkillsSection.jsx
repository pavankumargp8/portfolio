import { useRef, Suspense, memo, useState, lazy } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionValueEvent,
} from "framer-motion";

const Scene = lazy(() => import("./Scene"));

const SKILLS = [
  { label: "PyTorch",       icon: "🔥" },
  { label: "React.js",      icon: "⚛" },
  { label: "Python",        icon: "🐍" },
  { label: "MONAI",         icon: "🧠" },
  { label: "MySQL",         icon: "⬡" },
  { label: "Java",          icon: "☕" },
  { label: "Git",           icon: "⬢" },
  { label: "JavaScript",    icon: "JS" },
  { label: "C++",           icon: "C++" },
  { label: "Jupyter",       icon: "🪐" },
  { label: "Deep Learning", icon: "✦" },
  { label: "DBMS",          icon: "💾" },
];

const SkillBadge = memo(function SkillBadge({ label, icon, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.07, y: -2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default select-none"
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: hovered
          ? "0 8px 32px rgba(70, 90, 255, 0.18), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
      }}
    >
      <span
        className="text-xs font-mono w-4 text-center"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {icon}
      </span>
      <span
        className="text-sm font-medium"
        style={{
          color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.02em",
          transition: "color 0.25s",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
});

export default function SkillsSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawRotY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 7]);
  const rawRotX = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.7, 0.15]);
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0.65, 1.0, 1.0, 0.8]
  );

  const springRotY  = useSpring(rawRotY,  { stiffness: 55, damping: 22, mass: 0.9 });
  const springRotX  = useSpring(rawRotX,  { stiffness: 55, damping: 22, mass: 0.9 });
  const springScale = useSpring(rawScale, { stiffness: 75, damping: 28, mass: 0.6 });

  const [scene, setScene] = useState({ ry: 0, rx: 0.15, s: 0.65 });
  useMotionValueEvent(springRotY,  "change", (v) => setScene((p) => ({ ...p, ry: v })));
  useMotionValueEvent(springRotX,  "change", (v) => setScene((p) => ({ ...p, rx: v })));
  useMotionValueEvent(springScale, "change", (v) => setScene((p) => ({ ...p, s:  v })));

  const headingOpacity = useTransform(
    scrollYProgress, [0, 0.08, 0.72, 0.88], [0, 1, 1, 0]
  );
  const headingY = useTransform(scrollYProgress, [0, 0.08], [28, 0]);

  const badgesOpacity = useTransform(
    scrollYProgress, [0.42, 0.56, 0.85, 1], [0, 1, 1, 0]
  );
  const badgesY = useTransform(scrollYProgress, [0.42, 0.56], [24, 0]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800;900&display=swap');

        .skill-gradient-text {
          background: linear-gradient(130deg, #6b7280 0%, #d1d5db 45%, #4b5563 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        ref={containerRef}
        style={{ height: "280vh", position: "relative", background: "transparent" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background: "transparent",
            borderRadius: "24px",
            margin: "0",
          }}
        >
          {/* Atmospheric background radial */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 65% 45% at 50% 58%, rgba(90,110,255,0.06) 0%, transparent 68%)",
              pointerEvents: "none",
            }}
          />

          {/* Subtle grid */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 0,
              padding: "0 24px",
            }}
          >
            {/* Heading */}
            <motion.div
              style={{ opacity: headingOpacity, y: headingY }}
              className="text-center"
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                My Skillset
              </p>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(38px, 6vw, 68px)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.92)" }}>The Magic </span>
                <span className="skill-gradient-text">Behind</span>
              </h2>
            </motion.div>

            {/* 3D Canvas */}
            <div
              style={{
                position: "relative",
                width: "min(380px, 80vw)",
                height: "min(380px, 50vh)",
                marginTop: "-8px",
                marginBottom: "-8px",
                zIndex: 10,
              }}
            >
              <Suspense fallback={null}>
                <Scene
                  rotationY={scene.ry}
                  rotationX={scene.rx}
                  scale={scene.s}
                />
              </Suspense>

              {/* Ground reflection glow */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: "8%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "180px",
                  height: "30px",
                  background:
                    "radial-gradient(ellipse, rgba(90,110,255,0.2) 0%, transparent 72%)",
                  filter: "blur(12px)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Skill badges */}
            <motion.div
              style={{ opacity: badgesOpacity, y: badgesY }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "10px",
                  maxWidth: "640px",
                }}
              >
                {SKILLS.map((skill, i) => (
                  <SkillBadge key={skill.label} {...skill} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Edge vignette */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 38%, rgba(5,5,7,0.4) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </section>
    </>
  );
}
