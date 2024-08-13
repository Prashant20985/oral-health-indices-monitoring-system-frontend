import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  Toolbar,
  useTheme,
  styled,
  IconButton,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import UserOptions from "./UserOptions";
import { useStore } from "../../stores/Store";
import { observer } from "mobx-react-lite";
import { Menu } from "@mui/icons-material";
import SettingsOption from "./SettingsOption";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 245;

/**
 * Custom styled AppBar component.
 *
 * @remarks
 * This component extends the MuiAppBar component and adds custom styling.
 *
 * @param theme - The theme object used for styling.
 * @param open - A boolean indicating whether the AppBar is open or closed.
 * @returns The styled AppBar component.
 */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

/**
 * Renders the navigation bar component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.sidebarOpen - Indicates whether the sidebar is open or not.
 * @param {Function} props.setSidebarOpen - Callback function to set the sidebar open state.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  const theme = useTheme();
  const backgroundColor =
    theme.palette.mode === "dark" ? blueGrey[900] : "#455a64";

  const {
    userStore: { isUserLoggedIn },
  } = useStore();

  return (
    <Box display="flex">
      <AppBar
        open={sidebarOpen}
        position="fixed"
        sx={{
          backgroundColor: backgroundColor,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Box display="flex" sx={{ ml: 0.5 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setSidebarOpen(true)}
              edge="start"
              sx={{
                marginRight: 5,
                ...(sidebarOpen && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
          </Toolbar>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              flexGrow: 1,
              padding: 1,
              justifyContent: "flex-end",
              gap: 1,
              mr: 0.5,
            }}
          >
            {isUserLoggedIn && <UserOptions />}
            <SettingsOption />
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
});
