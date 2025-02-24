import { api } from "./api";

/**
 * 회원가입 요청 api
 * @param {object} userInfo
 * @returns {object}
 */
export const signup = async (userInfo) => {
  const response = await api.post("/register", userInfo);
  return response.data;
};

/**
 * 로그인 요청 api
 * @param {object} userInfo
 * @returns {object}
 */
export const signin = async (userInfo) => {
  const response = await api.post("/login", userInfo);
  return response.data;
};
