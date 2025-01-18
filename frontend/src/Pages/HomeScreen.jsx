// import React from "react";

const StartGame = ({ onStartGame, onJoinGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Debate Arena</h1>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Compete to give the best answer to an open-ended question!
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onStartGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition"
        >
          Start New Debate
        </button>
        <button
          type="button"
          onClick={onJoinGame}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded shadow-md transition"
        >
          Join Debate
        </button>
      </div>
    </div>
  );
};

export default StartGame;
