import { useState } from "react";
import useLogin from "../Hooks/useLogin";

const HomeScreen = ({onStartGame}) => {
  const [username, setUsername] = useState();

  const login = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(username);
      console.log("login success");
      if (username.trim() === "") {
        alert("Please enter a username to continue.");
        return;
      }
      onStartGame(username);
    } catch (error) {
      console.log("Error in HomeScreen Login: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-black font-mono text-5xl mt-10">
        Welcome to Deeb<span className="text-blue-500">Ai</span>t!
      </div>
      <div className="h-[80vh] w-[80vw] rounded-xl mt-5 bg-blue-500 bg-opacity-15 border-4 border-white flex-col flex">
        <div className="flex items-center justify-center h-screen flex-col space-y-2">
          <form onSubmit={handleLogin} className="flex flex-col p-10">
            <input
              className="rounded-xl h-[10vh] w-[30vw] text-3xl font-mono p-3"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button className="rounded-xl bg-green-700 text-white font-mono text-3xl p-4 mt-10 hover:bg-green-900">
              Start Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
