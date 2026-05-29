import { formatTime } from "@/utils/format";

const Timer = ({ elapsedMs }: { elapsedMs: number }) => {
  return (
    <div className="fixed top-[60px] right-6 z-50 flex items-center gap-2 rounded-lg border border-border/60 bg-background/95 px-4 py-2 shadow-black/30 shadow-lg backdrop-blur-sm">
      <span className="size-1.5 animate-pulse rounded-full bg-primary" />
      <span className="font-mono text-foreground text-xl tabular-nums tracking-tight">
        {formatTime(elapsedMs)}
      </span>
    </div>
  );
};

export default Timer;
