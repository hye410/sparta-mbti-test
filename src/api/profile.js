import { api } from "./api";

export const updateProfile = async (newProfile) => {
  const response = await api.patch("/profile", newProfile);
  return response.data;
};
