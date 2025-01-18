import toast from "react-hot-toast";

const useLogin = () => {
  const login = async (username) => {
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();

      console.log(data);

      localStorage.setItem("username", JSON.stringify(data));
      toast.success("Game Entered!");
    } catch (error) {}
  };

  return login;
};

export default useLogin;
