import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = ({ resetGame, players }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { verdict, answers } = state || {
    verdict: "",
    answers: [],
  };

  const handleReplay = async () => {
    try {
      resetGame();
      navigate("/");
    } catch (error) {
      console.log("Error Restarting Game: ", error.message);
    }
  };

  const highlightEndIndex = verdict.indexOf("}") + 1;
  const highlightedText =
    highlightEndIndex > 0 ? verdict.slice(0, highlightEndIndex) : "";
  const remainingText =
    highlightEndIndex > 0 ? verdict.slice(highlightEndIndex) : verdict;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Results</h1>
      <p className="text-lg text-gray-600 mb-10">Here are the rankings:</p>

      <div className="w-3/4 bg-white shadow-md rounded-lg p-6">
        <ol className="list-decimal list-inside space-y-4">
          {answers.map((result, index) => (
            <li key={index} className="text-gray-800">
              <p className="text-xl font-semibold">
                {players[index] || `Participant ${index + 1}`}
              </p>
              <p className="text-gray-600">Response: {result.answer}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-6 text-xl font-semibold text-gray-700">
          Judge's Verdict:
        </h2>
        <p className="text-black mt-2 text-xl">
          <span className="text-blue-500 font-bold">{highlightedText}</span>
          <br />
          <br />
          {remainingText}
        </p>
      </div>

      <button
        type="button"
        onClick={handleReplay}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultsPage;
