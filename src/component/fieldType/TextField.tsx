import { TextField } from "@mui/material";
type TextFieldType = {
  error: boolean;
  errorMessage: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  label: string;
  name: string;
  type: string;
  placeholder: string;
};
export function TextFieldComponent({
  error,
  errorMessage,
  value,
  onChange,
  label,
  name,
  type,
  placeholder,
}: TextFieldType) {
  return (
    <>
      <TextField
        label={label}
        fullWidth
        value={value}
        onChange={onChange}
        variant="outlined"
        required
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {error && <span className="text-danger">{errorMessage}</span>}
    </>
  );
}
