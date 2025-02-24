import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTestResult, getTargetUserResult } from "../api/testResults";
import TestForm from "../components/test/TestForm";
import TestResult from "../components/test/TestResult";
import { getLocaleTime } from "../utils/formatTime";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { checkToCompleteAnswers } from "../utils/validation";
import useUserStore from "../zustand/userStore";
import { ALERT_TYPE } from "../constant/alertConstant";
import { openAlert } from "../utils/openAlert";

const { ERROR, INFO } = ALERT_TYPE;
const TestPage = () => {
  const queryClient = useQueryClient();
  const [result, setResult] = useState(null);
  const { user } = useUserStore((state) => state);

  const getUserResult = async () => {
    try {
      const result = await getTargetUserResult(user);
      return result;
    } catch (error) {
      console.error(error);
      openAlert({ type: ERROR, text: error });
    }
  };

  const { data: userResult } = useQuery({
    queryKey: ["testResults", user?.userId, user?.nickname],
    queryFn: getUserResult,
    staleTime: Infinity,
    gcTime: 1000 * 60,
  });

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    const { userId, nickname } = user;
    const payload = {
      userId,
      nickname,
      result: mbtiResult,
      visibility: true,
      date: getLocaleTime(new Date()),
    };
    setResult(mbtiResult);
    try {
      await createTestResult(payload);
    } catch (error) {
      console.error(error);
      openAlert({ type: ERROR, text: error });
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleTestSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testResults"],
      });
    },
  });

  const checkValid = (answers) => {
    if (checkToCompleteAnswers(answers))
      return openAlert({ type: INFO, text: "문항을 모두 선택해 주세요." });
    const isDuplicated = userResult && userResult.length !== 0;
    if (isDuplicated)
      return openAlert({
        type: INFO,
        text: "동일한 닉네임으로 진행한 테스트가 존재합니다.",
      });

    return mutate(answers);
  };

  return (
    <div className=" flex flex-col items-center justify-center mx-auto">
      {!result ? (
        <article className="bg-white rounded-lg shadow-md min-w-lg h-full overflow-y-scroll w-[100%] p-4 sm:p-4  md:p-8 md:w-[60%]">
          <h1 className="text-3xl font-bold text-primary-color mb-6">
            MBTI 테스트
          </h1>
          <TestForm onSubmit={(answers) => checkValid(answers)} />
        </article>
      ) : (
        <TestResult result={result} />
      )}
    </div>
  );
};

export default TestPage;
