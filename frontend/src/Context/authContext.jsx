import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem("username");
      console.log("Stored user from sessionStorage:", storedUser);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  });

  const value = {
    authUser,
    setAuthUser,
  };

  console.log("Provider value being passed:", value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
