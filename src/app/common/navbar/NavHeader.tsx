import { Button, Typography } from "@mui/material";
import { router } from "../../router/Routes";

export default function NavHeader() {
  return (
    <Typography
      variant="h6"
      noWrap
      color="inherit"
      size="large"
      component={Button}
      onClick={() => router.navigate("/")}
      sx={{
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".15rem",
        textDecoration: "none",
      }}
    >
      Oral EHR System
    </Typography>
  );
}
