import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../../api/testResults";
import useUserStore from "../../zustand/userStore";
import { mbtiDescriptions } from "../../utils/mbtiCalculator";
import { openAlert } from "../../utils/openAlert.js";
import { ALERT_TYPE } from "../../constant/alertConstant.js";

const { WARNING, ERROR } = ALERT_TYPE;

const QUERY_KEY = "testResults";

export default function ResultCard({ result }) {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const isPostByThisUser = user.userId === result.userId;

  const handleChangeVisibility = async (changeData) => {
    try {
      const { postId, isVisible } = changeData;
      await updateTestResultVisibility(postId, { visibility: isVisible });
    } catch (error) {
      console.error(error);
      openAlert({ type: ERROR, text: error });
    }
  };

  const { mutate: mutateVisibility } = useMutation({
    mutationFn: handleChangeVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
    } catch (error) {
      console.error(error);
      openAlert({ type: ERROR, text: error });
    }
  };

  const { mutate: mutateDelete } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
    },
  });

  const confirmUserReq = (type) => {
    let text = "삭제하시겠습니까?",
      func = () => mutateDelete(result.id);
    if (type === "switch") {
      text = `${result.visibility ? "비공개" : "공개"}로 전환하시겠습니까?`;
      func = () =>
        mutateVisibility({
          postId: result.id,
          isVisible: !result.visibility,
        });
    }

    openAlert({
      type: WARNING,
      text,
    }).then((res) => {
      if (res.isConfirmed) func();
    });
  };

  return (
    <section className="w-[70%] max-w-[600px] min-w-[300px] bg-white px-[5vw] py-[4vw] lg:px-[2vw] lg:py-[3vh] mx-[auto] my-[30px] rounded-md shadow-md">
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
            onClick={() => confirmUserReq("switch")}
            className="button !w-[120px] !py-[10px] mr-5"
          >
            {result.visibility ? "비공개로 전환" : "공개로 전환"}
          </button>
          <button
            className="button !w-[70px] !py-[10px] !bg-red-500"
            onClick={() => confirmUserReq("delete")}
          >
            삭제
          </button>
        </div>
      )}
    </section>
  );
}
