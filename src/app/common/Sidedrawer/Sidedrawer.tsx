import { Box, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import { Menu, MenuItem, MenuItemStyles, Sidebar } from "react-pro-sidebar";
import { Dashboard, Message } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { router } from "../../router/Routes";
import AdminNavOptions from "../../../features/AdminOperations/NavOptions/AdminNavOptions";
import { useStore } from "../../stores/Store";
import DentistTeacherNavOptions from "../../../features/DentistTeacherOperations/NavOptions/DentistTeacherNavOptions";
import { useLocation } from "react-router-dom";

interface Props {
  isCollapsed: boolean;
}

export default function Sidedrawer({ isCollapsed }: Props) {
  const location = useLocation();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    userStore: { user },
  } = useStore();

  const currentPath = location.pathname;

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
    <Sidebar
      collapsed={isCollapsed}
      backgroundColor={hexToRgba(backgroundColor, 0.9)}
      image="/assets/sidebarbackground.jpg"
      rootStyles={{
        border: "none",
        minHeight: "100vh",
        zIndex: 12000,
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
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem icon={<Dashboard />} onClick={() => router.navigate("/")}>
            Dashboard
          </MenuItem>
        </Menu>
        {user?.role === "Admin" ? (
          <AdminNavOptions menuItemStyles={menuItemStyles} />
        ) : user?.role === "Dentist_Teacher_Examiner" ||
          "Dentist_Teacher_Researcher" ? (
          <DentistTeacherNavOptions menuItemStyles={menuItemStyles} />
        ) : (
          <></>
        )}
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem
            icon={<Message />}
            onClick={() => router.navigate("/my-requests")}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: currentPath === "/my-requests" ? 700 : 500,
                color: color.grey[100],
              }}
            >
              My Requests
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Sidebar>
  );
}
