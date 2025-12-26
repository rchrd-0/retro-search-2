import type { StartGameResponse } from "@retro-search-2/shared";
import { useEffect, useMemo } from "react";
import { useFoundState } from "@/hooks/game/useFoundState";
import { useTimer } from "@/hooks/game/useTimer";

export const useGame = (level: StartGameResponse["level"] | undefined, imageLoaded: boolean) => {
  const { elapsedMs, isRunning, start, stop } = useTimer();
  const gameState = useFoundState();

  const isVictory = useMemo(() => {
    const characters = level?.characters ?? [];
    const numFound = gameState.foundCharacters.size;

    return characters.length > 0 && numFound === characters.length;
  }, [level, gameState.foundCharacters]);

  useEffect(() => {
    if (imageLoaded) {
      start();
    }
  }, [imageLoaded, start]);

  useEffect(() => {
    if (isVictory) {
      stop();
    }
  }, [isVictory, stop]);

  return {
    elapsedMs,
    isRunning,
    foundCharacters: gameState.foundCharacters,
    foundMarkers: gameState.foundMarkers,
    markCharacterFound: gameState.markCharacterFound,
    isVictory,
  };
};
