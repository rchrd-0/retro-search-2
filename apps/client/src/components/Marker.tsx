const Marker = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-green-500 bg-green-200/30"
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  );
};

export default Marker;
