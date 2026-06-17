export default function TechChip({
  children,
}) {
  return (
    <span
      className="
      px-4
      py-2
      rounded-full
      text-sm
      bg-white/5
      border
      border-white/10
      hover:border-cyan-400
      hover:text-cyan-300
      transition
      "
    >
      {children}
    </span>
  );
}