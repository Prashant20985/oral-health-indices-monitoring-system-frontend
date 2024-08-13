import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../../themeConfig";
import { Brightness4, LightMode } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

/**
 * Renders a color mode toggle button.
 *
 * @returns The color mode toggle component.
 */
export default function ColorModeToggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [t] = useTranslation("global");

  return (
    <ListItem
      disablePadding
      sx={{ display: "block", justifyContent: "center" }}
    >
      <ListItemButton
        onClick={colorMode.toggleColorMode}
        sx={{
          px: 2.5,
          m: 0.5,
          borderRadius: 1.5,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark" ? blueGrey[800] : blueGrey[100],
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 3 }}>
          {theme.palette.mode === "dark" ? <LightMode /> : <Brightness4 />}
        </ListItemIcon>
        <ListItemText
          primary={
            theme.palette.mode === "dark"
              ? t("topbar.colorMode.light")
              : t("topbar.colorMode.dark")
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
