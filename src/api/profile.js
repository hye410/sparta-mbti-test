import axios from "axios";

const API_URL = "https://www.nbcamp-react-auth.link";
const token = sessionStorage.getItem("accessToken");

export const updateProfile = async (newProfile) => {
  try {
    const response = await axios.patch(`${API_URL}/profile`, newProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || "알 수 없는 에러",
      message: error.response?.data?.message || "에러가 발생했습니다.",
    };
  }
};
