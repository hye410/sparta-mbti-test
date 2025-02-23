import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.nbcamp-react-auth.link",
});

api.interceptors.response.use(null, (reject) => {
  const { data, status } = reject.response;
  throw {
    code: status || "unknown code",
    message: data?.message || "오류가 발생했습니다.",
  };
});

export const localApi = axios.create({
  baseURL: "http://localhost:4000",
});

localApi.interceptors.response.use(null, (reject) => {
  const { data } = reject.response;
  throw data?.message || "오류가 발생했습니다.";
});
