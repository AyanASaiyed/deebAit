import { useState, useEffect } from "react";

const GameScreen = ({ question, onJudgeAnswers }) => {
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // Timer in seconds
  const [submissions, setSubmissions] = useState(0);
  const totalParticipants = 4;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 || submissions === totalParticipants) {
      handleJudging();
    }
  }, [timeLeft, submissions]);

  const handleSubmit = () => {
    if (answer.trim() === "") {
      alert("Answer cannot be empty!");
      return;
    }
    setSubmissions((prev) => prev + 1);
    setAnswer("");
  };

  const handleJudging = () => {
    const dummyResults = [
      {
        name: "Alice",
        id: 1,
        score: 95,
        answer: "AI is the most impactful invention.",
      },
      {
        name: "Bob",
        id: 2,
        score: 89,
        answer: "Renewable energy advancements have had a massive impact.",
      },
      {
        name: "Charlie",
        id: 3,
        score: 85,
        answer: "Smartphones revolutionized communication.",
      },
      {
        name: "Dana",
        id: 4,
        score: 80,
        answer: "Space exploration innovations define this century.",
      },
    ];
    onJudgeAnswers(dummyResults); // Pass dummy results to parent
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Question:</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">{question}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        rows={5}
        className="w-3/4 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        disabled={timeLeft === 0 || submissions === totalParticipants}
      />

      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500 mb-4">
          Time Left: {timeLeft} seconds
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className={`${
            timeLeft === 0 || submissions === totalParticipants
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-6 rounded shadow-md transition`}
          disabled={timeLeft === 0 || submissions === totalParticipants}
        >
          Submit Answer
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Submissions: {submissions}/{totalParticipants}
        </p>
      </div>
    </div>
  );
};

export default GameScreen;
