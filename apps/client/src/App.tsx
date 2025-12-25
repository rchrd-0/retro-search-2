import { useReducer } from "react";
import LevelSelect from "@/components/LevelSelect";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

type View = "select" | "game" | "leaderboard";

type Action =
  | { type: "RESET" }
  | { type: "START_GAME"; levelId: string }
  | { type: "VIEW_LEADERBOARD" };

interface PageState {
  currentView: View | null;
  selectedLevel: string | null;
}

const reducer = (state: PageState, action: Action): PageState => {
  switch (action.type) {
    case "RESET":
      return { currentView: "select", selectedLevel: null };
    case "START_GAME":
      return { currentView: "game", selectedLevel: action.levelId };
    case "VIEW_LEADERBOARD":
      return { currentView: "leaderboard", selectedLevel: null };
    default:
      return state;
  }
};

function App() {
  const [{ currentView, selectedLevel }, setPageState] = useReducer(reducer, {
    currentView: "select",
    selectedLevel: null,
  });

  const resetToMainMenu = () => setPageState({ type: "RESET" });

  const startGame = (levelId: string) => setPageState({ type: "START_GAME", levelId });

  return (
    <Layout>
      {currentView !== "select" && (
        <Button variant={"outline"} onClick={resetToMainMenu}>
          Back
        </Button>
      )}

      {currentView === "select" && <LevelSelect handleSelectLevel={startGame} />}
    </Layout>
  );
}

export default App;
