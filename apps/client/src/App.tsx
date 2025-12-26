import { useEffect, useReducer } from "react";
import Game from "@/components/Game";
import LeaderboardPage from "@/components/LeaderboardPage";
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

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state?.view === "game" && state.levelId) {
        setPageState({ type: "START_GAME", levelId: state.levelId });
      } else if (state?.view === "leaderboard") {
        setPageState({ type: "VIEW_LEADERBOARD" });
      } else {
        setPageState({ type: "RESET" });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const resetToMainMenu = () => {
    setPageState({ type: "RESET" });

    window.history.pushState({ view: "select" }, "");
  };

  const startGame = (levelId: string) => {
    setPageState({ type: "START_GAME", levelId });

    window.history.pushState({ view: "game", levelId }, "");
  };

  const viewLeaderboard = (replace = false) => {
    setPageState({ type: "VIEW_LEADERBOARD" });

    if (replace) {
      window.history.replaceState({ view: "leaderboard" }, "");
    } else {
      window.history.pushState({ view: "leaderboard" }, "");
    }
  };

  return (
    <Layout>
      {currentView !== "select" && (
        <Button variant={"outline"} onClick={resetToMainMenu}>
          Back
        </Button>
      )}

      {currentView === "select" && (
        <>
          <div className="mb-8 flex justify-center">
            <Button size="lg" onClick={() => viewLeaderboard()}>
              View Leaderboards
            </Button>
          </div>
          <LevelSelect handleSelectLevel={startGame} />
        </>
      )}

      {currentView === "game" && selectedLevel && (
        <Game
          levelId={selectedLevel}
          onViewLeaderboard={() => viewLeaderboard(true)}
          onBackToMenu={resetToMainMenu}
        />
      )}

      {currentView === "leaderboard" && <LeaderboardPage />}
    </Layout>
  );
}

export default App;
