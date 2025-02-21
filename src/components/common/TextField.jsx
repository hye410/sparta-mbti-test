export default function TextField({
  label = null,
  type = "text",
  placeholder = "",
  id,
  value = "",
  onChange = null,
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        style={{ border: "1px solid #000" }}
        type={type}
        value={value?.[id]}
        placeholder={placeholder}
        onChange={(e) => onChange(e, id)}
      />
    </>
  );
}
