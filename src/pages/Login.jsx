import { signin } from "../api/auth";
import Form from "../components/common/Form";
import { useAuth } from "../context/AuthContext";

const loginFormdata = [
  {
    id: "id",
    type: "text",
    initValue: "",
    placeholder: "아이디",
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
      alert(`[${error.status}] ${error.message}`);
    }
  };
  return (
    <section>
      <h3>로그인</h3>
      <Form
        formData={loginFormdata}
        handleSubmit={handleSubmit}
        SubmitButton="로그인"
      />
    </section>
  );
}
