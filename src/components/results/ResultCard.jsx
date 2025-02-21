import { mbtiDescriptions } from "../../utils/mbtiCalculator";

export default function ResultCard({ result }) {
  return (
    <section className="w-[70%] max-w-[600px] min-w-[300px] bg-white px-[2vw] py-[3vh] mx-[auto] my-[30px] rounded-md shadow-md">
      <div className="flex items-center justify-between pb-[20px] mb-[20px] border-b-2 border-b-slate-700">
        <p className="text-xl  font-bold ">{result.nickname}</p>
        <span className="text-xs">{result.date}</span>
      </div>
      <h3 className="h3 !text-left !mb-[10px] !text-amber-500">
        {result.result}
      </h3>
      <p className="text-justify text-md/5 break-keep">
        {mbtiDescriptions[result.result]}
      </p>
    </section>
  );
}
