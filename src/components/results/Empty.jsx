import { Link } from "react-router-dom";
import { PATH } from "../../constant/pathConstant";

const { TEST } = PATH;
export default function Empty() {
  return (
    <div className="w-full h-full text-xl flex flex-col items-center justify-center text-center">
      <div className="mb-[3vw]">
        테스트 결과가 존재하지 않습니다.🥲
        <br /> 테스트를 먼저 진행해 주세요.
      </div>
      <Link to={TEST} replace className="button !w-[30%] !min-w-[280px]">
        🚀 테스트하러 가기
      </Link>
    </div>
  );
}
