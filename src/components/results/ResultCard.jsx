import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../../api/testResults";
import { useAuth } from "../../context/AuthContext";
import { mbtiDescriptions } from "../../utils/mbtiCalculator";

export default function ResultCard({ result }) {
  const queryClient = useQueryClient();
  const { userData } = useAuth();
  const isPostByThisUser = userData.userId === result.userId;

  const handleChangeVisibility = async (changeData) => {
    try {
      const { postId, isVisible } = changeData;
      await updateTestResultVisibility(postId, { visibility: isVisible });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const { mutate: mutateVisibility } = useMutation({
    mutationFn: handleChangeVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testResults"],
      });
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testResults"],
      });
    },
  });

  return (
    <section className="w-[70%] max-w-[600px] min-w-[300px] bg-white px-[2vw] py-[3vh] mx-[auto] my-[30px] rounded-md shadow-md">
      <div className="flex items-center justify-between pb-[20px] mb-[20px] border-b-2 border-b-slate-700">
        <p className="text-xl  font-bold ">{result.nickname}</p>
        <span className="text-xs">{result.date}</span>
      </div>
      <h3 className="h3 !text-left !mb-[10px] !text-amber-500">
        {result.result}
      </h3>
      <p className="text-justify text-md/5">
        {mbtiDescriptions[result.result]}
      </p>
      {isPostByThisUser && (
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() =>
              mutateVisibility({
                postId: result.id,
                isVisible: !result.visibility,
              })
            }
            className="button !w-[120px] !py-[10px] mr-5"
          >
            {result.visibility ? "비공개로 전환" : "공개로 전환"}
          </button>
          <button
            className="button !w-[70px] !py-[10px] !bg-red-500"
            onClick={() => mutateDelete(result.id)}
          >
            삭제
          </button>
        </div>
      )}
    </section>
  );
}
