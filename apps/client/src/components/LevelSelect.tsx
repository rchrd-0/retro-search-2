import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllLevels } from "@/hooks/query/useGetAllLevels";

interface LevelSelectProps {
  handleSelectLevel: (levelId: string) => void;
}

const LevelSelect = ({ handleSelectLevel }: LevelSelectProps) => {
  const { data: levels, isLoading } = useGetAllLevels();

  if (isLoading) return <Spinner />;

  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {levels?.map(({ id, name, imageUrl }) => (
        <Card key={id} className="cursor-pointer" onClick={() => handleSelectLevel(id)}>
          {name}

          <img
            src={imageUrl}
            alt={`${name} thumbnail`}
            className="pointer-events-none select-none"
          />
        </Card>
      ))}
    </div>
  );
};

export default LevelSelect;
