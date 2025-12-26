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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Rank</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No scores yet. Be the first!
              </TableCell>
            </TableRow>
          ) : (
            scores?.map((score, index) => (
              <TableRow key={`${score.username}-${score.createdAt}`}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{score.username}</TableCell>
                <TableCell>{formatTime(score.scoreMs)}</TableCell>
                <TableCell className="text-right">
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
