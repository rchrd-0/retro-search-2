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
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center gap-3 pb-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
            <span className="text-2xl leading-none">🏆</span>
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-xl">Level Complete!</DialogTitle>
            <DialogDescription>
              Finished in{" "}
              <span className="font-mono font-semibold text-primary tabular-nums">
                {formatTime(scoreMs)}
              </span>
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-muted-foreground text-sm">
                Enter your initials
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                maxLength={3}
                className="h-12 text-center font-mono text-xl uppercase tracking-widest"
                placeholder="AAA"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onBackToMenu?.() ?? onClose()}
              className="text-muted-foreground"
            >
              Skip
            </Button>
            <Button type="submit" disabled={isPending || username.length !== 3} className="flex-1">
              {isPending ? "Submitting..." : "Save Score"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitScore;
