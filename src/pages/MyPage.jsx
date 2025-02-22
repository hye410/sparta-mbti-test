import { updateProfile } from "../api/profile";
import Form from "../components/common/Form";

const profileFormData = [
  {
    id: "nickname",
    label: "닉네임",
    type: "text",
    initValue: "",
    placeholder: "닉네임",
    autoFocus: true,
  },
];

export default function MyPage() {
  const handleChangeProfile = async (e, newProfile) => {
    e.preventDefault();
    try {
      await updateProfile(newProfile);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <div className="formWrapper">
      <section className="form">
        <h3 className="h3">프로필 수정</h3>
        <Form
          formData={profileFormData}
          handleSubmit={handleChangeProfile}
          submitButton="변경"
        />
      </section>
    </div>
  );
}
