import {
  ChevronLeft,
  DashboardOutlined,
  LoginOutlined,
  MessageOutlined,
} from "@mui/icons-material";
import {
  CSSObject,
  Theme,
  styled,
  Drawer,
  Typography,
  IconButton,
  List,
  Box,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import SidebarListItem from "./SidebarListItem";
import { useStore } from "../../stores/Store";
import { observer } from "mobx-react-lite";
import AdminNavOptions from "../../../features/AdminOperations/NavOptions/AdminNavOptions";
import DentistTeacherNavOptions from "../../../features/DentistTeacherOperations/NavOptions/DentistTeacherNavOptions";
import StudentNavOptions from "../../../features/StudentOperations/NavOptions/StudentNavOptions";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const drawerWidth = 245;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Sidebar = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor:
        theme.palette.mode === "light" ? blueGrey[50] : "#14202e",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor:
        theme.palette.mode === "light" ? blueGrey[50] : "#14202e",
    },
  }),
}));

const SidebarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default observer(function SidebarComponent({
  open,
  setSidebarOpen,
}: Props) {
  const {
    userStore: { user, isUserLoggedIn },
  } = useStore();
  const [t] = useTranslation("global");
  return (
    <Sidebar variant="permanent" open={open}>
      <SidebarHeader>
        <Box display="flex" alignItems="center" p={1} gap={1}>
          <Typography
            variant="h5"
            noWrap
            color="inherit"
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
            }}
          >
            ORAL EHR SYSTEM
          </Typography>
          <IconButton onClick={() => setSidebarOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </Box>
      </SidebarHeader>
      <List>
        {!isUserLoggedIn && (
          <SidebarListItem
            open={open}
            path="/login"
            icon={<LoginOutlined />}
            text={t("common.side-bar.login")}
          />
        )}
        {isUserLoggedIn && (
          <>
            <SidebarListItem
              open={open}
              path="/"
              icon={<DashboardOutlined />}
              text={t("common.side-bar.dashboard")}
            />
            <>{user?.role === "Admin" && <AdminNavOptions open={open} />}</>
            <>
              {(user?.role === "Dentist_Teacher_Examiner" ||
                user?.role === "Dentist_Teacher_Researcher") && (
                <DentistTeacherNavOptions open={open} />
              )}
            </>
            <>{user?.role === "Student" && <StudentNavOptions open={open} />}</>
            <>
              {user?.role !== "Admin" && (
                <SidebarListItem
                  open={open}
                  path="/my-requests"
                  icon={<MessageOutlined />}
                  text={t("common.side-bar.my-requests")}
                />
              )}
            </>
          </>
        )}
      </List>
    </Sidebar>
  );
});
