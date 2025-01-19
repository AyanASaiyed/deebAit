import { useState } from "react";
import toast from "react-hot-toast";
import { usePlayers } from "../Hooks/usePlayers";

const HomeScreen = ({ onStartGame }) => {
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState([]);
  const persons = usePlayers();

  const handleJoin = () => {
    if (username.trim() === "") {
      toast.error("Username cannot be empty!");
      return;
    }
    setPlayers((prevPlayers) => [...prevPlayers, username.trim()]);
    setUsername("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleJoin();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (players.length === 0) {
      toast.error("Please Enter Atleast 1 Player");
      return;
    }

    try {
      console.log("Login success");
      persons(players);
      onStartGame(players);
    } catch (error) {
      console.log("Error in HomeScreen Login: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col overflow-scroll">
      <div className="text-black font-bold font-mono text-5xl mt-10">
        Welcome to Deeb<span className="text-blue-500">Ai</span>t!
      </div>
      <div className="h-[80vh] w-[80vw] rounded-xl mt-5 bg-blue-500 bg-opacity-15 border-4 border-white flex-col flex">
        <div className="flex items-center justify-center h-screen flex-col space-y-4">
          <div className="ext-xl rounded-xl border-2 p-4 border-white font-mono text-white mb-4">
            {players.length > 0 ? (
              <ul>
                {players.map((player, index) => (
                  <li key={index} className="text-2xl h-[4vh] rounded-xl ">
                    Player {index + 1}: {player}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No players joined yet.</p>
            )}
          </div>

          <form onSubmit={handleLogin} className="flex flex-col p-10">
            <input
              className="rounded-xl h-[10vh] w-[30vw] text-3xl font-mono p-3"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress} // Detect Enter key
            />
            <button
              type="submit"
              className="rounded-xl bg-green-700 text-white font-mono text-3xl p-4 mt-10 hover:bg-green-900"
            >
              Start Game
            </button>
          </form>

          <button
            type="button"
            onClick={handleJoin}
            className="rounded-xl bg-blue-700 text-white font-mono text-3xl p-4 mt-10 hover:bg-blue-900"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
