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

/**
 * Renders a custom password text field.
 * @param {Props} props - The component props.
 * @param {string} props.label - The label for the text field.
 * @param {string} props.name - The name attribute for the text field.
 * @param {Function} props.onChange - The event handler for the onChange event.
 * @param {boolean} props.error - Indicates if the text field has an error.
 * @param {string} props.helperText - The helper text to display below the text field.
 * @param {boolean} [props.required=true] - Indicates if the text field is required.
 * @param {string} [props.gridColumn="span 1"] - The CSS grid column property for the text field.
 * @returns {JSX.Element} The rendered CustomPasswordTextField component.
 */
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
