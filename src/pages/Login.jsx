import { Link } from "react-router-dom";
import { signin } from "../api/auth";
import Form from "../components/common/Form";
import { useAuth } from "../context/AuthContext";

const loginFormdata = [
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
];

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (e, userInfo) => {
    e.preventDefault();
    try {
      const res = await signin(userInfo);
      login(res);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="formWrapper">
      <section className="form">
        <h3 className="h3">로그인</h3>
        <Form
          formData={loginFormdata}
          handleSubmit={handleSubmit}
          submitButton="로그인"
        />
        <p className="text-sm text-slate-400">
          아직 회원이 아니세요?{" "}
          <Link to="/signup" className="text-red-600 underline">
            회원가입
          </Link>
        </p>
      </section>
    </div>
  );
}
