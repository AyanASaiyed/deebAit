export const usePlayers = () => {
  const persons = async (players) => {
    try {
      const res = await fetch("http://localhost:4000/auth/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persons: players }),
      });

      console.log(res);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();

      sessionStorage.setItem("players", players);
      console.log("PLAYERS: ", players);
      console.log("DATA: ", data);
    } catch (error) {
      console.log("Error in Players Hook: ", error);
    }
  };

  return persons;
};
