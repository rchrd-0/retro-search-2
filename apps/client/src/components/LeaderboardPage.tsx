import { useEffect, useState } from "react";
import Leaderboard from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllLevels } from "@/hooks/query/useGetAllLevels";

const LeaderboardPage = () => {
  const { data: levels, isLoading } = useGetAllLevels();
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  useEffect(() => {
    if (levels && levels.length > 0 && !selectedLevelId) {
      setSelectedLevelId(levels[0].id);
    }
  }, [levels, selectedLevelId]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-1">
        <h2 className="font-bold text-2xl tracking-tight">Leaderboards</h2>
        <p className="text-muted-foreground text-sm">Top times for each level</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {levels?.map((level) => (
          <Button
            key={level.id}
            variant={selectedLevelId === level.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevelId(level.id)}
          >
            {level.name}
          </Button>
        ))}
      </div>

      {selectedLevelId && <Leaderboard levelId={selectedLevelId} />}
    </div>
  );
};

export default LeaderboardPage;
