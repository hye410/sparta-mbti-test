/**
 * 테스트 문항을 전부 체크했는지 유효성 검사를 하는 함수
 * @param {array} answers
 * @returns
 */
export const checkToCompleteAnswers = (answers) => {
  return answers.some((answer) => answer.type === "");
};
