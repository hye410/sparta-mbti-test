import { JSON_SERVER_PATH } from "../constant/pathConstant";
import { localApi } from "./api";
const { TEST_RESULTS } = JSON_SERVER_PATH;
/**
 * 모든 테스트 결과를 불러오는 api
 * @returns {Array<object>}
 */
export const getTestResults = async () => {
  const response = await localApi.get(TEST_RESULTS);
  return response.data;
};

/**
 * 특정 유저의 테스트 결과를 불러오는 api
 * @param {object} userData
 * @returns  {Array<object>}
 */
export const getTargetUserResult = async (userData) => {
  const { userId, nickname } = userData;
  const response = await localApi.get(
    `${TEST_RESULTS}?userId=${userId}&nickname=${nickname}`
  );
  return response.data;
};

/**
 * 테스트 결과를 서버에 전송하는 api
 * @param {object} resultData
 * @returns {object}
 */
export const createTestResult = async (resultData) => {
  const response = await localApi.post(TEST_RESULTS, resultData);
  return response.data;
};

/**
 * 테스트 결과를 삭제하는 api
 * @param {string} id
 */
export const deleteTestResult = async (id) => {
  await localApi.delete(`${TEST_RESULTS}/${id}`);
};

/**
 * 테스트 결과의 공개/비공개를 설정하는 api
 * @param {string} id
 * @param {boolean} visibility
 */
export const updateTestResultVisibility = async (id, visibility) => {
  await localApi.patch(`${TEST_RESULTS}/${id}`, visibility);
};
