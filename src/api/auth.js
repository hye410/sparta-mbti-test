import { api } from "./api";

export const signup = async (userInfo) => {
  const response = await api.post("/register", userInfo);
  return response.data;
};

export const signin = async (userInfo) => {
  const response = await api.post("/login", userInfo);
  return response.data;
};
