import { useState } from "react";
import { signin } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const { login } = useAuth();

  const handleChangeFormData = (e, target) => {
    setFormData({ ...formData, [target]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signin(formData);
      login(res);
    } catch (error) {
      console.error(error);
      alert(`[${error.status}] ${error.message}`);
    }
  };
  return (
    <section>
      <h3>로그인</h3>
      <form onSubmit={handleSubmit}>
        <input
          style={{ border: "1px solid #000" }}
          type="text"
          value={formData.id}
          onChange={(e) => handleChangeFormData(e, "id")}
        />
        <input
          style={{ border: "1px solid #000" }}
          type="password"
          value={formData.password}
          onChange={(e) => handleChangeFormData(e, "password")}
        />
        <button type="submit">로그인</button>
      </form>
    </section>
  );
}
