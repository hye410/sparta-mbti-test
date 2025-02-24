import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResults";
import ResultCard from "../components/results/ResultCard";
import useUserStore from "../zustand/userStore";
import { openAlert } from "../utils/openAlert";
import { ALERT_TYPE } from "../constant/alertConstant";
import Empty from "../components/results/Empty";
import Loading from "../components/common/Loading";
const { ERROR } = ALERT_TYPE;
export default function Results() {
  const { user } = useUserStore((state) => state);
  const getResults = async () => {
    try {
      const res = await getTestResults();
      return res;
    } catch (error) {
      console.error(error);
      openAlert({
        type: ERROR,
        text: error,
      });
    }
  };

  const {
    data: results,
    isPending,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["testResults"],
    queryFn: getResults,
    staleTime: 1000 * 60 * 3, //3분 유지
    refetchOnWindowFocus: false,
    select: (results) => {
      return results.filter(
        (result) => user.userId === result.userId || result.visibility
      );
    },
  });

  if (isFetching || isPending) {
    return <Loading notification={"데이터를 받아오는 중..."} />;
  }

  if (isError) {
    return (
      <div className="w-[full]  flex items-center justify-center text-2xl">
        ‼️ 에러가 발생했습니다.
      </div>
    );
  }

  return results.length === 0 ? (
    <Empty />
  ) : (
    results.map((result) => (
      <ResultCard result={result} key={`resultCard_${result.id}`} />
    ))
  );
}
