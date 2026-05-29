import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetLeaderboard } from "@/hooks/query/useGetLeaderboard";
import { formatTime } from "@/utils/format";

const MEDALS = ["🥇", "🥈", "🥉"];

interface LeaderboardProps {
  levelId: string;
}

const Leaderboard = ({ levelId }: LeaderboardProps) => {
  const { data: scores, isLoading } = useGetLeaderboard(levelId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-16 font-medium text-muted-foreground">Rank</TableHead>
            <TableHead className="font-medium text-muted-foreground">Player</TableHead>
            <TableHead className="font-medium text-muted-foreground">Time</TableHead>
            <TableHead className="text-right font-medium text-muted-foreground">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                No scores yet. Be the first!
              </TableCell>
            </TableRow>
          ) : (
            scores?.map((score, index) => (
              <TableRow
                key={`${score.username}-${score.createdAt}`}
                className="border-border/50 transition-colors hover:bg-muted/30"
              >
                <TableCell className="font-mono text-sm">
                  {index < 3 ? (
                    <span className="text-base leading-none">{MEDALS[index]}</span>
                  ) : (
                    <span className="text-muted-foreground">{index + 1}</span>
                  )}
                </TableCell>
                <TableCell className="font-medium font-mono text-foreground tracking-widest">
                  {score.username}
                </TableCell>
                <TableCell>
                  <span
                    className={`font-mono text-sm tabular-nums ${index === 0 ? "font-semibold text-primary" : "text-foreground"}`}
                  >
                    {formatTime(score.scoreMs)}
                  </span>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {new Date(score.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
