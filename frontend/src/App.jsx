import { Navigate, Route, Routes } from "react-router";
import HomeScreen from "./Pages/HomeScreen";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./Context/authContext";
import GameScreen from "./Pages/GameScreen";
import ResultScreen from "./Pages/ResultScreen";

function App() {
  const context = useAuthContext();
  const { authUser } = context;
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
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to={"/game"} /> : <HomeScreen onStartGame={handleStartGame}/>}
        />
        <Route
          path="/game"
          element={
            authUser ? (
              <GameScreen
                question={question}
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
            authUser ? (
              <ResultScreen results={results} />
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
