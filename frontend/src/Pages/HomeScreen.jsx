import { useState } from "react";

const StartGame = ({ onStartGame }) => {
  const [username, setUsername] = useState("");

  const handleStartGame = () => {
    if (username.trim() === "") {
      alert("Please enter a username to continue.");
      return;
    }
    onStartGame(username);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Debate Arena</h1>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Enter your username to join the debate!
      </p>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      <button
        type="button"
        onClick={handleStartGame}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition"
      >
        Start New Debate
      </button>
    </div>
  );
};

export default StartGame;
