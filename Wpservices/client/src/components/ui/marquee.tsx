import { type ComponentPropsWithoutRef, type ReactNode } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  repeat?: number;
  animate?: boolean;
}

function composeClassName(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  animate = true,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={composeClassName(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          key={index}
          aria-hidden={index > 0 ? true : undefined}
          className={composeClassName(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "flex-col" : "flex-row",
            animate && (vertical ? "animate-marquee-vertical" : "animate-marquee"),
            pauseOnHover && animate && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
