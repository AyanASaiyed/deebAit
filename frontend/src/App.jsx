import { useState } from "react";
import StartGame from "./Pages/HomeScreen";
import GameScreen from "./Pages/GameScreen";
import ResultsPage from "./Pages/ResultScreen";

const App = () => {
  const [screen, setScreen] = useState("start");
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState([]);

  const handleStartGame = () => {
    const generatedQuestion =
      "What is the most impactful invention of the 21st century?";
    setQuestion(generatedQuestion);
    setScreen("game");
  };

  const handleJudgeAnswers = (judgedResults) => {
    setResults(judgedResults);
    setScreen("results");
  };

  return (
    <div>
      {screen === "start" && <StartGame onStartGame={handleStartGame} />}
      {screen === "game" && (
        <GameScreen question={question} onJudgeAnswers={handleJudgeAnswers} />
      )}
      {screen === "results" && <ResultsPage results={results} />}
    </div>
  );
};

export default App;
