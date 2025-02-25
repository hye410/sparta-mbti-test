import { api } from "./api";

/**
 * 프로필 변경 요청 api
 * @param {object} newProfile
 * @returns {object}
 */
export const updateProfile = async (newProfile) => {
  const response = await api.patch("/profile", newProfile);
  return response.data;
};
