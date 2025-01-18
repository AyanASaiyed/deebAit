// import React from 'react';

const ResultsPage = ({ results }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Results</h1>
      <p className="text-lg text-gray-600 mb-10">Here are the rankings:</p>

      <div className="w-3/4 bg-white shadow-md rounded-lg p-6">
        <ol className="list-decimal list-inside space-y-4">
          {results.map((result, index) => (
            <li key={index} className="text-gray-800">
              <p className="text-xl font-semibold">
                {result.name || `Participant ${index + 1}`}
              </p>
              <p className="text-gray-600">Score: {result.score}</p>
              <p className="text-gray-500 italic">{result.answer}</p>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        onClick={() => window.location.reload()} // Restart the game
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultsPage;
