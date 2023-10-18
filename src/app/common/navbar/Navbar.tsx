import {
  AppBar,
  Box,
  Container,
  Divider,
  Toolbar,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import ColorModeToggle from "./ColorModeToggle";
import LanguageSelect from "./LanguageSelect";
import UserOptions from "./UserOptions";
import { useStore } from "../../stores/Store";
import { observer } from "mobx-react-lite";

export default observer(function Navbar() {
  const theme = useTheme();
  const backgroundColor =
    theme.palette.mode === "dark" ? blueGrey[900] : "#455a64";

  const {
    userStore: { isUserLoggedIn },
  } = useStore();

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: backgroundColor,
          zIndex: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
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
