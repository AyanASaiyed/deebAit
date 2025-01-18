import React from "react";

const HomeScreen = () => {
  return (
    <div className="flex justify-center flex-center">
        <h1>You will be debating against a bot and will be up against playersStart by creating a username and clicking 'Start Game' to join a game!</h1>
      <input className="rounded-xl h-[10vh] w-[30vw]" />
      <button className="rounded-xl bg-green-700 text-white font-mono text-3xl p-4 hover:bg-green-900">Start Game</button>
    </div>
  );
};

export default HomeScreen;
