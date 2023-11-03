import { Box, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import { Menu, MenuItem, MenuItemStyles, Sidebar } from "react-pro-sidebar";
import * as React from "react";
import { Dashboard } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { router } from "../../router/Routes";
import AdminNavOptions from "../../../features/AdminOperations/NavOptions/AdminNavOptions";
import { useStore } from "../../stores/Store";
import SidedrawerHeader from "./SidedrawerHeader";

export default function Sidedrawer() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const {
    userStore: { user },
  } = useStore();

  const backgroundColor =
    theme.palette.mode === "dark" ? blueGrey[900] : blueGrey[100];

  const submenuBackgroundColor =
    theme.palette.mode === "dark" ? blueGrey[800] : blueGrey[200];

  const hoverColor =
    theme.palette.mode === "dark" ? blueGrey[700] : blueGrey[300];

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 600,
    },
    SubMenuExpandIcon: {
      color: color.grey[200],
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(submenuBackgroundColor, isCollapsed ? 1 : 0.8)
          : "transparent",
    }),
    button: {
      "&:hover": {
        backgroundColor: hexToRgba(hoverColor, isCollapsed ? 1 : 0.8),
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={hexToRgba(backgroundColor, 0.9)}
        image="/assets/sidebarbackground.jpg"
        rootStyles={{
          border: "none",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            mt: "1rem",
          }}
        >
          <SidedrawerHeader
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<Dashboard />} onClick={() => router.navigate("/")}>
              Dashboard
            </MenuItem>
          </Menu>
          {user?.role === "Admin" && (
            <AdminNavOptions menuItemStyles={menuItemStyles} />
          )}
        </Box>
      </Sidebar>
    </Box>
  );
}
