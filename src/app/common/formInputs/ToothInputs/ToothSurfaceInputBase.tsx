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

export default React.memo(function InPutBaseToothSurface({
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
