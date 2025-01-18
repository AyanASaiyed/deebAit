export const useLogout = () => {
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
    } catch (error) {
      console.log("Error in logout hook, ", error.message);
    }
  };
};
