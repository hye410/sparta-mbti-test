import { useState } from "react";
import TextField from "./TextField";

export default function Form({
  formData,
  handleSubmit,
  SubmitButton = "완료",
}) {
  const [form, setForm] = useState({ id: "", password: "" });
  const handleFormChange = (e, formId) => {
    setForm({ ...form, [formId]: e.target.value });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e, form)}>
      {formData.map((data) => (
        <TextField
          key={data.id}
          id={data.id}
          type={data.type}
          value={form[data.id]}
          placeholder={data.placeholder}
          onChange={handleFormChange}
        />
      ))}
      <button type="submit">{SubmitButton}</button>
    </form>
  );
}
