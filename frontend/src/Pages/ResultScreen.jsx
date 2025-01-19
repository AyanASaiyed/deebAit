import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = ({ resetGame }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { verdict, answers, players } = state || {
    verdict: "",
    answers: [],
    players: [],
  };

  const handleReplay = async () => {
    try {
      resetGame();
      navigate("/");
    } catch (error) {
      console.log("Error Restarting Game: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-[80vw] rounded-xl bg-blue-500 bg-opacity-15 border-4 border-white p-8">
        <h1 className="text-4xl font-bold font-mono text-gray-800 mb-4">
          Results
        </h1>
        <p className="text-lg text-gray-600 font-mono mb-8">
          Here are the rankings:
        </p>

        <div className="w-full bg-white shadow-md rounded-lg p-6 mb-8">
          <ol className="list-decimal list-inside space-y-4">
            {answers.map((result, index) => (
              <li key={index} className="text-gray-800 font-mono">
                <p className="text-xl font-semibold font-mono">
                  {players[index] || `Participant ${index + 1}`}
                </p>
                <p className="text-gray-600 font-mono">
                  Response: {result.answer}
                </p>
              </li>
            ))}
          </ol>
          <h2 className="mt-6 text-xl font-semibold font-mono text-gray-700">
            Judge's Verdict:
          </h2>
          <p className="text-gray-800 font-mono mt-2">{verdict}</p>
        </div>

        <button
          type="button"
          onClick={handleReplay}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold font-mono py-3 px-6 rounded shadow-md transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
