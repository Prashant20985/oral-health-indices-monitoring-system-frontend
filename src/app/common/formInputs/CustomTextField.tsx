import { TextField, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";

interface Props {
  label: string;
  name: string;
  value?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
  gridColumn?: string;
  type?: string;
}

export default function CustomTextField({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  required = false,
  gridColumn = "span 1",
  type = "text",
  readOnly = false,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <TextField
      id={name}
      color="secondary"
      type={type}
      label={label}
      variant="filled"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      InputProps={{
        readOnly: readOnly,
      }}
      sx={{
        gridColumn: gridColumn,
        color: color.grey[100],
      }}
      error={error}
      helperText={helperText}
    />
  );
}
