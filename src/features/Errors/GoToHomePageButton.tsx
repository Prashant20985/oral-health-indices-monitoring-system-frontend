import { Button, useTheme } from "@mui/material";
import { colors } from "../../themeConfig";
import { router } from "../../app/router/Routes";
import { useTranslation } from "react-i18next";

/**
 * Renders a button that navigates to the home page when clicked.
 *
 * @returns The rendered GoToHomePageButton component.
 */
export default function GoToHomePageButton() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");
  
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
      {t("errors.go-to-homepage-button")}
    </Button>
  );
}