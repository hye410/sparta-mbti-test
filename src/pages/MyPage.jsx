import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/profile";
import Form from "../components/common/Form";
import useUserStore from "../zustand/userStore";
import { openAlert } from "../utils/openAlert";
import { ALERT_TYPE } from "../constant/alertConstant";
import { PATH } from "../constant/pathConstant";

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
const { SUCCESS, ERROR } = ALERT_TYPE;
const { LOGIN } = PATH;
export default function MyPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const handleChangeProfile = async (e, newProfile) => {
    e.preventDefault();
    try {
      const res = await updateProfile(newProfile);
      setUser(newProfile);
      openAlert({
        type: SUCCESS,
        text: res.message,
      });
    } catch (error) {
      console.error(error);
      openAlert({
        type: ERROR,
        text: error.message,
      }).then((res) => {
        if (res.isConfirmed) {
          error.code === 401 ? navigate(LOGIN, { replace: true }) : null;
        }
      });
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
