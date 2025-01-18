import { useState } from "react";
import StartGame from "./Pages/HomeScreen";
import GameScreen from "./Pages/GameScreen";
import ResultsPage from "./Pages/ResultScreen";

const App = () => {
  const [screen, setScreen] = useState("start");
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState([]);

  const handleStartGame = (enteredUsername) => {
    setUsername(enteredUsername); // Save the username
    setQuestion("What is the most impactful invention of the 21st century?");
    setScreen("game");
  };

  const handleJudgeAnswers = (judgedResults) => {
    setResults(
      judgedResults.map((result, index) => ({
        ...result,
        name: index === 0 ? username : result.name, // Assign username to the first user
      }))
    );
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
