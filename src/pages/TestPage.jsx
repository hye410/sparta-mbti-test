import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTestResult } from "../api/testResults";
import TestForm from "../components/test/TestForm";
import TestResult from "../components/test/TestResult";
import { getLocaleTime } from "../utils/formatTime";
import { calculateMBTI } from "../utils/mbtiCalculator";
import useUserStore from "../zustand/userStore";

const TestPage = () => {
  const queryClient = useQueryClient();
  const [result, setResult] = useState(null);
  const { user } = useUserStore((state) => state);

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
      alert(error);
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

  return (
    <div className=" flex flex-col items-center justify-center mx-auto">
      <article className="bg-white rounded-lg shadow-md min-w-lg h-full overflow-y-scroll w-[100%] p-4 sm:p-4  md:p-8 md:w-[60%]">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={(answers) => mutate(answers)} />
          </>
        ) : (
          <TestResult result={result} />
        )}
      </article>
    </div>
  );
};

export default TestPage;
