import { api } from "./api";

const token = sessionStorage.getItem("accessToken");

/**
 * 프로필 변경 요청 api
 * @param {object} newProfile
 * @returns {object}
 */
export const updateProfile = async (newProfile) => {
  const response = await api.patch("/profile", newProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
