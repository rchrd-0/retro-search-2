import { useEffect, useState } from "react";
import Leaderboard from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl">Leaderboards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-center gap-2">
              {levels?.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevelId === level.id ? "default" : "outline"}
                  onClick={() => setSelectedLevelId(level.id)}
                >
                  {level.name}
                </Button>
              ))}
            </div>

            {selectedLevelId && (
              <div className="mt-4">
                <Leaderboard levelId={selectedLevelId} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
