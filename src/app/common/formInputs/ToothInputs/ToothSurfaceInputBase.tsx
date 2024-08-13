import { InputBase, useTheme } from "@mui/material";
import * as React from "react";
import { colors } from "../../../../themeConfig";

interface Props {
  placeholder?: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
}

/**
 * React component for a base input component for tooth surfaces.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.name - The name of the input.
 * @param {string} props.value - The value of the input.
 * @param {Function} props.onChange - The function to handle input changes.
 * @param {string} [props.error] - The error message for the input.
 * @param {string} [props.placeholder=""] - The placeholder text for the input.
 * @param {boolean} [props.readOnly=false] - Indicates if the input is read-only.
 * @param {boolean} [props.disabled=false] - Indicates if the input is disabled.
 * @param {string} [props.width="1.3rem"] - The width of the input.
 * @param {string} [props.height="1.4rem"] - The height of the input.
 * @returns {JSX.Element} The rendered ToothSurfaceInputBase component.
 */
export default React.memo(function ToothSurfaceInputBase({
  name,
  value,
  onChange,
  error,
  placeholder = "",
  readOnly = false,
  disabled = false,
  width = "1.3rem",
  height = "1.4rem",
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <InputBase
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      error={error}
      readOnly={readOnly}
      sx={{
        border: disabled ? `1px, solid` : `1px solid ${color.grey[100]}`,
        borderRadius: 1,
        height: height,
        width: width,
        "& input": { textAlign: "center" },
      }}
    />
  );
});
