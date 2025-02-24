import { useNavigate } from "react-router-dom";
import { mbtiDescriptions } from "../../utils/mbtiCalculator";
import { SharedButton } from "../common/SharedButton";
import { PATH } from "../../constant/pathConstant";
const { RESULT } = PATH;
export default function TestResult({ result }) {
  const navigate = useNavigate();
  const handleNavigateToResults = () => {
    navigate(RESULT, { replace: true });
  };
  return (
    <section className="bg-white rounded-lg shadow-md min-w-lg h-full overflow-y-scroll w-[100%] max-w-[700px] p-4 sm:p-4  md:p-8 md:w-[60%] ">
      <h1 className="text-3xl font-bold text-primary-color mb-6">
        테스트 결과: {result}
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        {mbtiDescriptions[result] || "해당 성격 유형에 대한 설명이 없습니다."}
      </p>
      <button onClick={handleNavigateToResults} className="button">
        결과 페이지로 이동하기
      </button>
      <SharedButton />
    </section>
  );
}
