import { cn } from "@/utils/tailwind";

function Spinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-label="Loading"
      aria-live="polite"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 rounded-full bg-primary"
          style={{ animation: `dot-pulse 1.4s ease-in-out ${i * 220}ms infinite` }}
        />
      ))}
    </span>
  );
}

export { Spinner };
