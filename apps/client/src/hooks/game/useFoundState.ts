import { useState } from "react";
import type { Position } from "@/hooks/game/useClickState";

type FoundCharacters = Set<string>;
type FoundMarkers = Position & { characterId: string };

export const useFoundState = () => {
  const [foundCharacters, setFoundCharacters] = useState<FoundCharacters>(new Set());
  const [foundMarkers, setFoundMarkers] = useState<FoundMarkers[]>([]);

  const markCharacterFound = (characterId: string, position: Position) => {
    setFoundCharacters((prev) => new Set(prev).add(characterId));

    setFoundMarkers((prev) => [...prev, { characterId, x: position.x, y: position.y }]);
  };

  return {
    foundCharacters,
    foundMarkers,
    markCharacterFound,
  };
};
