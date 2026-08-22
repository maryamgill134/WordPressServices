type CheckMarkProps = {
  className?: string;
  size?: "default" | "compact";
  tone?: "light" | "on-dark";
};

export function CheckMark({ className = "", size = "default", tone = "light" }: CheckMarkProps) {
  const classes = [
    "check-mark",
    size === "compact" ? "check-mark--compact" : "",
    tone === "on-dark" ? "check-mark--on-dark" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" focusable="false" aria-hidden="true">
        <path
          d="M3.3 8.2 6.6 11.35 12.7 4.8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
