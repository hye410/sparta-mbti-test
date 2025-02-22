import { useState } from "react";
import TestForm from "../components/test/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLocaleTime } from "../utils/formatTime";

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { userData } = useAuth();

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    const { userId, nickname } = userData;
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
      const { response } = error;
      alert(`[${response.status}]${response.data?.message}`);
    }
  };

  const handleNavigateToResults = () => {
    navigate("/results", { replace: true });
  };

  return (
    <div className=" flex flex-col items-center justify-center mx-auto">
      <article className="bg-white rounded-lg shadow-md min-w-lg h-full overflow-y-scroll w-[100%] p-4 sm:p-4  md:p-8 md:w-[60%]">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button onClick={handleNavigateToResults} className="button">
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </article>
    </div>
  );
};

export default TestPage;
