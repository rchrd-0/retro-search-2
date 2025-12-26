import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ClickState } from "@/hooks/game/useClickState";

interface CharacterSelectMenuProps {
  clickState: ClickState | null;
  closeMenu: () => void;
  handleCharacterSelect: (characterId: string) => void;
  characterList: Array<{ found: boolean; imageUrl: string; id: string; name: string }>;
}

const CharacterSelectMenu = ({
  clickState,
  handleCharacterSelect,
  closeMenu,
  characterList,
}: CharacterSelectMenuProps) => {
  if (!clickState) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={closeMenu} />
      <Card
        className="fade-in-0 zoom-in-95 absolute z-50 animate-in p-2 shadow-lg"
        style={{
          left: `${clickState.viewport.x}px`,
          top: `${clickState.viewport.y}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-w-37.5 flex-col gap-1">
          {characterList.map((character) => (
            <Button
              key={character.id}
              variant="ghost"
              size="sm"
              className="justify-start"
              disabled={character.found}
              onClick={() => handleCharacterSelect(character.id)}
            >
              {character.name}
            </Button>
          ))}
        </div>
      </Card>
    </>
  );
};

export default CharacterSelectMenu;
