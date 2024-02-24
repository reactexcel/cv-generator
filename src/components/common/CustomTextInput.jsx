import { TextField } from "@mui/material";

const CustomTextInput = ({ label, value, onChange }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      margin="dense"
      label={label}
      variant="filled"
    />
  );
};

export default CustomTextInput;
