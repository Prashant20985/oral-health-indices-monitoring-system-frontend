import {
  AppBar,
  Box,
  Container,
  Divider,
  Toolbar,
  useTheme,
} from "@mui/material";
import NavHeader from "./NavHeader";
import { blueGrey } from "@mui/material/colors";
import ColorModeToggle from "./ColorModeToggle";
import LanguageSelect from "./LanguageSelect";
import UserOptions from "./UserOptions";
import { useStore } from "../../stores/Store";
import { observer } from "mobx-react-lite";
import AdminNavOptions from "../../../features/AdminOperations/NavOptions/AdminNavOptions";

export default observer(function Navbar() {
  const theme = useTheme();
  const backgroundColor =
    theme.palette.mode === "dark" ? blueGrey[900] : "#455a64";

  const {
    userStore: { isUserLoggedIn, user },
  } = useStore();

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: backgroundColor,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Nav Header */}
            <NavHeader />
            {/* Left side  of the Nav bar*/}
            {user?.role === "Admin" ? (
              <AdminNavOptions />
            ) : (
              <Box display="flex" flexGrow={1}></Box>
            )}
            {/* Right Side of the nav bar */}
            <Box display="flex" flexGrow={0}>
              {isUserLoggedIn && (
                <>
                  <UserOptions />
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ backgroundColor: "#fff", ml: 2, mr: 2, mt: 1, mb: 1 }}
                  />
                </>
              )}
              <LanguageSelect />
              <Divider
                orientation="vertical"
                flexItem
                sx={{ backgroundColor: "#fff", ml: 2, mr: 2, mt: 1, mb: 1 }}
              />
              <ColorModeToggle />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});
