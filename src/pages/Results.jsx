import { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import ResultCard from "../components/results/ResultCard";

export default function Results() {
  const [results, setResults] = useState(null);
  useEffect(() => {
    const getAllResults = async () => {
      try {
        const res = await getTestResults();
        setResults(res);
      } catch (error) {
        console.error(error);
      }
    };
    getAllResults();
  }, []);

  return results?.map((result) => (
    <ResultCard result={result} key={`${result.nickname}_result`} />
  ));
}
