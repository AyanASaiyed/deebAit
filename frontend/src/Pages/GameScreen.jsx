import { useAnswers } from "../Hooks/useAnswers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GameScreen = ({ players, onJudgeAnswers }) => {
  const responses = useAnswers();
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [submissions, setSubmissions] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("Loading question...");
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
      handleJudging();
    }
  }, [timeLeft, submissions]);

  const handleSubmit = () => {
    if (answer.trim() === "") {
      alert("Answer cannot be empty!");
      return;
    }
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { player: players[submissions], answer },
    ]);
    setSubmissions((prev) => prev + 1);
    setAnswer("");
  };

  const handleJudging = async () => {
    responses(answers);
    onJudgeAnswers(answers);

    try {
      const res = await fetch("http://localhost:4000/ai/generate-verdict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opinions: answers.map((answer) => answer.answer),
          question,
          players,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      navigate("/result", {
        state: { verdict: data.verdict, answers: answers, players: players },
      });
    } catch (error) {
      console.error("Error generating verdict: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Question</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">{question}</p>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Player: {players[submissions]}
      </p>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        rows={5}
        className="w-3/4 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        disabled={timeLeft === 0 || submissions === players.length}
      />

      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-4">
          Time Left: {timeLeft} seconds
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className={`${
            timeLeft === 0 || submissions === players.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-6 rounded shadow-md transition`}
          disabled={timeLeft === 0 || submissions === players.length}
        >
          Submit Answer
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Submissions: {submissions}/{players.length}
        </p>
      </div>
    </div>
  );
};

export default GameScreen;
