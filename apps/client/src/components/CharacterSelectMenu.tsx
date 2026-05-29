import { CheckCircle } from "lucide-react";
import type { ClickState } from "@/hooks/game/useClickState";
import { cn } from "@/utils/tailwind";

interface CharacterSelectMenuProps {
  clickState: ClickState | null;
  closeMenu: () => void;
  handleCharacterSelect: (characterId: string) => void;
  characterList: Array<{ found: boolean; id: string; name: string }>;
}

const CharacterSelectMenu = ({
  clickState,
  handleCharacterSelect,
  closeMenu,
  characterList,
}: CharacterSelectMenuProps) => {
  if (!clickState) return null;

  const { viewport } = clickState;

  return (
    <>
      {/* Dismiss backdrop */}
      <div className="fixed inset-0 z-40" onClick={closeMenu} />

      {/* Pulsing crosshair at click point */}
      <div
        className="pointer-events-none absolute z-48 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${viewport.x}px`, top: `${viewport.y}px` }}
      >
        <div className="relative size-9">
          <div className="absolute inset-0 rounded-full border-2 border-primary/70" />
          <div className="absolute inset-0 animate-ping rounded-full border border-primary/30" />
          <div className="absolute top-1/2 -right-1 -left-1 h-px -translate-y-1/2 bg-primary/80" />
          <div className="absolute -top-1 -bottom-1 left-1/2 w-px -translate-x-1/2 bg-primary/80" />
          <div className="absolute inset-0 m-auto size-1.5 rounded-full bg-primary" />
        </div>
      </div>

      {/* Character picker panel */}
      <div
        className="fade-in-0 zoom-in-95 absolute z-50 animate-in overflow-hidden rounded-xl border border-border bg-popover shadow-xl shadow-black/50"
        style={{ left: `${viewport.x}px`, top: `${viewport.y}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header label */}
        <div className="border-b border-border/60 px-3 py-2">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Who's here?
          </p>
        </div>

        {/* Character list */}
        <div className="flex min-w-40 flex-col gap-0.5 p-1.5">
          {characterList.map((character) => (
            <button
              key={character.id}
              type="button"
              disabled={character.found}
              onClick={() => handleCharacterSelect(character.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors",
                character.found
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
              )}
            >
              <span
                className={cn(
                  "flex-1 font-medium text-sm text-foreground",
                  character.found && "text-muted-foreground line-through",
                )}
              >
                {character.name}
              </span>
              {character.found && <CheckCircle className="size-3.5 shrink-0 text-primary" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CharacterSelectMenu;
