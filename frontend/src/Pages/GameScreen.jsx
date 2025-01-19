import { useAnswers } from "../Hooks/useAnswers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GameScreen = ({ players, currentPlayerIndex, onJudgeAnswers }) => {
  const responses = useAnswers();
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [submissions, setSubmissions] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("Loading question...");
  const [rankings, setRankings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch("http://localhost:4000/ai/generate-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }
        const data = await res.json();
        setQuestion(data.question);
      } catch (error) {
        console.error("Error fetching question: ", error.message);
        setQuestion("Failed to load question. Please refresh.");
      }
    };

    fetchQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 || submissions === players.length) {
      setTimeLeft(0);
      handleJudging();
    }
  }, [timeLeft, submissions]);

  const handleSubmit = () => {
    if (answer.trim() === "") {
      alert("Answer cannot be empty!");
      return;
    }

    // Ask for confirmation
    const confirmed = window.confirm(
      `Are you sure you want to submit your answer: "${answer}"?`
    );

    if (!confirmed) {
      return; // Exit if the user cancels
    }

    // Add the answer to the answers array
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { player: players[submissions], answer },
    ]);
    setSubmissions((prev) => prev + 1);
    setAnswer(""); // Clear the input
    setTimeLeft(120); //Reset timer
  };

  const handleJudging = async () => {
    responses(answers, players);
    onJudgeAnswers(answers);

    try {
      const res = await fetch("http://localhost:4000/ai/generate-verdict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opinions: answers.map((answer) => answer.answer),
          question,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      // Pass the verdict along with the answers to the ResultsPage
      navigate("/result", {
        state: {
          verdict: data.verdict,
          answers: answers,
          players: players,
          rankings: rankings,
        },
      });
    } catch (error) {
      console.error("Error generating verdict: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-[80vh] w-[80vw] rounded-xl bg-blue-500 bg-opacity-15 border-4 border-white flex-col flex">
        <div className="flex items-center justify-center h-screen flex-col ">
          <p className="text-3xl font-mono text-white border-4 p-3 rounded-xl mb-4">
            Time Left: {timeLeft} seconds
          </p>
          <h2 className="text-4xl font-bold font-mono text-black mb-4">
            Question
          </h2>
          <p className="text-lg text-gray-600 font-mono mb-4 text-center">
            {question}
          </p>
          <p className="text-lg text-gray-600 font-mono mb-4 text-center">
            Player: {players[submissions]}
          </p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            rows={5}
            className="w-3/4 p-4 border font-mono border-gray-300 rounded-lg shadow-md focus:outline-none justify-center focus:ring-2 focus:ring-blue-500 mb-6"
            disabled={timeLeft === 0 || submissions === players.length}
          />

          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className={`${
                timeLeft === 0 || submissions === players.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold font-mono py-2 px-6 rounded shadow-md transition`}
              disabled={timeLeft === 0 || submissions === players.length}
            >
              Submit Answer
            </button>
            <p className="text-sm font-mono text-gray-500 mt-4">
              Submissions: {submissions}/{players.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
