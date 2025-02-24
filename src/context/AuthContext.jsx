import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../zustand/userStore";
const AuthContext = createContext();

const token = sessionStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const { setUser, initUser } = useUserStore((state) => state);

  const navigate = useNavigate();
  const login = (userInfo) => {
    const { userId, nickname, avatar } = userInfo;
    setUser({ userId, nickname, avatar });
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    initUser();
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};
