import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import Form from "../components/common/Form";
import { openAlert } from "../utils/openAlert";
import { ALERT_TYPE } from "../constant/alertConstant";

const signupFormData = [
  {
    id: "id",
    type: "text",
    initValue: "",
    placeholder: "아이디",
    autoFocus: true,
  },
  {
    id: "password",
    type: "password",
    initValue: "",
    placeholder: "비밀번호",
  },
  {
    id: "nickname",
    type: "text",
    initValue: "",
    placeholder: "닉네임",
  },
];

const { SUCCESS, ERROR } = ALERT_TYPE;
export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e, userInfo) => {
    e.preventDefault();
    try {
      await signup(userInfo);
      openAlert({
        type: SUCCESS,
        text: `${userInfo.nickname}님 환영합니다! 로그인을 해주세요.`,
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      openAlert({ type: ERROR, text: error.message });
    }
  };

  return (
    <div className="formWrapper">
      <section className="form">
        <h3 className="h3">회원가입</h3>
        <Form
          formData={signupFormData}
          handleSubmit={handleSubmit}
          submitButton="회원가입"
        />
        <p className="text-sm text-slate-400">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-red-600 underline">
            로그인
          </Link>
        </p>
      </section>
    </div>
  );
}
