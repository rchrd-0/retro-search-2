import { formatTime } from "@/utils/format";

const Timer = ({ elapsedMs }: { elapsedMs: number }) => {
  return (
    <div className="absolute top-4 right-4 z-10 rounded-lg bg-black/70 px-6 py-3 font-mono text-3xl text-white shadow-lg">
      {formatTime(elapsedMs)}
    </div>
  );
};

export default Timer;
