export default function TextField({
  label = null,
  type = "text",
  placeholder = "",
  id,
  value = "",
  autoFocus = false,
  onChange = null,
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        className="rounded-md shadow-md px-[10px] py-[15px] mb-[20px] border-gray-200 w-full"
        type={type}
        value={value?.[id]}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e, id)}
      />
    </>
  );
}
