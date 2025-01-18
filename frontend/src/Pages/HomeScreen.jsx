import { useState } from "react";
import useLogin from "../Hooks/useLogin";

const HomeScreen = () => {
  const [username, setUsername] = useState();

  const login = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(username);
      console.log("login success");
    } catch (error) {
      console.log("Error in HomeScreen Login: ", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-4">
      <form onSubmit={handleLogin}>
        <input
          className="rounded-xl h-[10vh] w-[30vw] text-3xl font-mono"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className="rounded-xl bg-green-700 text-white font-mono text-3xl p-4 hover:bg-green-900">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default HomeScreen;
