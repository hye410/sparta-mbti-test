import { useState } from "react";
import TextField from "./TextField";

export default function Form({
  formData,
  handleSubmit,
  submitButton = "완료",
}) {
  const [form, setForm] = useState({ id: "", password: "" });
  const handleFormChange = (e, formId) => {
    setForm({ ...form, [formId]: e.target.value });
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e, form)}
      className="bg-zinc-50 w-[90%] py-[35px] px-[40px] mb-[20px] rounded-md shadow-md"
    >
      {formData.map((data) => (
        <TextField
          key={data.id}
          id={data.id}
          type={data.type}
          autoFocus={data.autoFocus}
          value={form[data.id]}
          placeholder={data.placeholder}
          onChange={handleFormChange}
        />
      ))}
      <button type="submit" className="button">
        {submitButton}
      </button>
    </form>
  );
}
