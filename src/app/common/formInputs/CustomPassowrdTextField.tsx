import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface Props {
  label: string;
  name: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  gridColumn?: string;
}

export default function CustomPasswordTextField({
  label,
  name,
  onChange,
  error,
  helperText,
  required = true,
  gridColumn = "span 1",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      id={name}
      color="secondary"
      label={label}
      variant="filled"
      name={name}
      required={required}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        gridColumn: gridColumn,
      }}
      error={error}
      helperText={helperText}
    />
  );
}
