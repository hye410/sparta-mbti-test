import { useNavigate } from "react-router-dom";
import Card from "../components/home/Card";
import { PATH } from "../constant/pathConstant";
import { useAuth } from "../context/AuthContext";

const CardData = [
  {
    title: "성격 유형 검사",
    desc: "자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지 알아보세요.",
  },
  {
    title: "성격 유형 이해",
    desc: "다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다.",
  },
  {
    title: "팀 평가",
    desc: "팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을 배워보세요.",
  },
];

const { LOGIN, TEST } = PATH;

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const moveToTestPage = () => {
    return navigate(isAuthenticated ? TEST : LOGIN);
  };

  return (
    <section className="flex flex-col items-center justify-center h-svh md:h-full">
      <h1 className="h3">무료 성격 테스트</h1>
      <p className="mb-[40px] text-lg lg:text-2xl">
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </p>
      <div className="flex flex-wrap gap-8 justify-center mb-[50px]">
        {CardData.map((data) => (
          <Card
            key={`home_card_${data.title}`}
            title={data.title}
            desc={data.desc}
          />
        ))}
      </div>
      <button className="button !w-[50%] " onClick={moveToTestPage}>
        내 성격 알아보러 가기
      </button>
    </section>
  );
}
