import { Link } from "react-router-dom";
import { signup } from "../api/auth";
import Form from "../components/common/Form";

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

export default function Signup() {
  const handleSubmit = async (e, userInfo) => {
    e.preventDefault();
    try {
      const res = await signup(userInfo);
      console.log("요청성공", res);
    } catch (error) {
      console.error(error);
      alert(`[${error.status}] ${error.message}`);
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
