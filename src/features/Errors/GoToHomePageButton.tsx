import { Button, useTheme } from "@mui/material";
import { colors } from "../../themeConfig";
import { router } from "../../app/router/Routes";

export default function GoToHomePageButton() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Button
      onClick={() => router.navigate("/")}
      variant="contained"
      sx={{
        mt: "1.5rem",
        backgroundColor: color.blueAccent[500],
        "&:hover": {
          backgroundColor: color.blueAccent[600],
        },
      }}
    >
      Go To Homepage
    </Button>
  );
}