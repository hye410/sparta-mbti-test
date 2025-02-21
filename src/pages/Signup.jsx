import { useState } from "react";
import { signup } from "../api/auth";

export default function Signup() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickName: "",
  });

  const handleUserForm = (e, target) => {
    setFormData({ ...formData, [target]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      console.log("요청성공", res);
    } catch (error) {
      console.error(error);
      alert(`[${error.status}] ${error.message}`);
    }
  };
  
  return (
    <section>
      <h3>회원가입</h3>
      <form onSubmit={handleSubmit}>
        <input
          style={{ border: "1px solid #000" }}
          type="text"
          value={formData.id}
          onChange={(e) => handleUserForm(e, "id")}
        />
        <input
          style={{ border: "1px solid #000" }}
          type="password"
          value={formData.password}
          onChange={(e) => handleUserForm(e, "password")}
        />
        <input
          style={{ border: "1px solid #000" }}
          type="text"
          value={formData.nickName}
          onChange={(e) => handleUserForm(e, "nickName")}
        />
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
