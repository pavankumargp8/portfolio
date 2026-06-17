const tech = [
  "React",
  "Java",
  "Python",
  "Node",
  "n8n",
  "LLM",
  "FastAPI",
];

export default function FloatingTech() {
  return (
    <>
      {tech.map((item, i) => (
        <div
          key={item}
          className="absolute rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm backdrop-blur-md"
          style={{
            top: `${10 + i * 10}%`,
            left: i % 2 === 0 ? "-30px" : "85%",
          }}
        >
          {item}
        </div>
      ))}
    </>
  );
}