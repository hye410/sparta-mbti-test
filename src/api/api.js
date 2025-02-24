import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

api.interceptors.response.use(null, (reject) => {
  const { data, status } = reject.response;
  throw {
    code: status || "unknown code",
    message: data?.message || "오류가 발생했습니다.",
  };
});

export const localApi = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_API,
});

localApi.interceptors.response.use(null, (reject) => {
  const { data } = reject.response;
  throw data?.message || "오류가 발생했습니다.";
});
