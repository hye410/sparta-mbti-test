import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/profile";
import Form from "../components/common/Form";
import useUserStore from "../zustand/userStore";

const profileFormData = (initNickname) => [
  {
    id: "nickname",
    label: "닉네임",
    type: "text",
    initValue: initNickname,
    placeholder: "닉네임",
    autoFocus: true,
  },
];

export default function MyPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const handleChangeProfile = async (e, newProfile) => {
    e.preventDefault();
    try {
      const res = await updateProfile(newProfile);
      setUser(newProfile);
      alert(res.message);
    } catch (error) {
      console.error(error);
      alert(error.message);
      if (error.code === 401) {
        navigate("/login", { replace: true });
      }
    }
  };
  return (
    <div className="formWrapper">
      <section className="form">
        <h3 className="h3">프로필 수정</h3>
        <Form
          formData={profileFormData(user.nickname ?? "")}
          handleSubmit={handleChangeProfile}
          submitButton="프로필 업데이트"
        />
      </section>
    </div>
  );
}
