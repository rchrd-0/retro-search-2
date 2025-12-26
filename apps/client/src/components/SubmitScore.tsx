import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmitScore } from "@/hooks/mutation/useSubmitScore";
import { formatTime } from "@/utils/format";

interface SubmitScoreProps {
  levelId: string;
  scoreMs: number;
  isOpen: boolean;
  onClose: () => void;
  onViewLeaderboard?: () => void;
  onBackToMenu?: () => void;
}

const SubmitScore = ({
  levelId,
  scoreMs,
  isOpen,
  onClose,
  onViewLeaderboard,
  onBackToMenu,
}: SubmitScoreProps) => {
  const [username, setUsername] = useState("");
  const { mutate: submitScore, isPending } = useSubmitScore(levelId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length !== 3) {
      toast.error("Username must be exactly 3 characters");
      return;
    }

    submitScore(
      { username },
      {
        onSuccess: () => {
          toast.success("Score submitted!");
          onClose();
          onViewLeaderboard?.();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to submit score");
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Level Complete!</DialogTitle>
          <DialogDescription>
            You finished in <span className="font-bold text-foreground">{formatTime(scoreMs)}</span>
            . Enter your initials to save your score to the leaderboard.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Initials
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                maxLength={3}
                className="col-span-3 uppercase"
                placeholder="AAA"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onBackToMenu?.() ?? onClose()}>
              Skip
            </Button>
            <Button type="submit" disabled={isPending || username.length !== 3}>
              {isPending ? "Submitting..." : "Submit Score"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitScore;
