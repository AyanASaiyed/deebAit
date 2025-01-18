import toast from "react-hot-toast";
import { useAuthContext } from "../Context/authContext";

export const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      sessionStorage.removeItem("username");
      setAuthUser(null);
      toast.success("Logged Out");
    } catch (error) {
      toast.error("Error Logging Out");
      console.log("Error in logout hook, ", error.message);
    }
  };

  return logout;
};
