import axios from "axios";

/**
로그인, 로그아웃, 프로필 변경을 처리하는 api
*/
export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
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

/**
 * json-server와 연결된 api / 테스트 등록, 수정, 삭제를 처리
 */
export const localApi = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_API,
});

// 통신 중 오류 발생 시 서버에서 내려오는 오류 메세지만 에러로 던져줌
localApi.interceptors.response.use(null, (reject) => {
  const { data } = reject.response;
  throw data?.message || "오류가 발생했습니다.";
});
