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

/**
 * Defines the mixin for the opened state of the sidebar component.
 * 
 * @param theme - The theme object.
 * @returns The CSS object representing the mixin.
 */
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

/**
 * Defines the closedMixin function.
 * This function returns a CSSObject representing the styles for a closed sidebar.
 *
 * @param {Theme} theme - The theme object containing the transitions and breakpoints.
 * @returns {CSSObject} - The CSSObject representing the styles for a closed sidebar.
 */
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

/**
 * Represents a styled sidebar component.
 *
 * @remarks
 * This component extends the `Drawer` component and adds custom styling to create a sidebar.
 * It accepts a `theme` and `open` prop to control its appearance.
 *
 * @public
 */
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

/**
 * Represents the header component of the sidebar.
 */
const SidebarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

/**
 * Renders the sidebar component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Indicates whether the sidebar is open or not.
 * @param {Function} props.setSidebarOpen - Callback function to set the sidebar open state.
 * @returns {JSX.Element} The rendered sidebar component.
 */
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
