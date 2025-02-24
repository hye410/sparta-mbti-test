import { useEffect } from "react";

const { Kakao } = window;

const URL = "https://sparta-mbti-test.vercel.app/";

const shareByKaKao = () => {
  if (!Kakao) {
    console.error("카카오 SDK를 불러오지 못했습니다.");
    return;
  }
  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "MBTI TEST",
      description: "나의 MBTI는 무엇일까?🧐",
      link: {
        mobileWebUrl: URL,
        webUrl: URL,
      },
    },
    buttons: [
      {
        title: "테스트하러 가기 🚀",
        link: {
          mobileWebUrl: URL,
          webUrl: URL,
        },
      },
    ],
  });
};

export const SharedButton = () => {
  useEffect(() => {
    if (Kakao) {
      Kakao.cleanup();
      if (!Kakao.isInitialized()) {
        Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY); // 앱 키를 환경 변수에서 불러오기
      }
    }
  }, []);

  return (
    <button className="button !bg-slate-500" onClick={() => shareByKaKao()}>
      카카오톡 공유하기
    </button>
  );
};
