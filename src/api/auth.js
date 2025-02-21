import axios from "axios";

const API_URL = "https://www.nbcamp-react-auth.link";

export const signup = async (userInfo) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userInfo);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || "알 수 없는 에러코드",
      message: error.response?.data?.message || "에러가 발생했습니다.",
    };
  }
};

export const signin = async (userInfo) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userInfo);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || "알 수 없는 에러",
      message: error.response?.data?.message || "에러가 발생했습니다.",
    };
  }
};
