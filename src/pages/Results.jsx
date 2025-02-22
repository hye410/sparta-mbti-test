import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResults";
import ResultCard from "../components/results/ResultCard";

export default function Results() {
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
    staleTime: 1000 * 2, //3분 유지
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <div>데이터 로딩 중...</div>;
  }
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return results?.map((result) => (
    <ResultCard result={result} key={`${result.nickname}_result`} />
  ));
}
