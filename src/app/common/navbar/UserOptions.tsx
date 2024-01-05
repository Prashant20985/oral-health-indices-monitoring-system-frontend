import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import { useStore } from "../../stores/Store";
import * as React from "react";
import { AssignmentIndOutlined, LogoutOutlined } from "@mui/icons-material";
import UserProfileDialog from "../../../features/AdminOperations/UserProfile/UserProfileDialog";

export default observer(function UserOptions() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    userStore: { user, logout },
  } = useStore();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [selectedUserName, setSelectedUserName] = React.useState("");
  const [openprofileDialog, setOpenProfileDialog] = React.useState(false);

  const isPortrait = useMediaQuery("(orientation: portrait)");

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <Tooltip title="User Options">
        <Button
          variant="text"
          color="info"
          onClick={handleOpenUserMenu}
          endIcon={
            <Avatar
              alt={user?.name}
              variant="rounded"
              sx={{
                backgroundColor: color.pinkAccent[400],
                width: 30,
                height: 30,
              }}
            />
          }
        >
          {!isPortrait && (
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              {user?.name}
            </Typography>
          )}
        </Button>
      </Tooltip>
      <Popover
        open={Boolean(anchorElUser)}
        anchorEl={anchorElUser}
        onClose={() => setAnchorElUser(null)}
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
            width: "12rem",
          },
        }}
      >
        <Box padding={1.5}>
          <Typography variant="h5" fontWeight="bold">
            {user?.name}
          </Typography>
          <Typography variant="body1" color="error" fontWeight="bold">
            {user?.userName}
          </Typography>
        </Box>
        <Divider variant="fullWidth" />
        <MenuList>
          <MenuItem
            onClick={() => {
              if (user?.userName) {
                setSelectedUserName(user?.userName);
                setOpenProfileDialog(true);
              }
              setAnchorElUser(null);
            }}
          >
            <ListItemIcon>
              <AssignmentIndOutlined color="info" />
            </ListItemIcon>
            <Typography variant="h6">View Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorElUser(null);
              logout();
            }}
          >
            <ListItemIcon>
              <LogoutOutlined color="error" />
            </ListItemIcon>
            <Typography variant="h6">Logout</Typography>
          </MenuItem>
        </MenuList>
      </Popover>
      <UserProfileDialog
        userName={selectedUserName}
        isOpen={openprofileDialog}
        onClose={() => {
          setOpenProfileDialog(false);
          setSelectedUserName("");
        }}
      />
    </>
  );
});
