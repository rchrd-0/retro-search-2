import { useState } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface ClickState {
  viewport: Position;
  relative: Position;
}

export const useClickState = () => {
  const [clickState, setClickState] = useState<ClickState | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    const viewportX = e.clientX - rect.left;
    const viewportY = e.clientY - rect.top;

    const relativeX = (viewportX / rect.width) * 100;
    const relativeY = (viewportY / rect.height) * 100;

    setClickState({
      viewport: { x: viewportX, y: viewportY },
      relative: { x: relativeX, y: relativeY },
    });
  };

  const resetClickState = () => {
    setClickState(null);
  };

  return { clickState, handleClick, resetClickState };
};
