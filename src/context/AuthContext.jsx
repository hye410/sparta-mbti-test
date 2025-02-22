import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const token = sessionStorage.getItem("accessToken");
const user = sessionStorage.getItem("user");
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userData, setUserData] = useState(JSON.parse(user));
  const navigate = useNavigate();
  const login = (userInfo) => {
    const { accessToken, userId, nickname, avatar } = userInfo;
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem(
      "user",
      JSON.stringify({ userId, nickname, avatar })
    );
    setIsAuthenticated(true);
    setUserData({ userId, nickname, avatar });
    navigate("/");
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
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
