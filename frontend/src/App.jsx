import { Navigate, Route, Routes } from "react-router";
import HomeScreen from "./Pages/HomeScreen";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import GameScreen from "./Pages/GameScreen";
import ResultScreen from "./Pages/ResultScreen";

function App() {
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState([]);

  const handleStartGame = (enlistedPlayers) => {
    setPlayers(enlistedPlayers);
  };

  const resetGame = () => {
    setPlayers([]);
    setResults([]);
  };

  const handleJudgeAnswers = (judgedResults) => {
    setResults(
      judgedResults.map((result, index) => ({
        ...result,
        name: players[index],
      }))
    );
  };

  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            players.length === 0 ? (
              <HomeScreen onStartGame={handleStartGame} />
            ) : (
              <Navigate to={"/game"} />
            )
          }
        />
        <Route
          path="/game"
          element={
            players.length > 0 ? (
              <GameScreen
                players={players}
                onJudgeAnswers={handleJudgeAnswers}
              />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/result"
          element={
            players.length > 0 ? (
              <ResultScreen results={results} resetGame={resetGame} players={players} />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
