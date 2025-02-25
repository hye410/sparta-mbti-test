import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.nbcamp-react-auth.link",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const { accessToken } = response.data;
    if (accessToken) sessionStorage.setItem("accessToken", accessToken);
    delete response.data?.accessToken;
    return response;
  },
  (reject) => {
    const { data, status } = reject.response;
    throw {
      code: status || "unknown code",
      message: data?.message || "오류가 발생했습니다.",
    };
  }
);

export const localApi = axios.create({
  baseURL: "http://localhost:4000",
});

localApi.interceptors.response.use(null, (reject) => {
  const { data } = reject.response;
  throw data?.message || "오류가 발생했습니다.";
});
