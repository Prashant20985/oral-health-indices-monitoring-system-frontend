import { SettingsOutlined } from "@mui/icons-material";
import { IconButton, List, Popover } from "@mui/material";
import * as React from "react";
import ColorModeToggle from "./ColorModeToggle";
import LanguageSelect from "./LanguageSelect";

/**
 * Renders a settings option component.
 * 
 * @returns The rendered settings option component.
 */
export default function SettingsOption() {
  const [anchorElSettings, setAnchorElSettings] =
    React.useState<null | HTMLElement>(null);

  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSettings(event.currentTarget);
  };

  return (
    <>
      <IconButton
        onClick={handleOpenSettingsMenu}
        sx={{
          color: "white",
          "&:hover": {
            animation: "spin 4s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(360deg)",
              },
              "100%": {
                transform: "rotate(0deg)",
              },
            },
          },
        }}
      >
        <SettingsOutlined />
      </IconButton>
      <Popover
        open={Boolean(anchorElSettings)}
        anchorEl={anchorElSettings}
        onClose={() => setAnchorElSettings(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: 0.5,
          },
        }}
      >
        <List>
          <ColorModeToggle />
          <LanguageSelect />
        </List>
      </Popover>
    </>
  );
}
