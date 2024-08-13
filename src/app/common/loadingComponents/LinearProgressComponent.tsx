import { LinearProgress, useTheme } from "@mui/material";

/**
 * Renders a linear progress component.
 *
 * @returns The linear progress component.
 */
export default function LinearProgressComponent() {
  const theme = useTheme();
  return (
    <LinearProgress
      color={theme.palette.mode === "dark" ? "info" : "error"}
      sx={{
        height: "0.2rem",
        backgroundColor: "fcfcfc",
      }}
    />
  );
}
