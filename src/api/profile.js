import { api } from "./api";

const token = sessionStorage.getItem("accessToken");

export const updateProfile = async (newProfile) => {
  const response = await api.patch("/profile", newProfile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
