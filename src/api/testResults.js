import { localApi } from "./api";

export const getTestResults = async () => {
  const response = await localApi.get("/testResults");
  return response.data;
};

export const createTestResult = async (resultData) => {
  const response = await localApi.post("/testResults", resultData);
  return response.data;
}; //TODO: 요청할 때 유효성 체크

export const deleteTestResult = async (id) => {
  const response = await localApi.delete(`/testResults/${id}`);
  console.log("response=>", response);
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await localApi.patch(`/testResults/${id}`, visibility);
  console.log("response=>", response);
}; //TODO: 요청할 때 유효성 체크
