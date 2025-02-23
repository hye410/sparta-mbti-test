export const checkToCompleteAnswers = (answers) => {
  return answers.some((answer) => answer.type === "");
};
