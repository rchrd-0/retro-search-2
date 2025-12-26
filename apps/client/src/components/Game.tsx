import { toast } from "sonner";
import CharacterSelectMenu from "@/components/CharacterSelectMenu";
import Marker from "@/components/Marker";
import Timer from "@/components/Timer";
import { Spinner } from "@/components/ui/spinner";
import { useAspectRatio } from "@/hooks/game/useAspectRatio";
import { useClickState } from "@/hooks/game/useClickState";
import { useGame } from "@/hooks/game/useGame";
import { useGetLevel } from "@/hooks/query/useGetLevel";
import { useVerifyCharacter } from "@/hooks/query/useVerifyCharacter";

interface GameProps {
  levelId: string;
}

const Game = ({ levelId }: GameProps) => {
  const { clickState, handleClick, resetClickState } = useClickState();

  const { mutate: verifyCharacter } = useVerifyCharacter(levelId);
  const { data, isLoading } = useGetLevel(levelId);
  const { level } = data || {};
  const aspectRatio = useAspectRatio(level?.imageUrl);
  const imageLoaded = aspectRatio !== null;
  const { foundCharacters, foundMarkers, markCharacterFound, elapsedMs, isVictory, isRunning } =
    useGame(level, imageLoaded);

  const characterList =
    level?.characters.map((character) => ({
      ...character,
      found: foundCharacters.has(character.id),
    })) || [];

  const handleCharacterSelect = (characterId: string) => {
    if (!clickState) return;

    const { relative } = clickState;

    const payload = {
      characterId,
      x: relative.x,
      y: relative.y,
    };

    verifyCharacter(payload, {
      onSuccess: (data) => {
        markCharacterFound(characterId, { x: relative.x, y: relative.y });

        if (data) {
          toast.success(data.message);
        }
      },
      onError: () => {
        toast.error("Not quite!");
      },
    });

    resetClickState();
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="relative">
        <Timer elapsedMs={elapsedMs} />

        <div
          className="w-full cursor-crosshair bg-center bg-cover"
          style={{ backgroundImage: `url(${level?.imageUrl})`, aspectRatio: aspectRatio ?? "auto" }}
          onClick={handleClick}
        />

        <CharacterSelectMenu
          clickState={clickState}
          closeMenu={resetClickState}
          handleCharacterSelect={handleCharacterSelect}
          characterList={characterList}
        />

        {isVictory && <div>Victory!</div>}

        {foundMarkers.map(({ characterId, x, y }) => (
          <Marker key={characterId} x={x} y={y} />
        ))}
      </div>
    </>
  );
};

export default Game;
