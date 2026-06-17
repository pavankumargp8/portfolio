import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/30",

    secondary:
      "border border-cyan-400 hover:bg-cyan-400 hover:text-black",

    ghost:
      "hover:bg-white/10",
  };

  return (
    <button
      {...props}
      className={clsx(
        "rounded-full px-7 py-3 font-medium transition-all duration-300 hover:scale-105",
        styles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}