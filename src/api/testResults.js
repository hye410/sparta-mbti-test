import { localApi } from "./api";

const user = JSON.parse(sessionStorage.getItem("user"));

export const getTestResults = async () => {
  const response = await localApi.get("/testResults");
  const filteredByVisibility = response.data.filter(
    (data) => user.userId === data.userId || data.visibility
  );
  return filteredByVisibility;
};

export const createTestResult = async (resultData) => {
  const response = await localApi.post("/testResults", resultData);
  return response.data;
}; //TODO: 요청할 때 intercept해서 유효성 체크

export const deleteTestResult = async (id) => {
  const response = await localApi.delete(`/testResults/${id}`);
  console.log("response=>", response);
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await localApi.patch(`/testResults/${id}`, visibility);
  console.log("response=>", response);
}; //TODO: 요청할 때 intercept해서 유효성 체크
