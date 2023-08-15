import { IconButton, Tooltip, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../../themeConfig";
import { LightModeRounded, NightsStayRounded } from "@mui/icons-material";

export default function ColorModeToggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Tooltip title="Theme Toggle">
      <IconButton disableRipple onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <NightsStayRounded sx={{ color: "#fcfcfc" }} />
        ) : (
          <LightModeRounded sx={{ color: "#fcfcfc" }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
