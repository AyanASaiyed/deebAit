import toast from "react-hot-toast";
import { useAuthContext } from "../Context/authContext";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
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

      sessionStorage.setItem("username", JSON.stringify(data.username));
      setAuthUser(data);
      toast.success("Game Entered!");
    } catch (error) {
      toast.error(error.message);
      console.log("Error in login hook, ", error.message);
    }
  };

  return login;
};

export default useLogin;
