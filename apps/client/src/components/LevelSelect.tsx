import { Spinner } from "@/components/ui/spinner";
import { useGetAllLevels } from "@/hooks/query/useGetAllLevels";

interface LevelSelectProps {
  handleSelectLevel: (levelId: string) => void;
}

const LevelSelect = ({ handleSelectLevel }: LevelSelectProps) => {
  const { data: levels, isLoading } = useGetAllLevels();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {levels?.map(({ id, name, imageUrl }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleSelectLevel(id)}
          className="group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={`${name} thumbnail`}
              className="pointer-events-none h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          </div>
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <p className="font-semibold text-white drop-shadow">{name}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LevelSelect;
