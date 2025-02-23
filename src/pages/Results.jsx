import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResults";
import ResultCard from "../components/results/ResultCard";
import useUserStore from "../zustand/userStore";

export default function Results() {
  const { user } = useUserStore((state) => state);
  const getResults = async () => {
    try {
      const res = await getTestResults();
      return res;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const {
    data: results,
    isPending,
    isError,
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

  if (isPending) {
    return <div>데이터 로딩 중...</div>;
  }
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return results?.map((result) => (
    <ResultCard result={result} key={`resultCard_${result.id}`} />
  ));
}
