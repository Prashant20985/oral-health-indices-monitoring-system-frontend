import { LinearProgress, useTheme } from "@mui/material";

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
