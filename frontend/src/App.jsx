import HomeScreen from "./Pages/HomeScreen";

function App() {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-white font-mono text-5xl mt-10">
        Welcome to Deeb<span className="text-blue-500">Ai</span>t!
      </div>
      <div className="h-[80vh] w-[80vw] rounded-xl mt-5 bg-slate-400 bg-opacity-15 border-4 border-white">
        <HomeScreen />
      </div>
    </div>
  );
}

export default App;
