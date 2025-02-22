import axios from "axios";

const API_URL = "http://localhost:4000/testResults";
const user = JSON.parse(sessionStorage.getItem("user"));

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  const filteredByVisibility = response.data.filter(
    (data) => user.userId === data.userId || data.visibility
  );
  return filteredByVisibility;
};

export const createTestResult = async (resultData) => {
  const response = await axios.post(API_URL, resultData);
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  console.log("response=>", response);
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, visibility);
  console.log("response=>", response);
};
