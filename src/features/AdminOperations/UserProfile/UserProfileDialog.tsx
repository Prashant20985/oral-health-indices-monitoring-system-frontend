import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Edit } from "@mui/icons-material";
import ProfileForm from "../Forms/ProfileForm";
import UserEditForm from "../Forms/UserEditForm";

interface Props {
  userName: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default observer(function UserProfileDialog({
  userName,
  isOpen,
  onClose,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    adminStore,
    userStore: { user },
  } = useStore();
  const {
    fetchUserDetails,
    clearSelectedApplicationUser,
    loading,
    selectedApplicationUser: applicationUser,
  } = adminStore;

  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (userName) {
      fetchUserDetails(userName);
    }
    return () => clearSelectedApplicationUser();
  }, [userName, fetchUserDetails, clearSelectedApplicationUser]);

  return (
    <Box>
      {!loading.userDetails && (
        <Dialog
          open={isOpen}
          fullWidth
          TransitionComponent={SlideUpTransition}
          maxWidth="md"
        >
          <DialogTitle>
            {applicationUser && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignContent="center"
                alignItems="center"
              >
                <Box
                  display="flex"
                  alignContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Typography
                    variant="h4"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    {editMode ? "Edit User" : "User Details"}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  alignContent="center"
                  width="40%"
                  gap={2}
                >
                  {user?.role === "Admin" &&
                  userName !== user.userName &&
                  !editMode &&
                  applicationUser.deletedAt === null ? (
                    <>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setEditMode(true)}
                        startIcon={<Edit />}
                        sx={{
                          backgroundColor: color.pinkAccent[600],
                          "&:hover": {
                            backgroundColor: color.pinkAccent[400],
                          },
                        }}
                      >
                        Edit User
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            )}
          </DialogTitle>
          <Box>
            {applicationUser && (
              <>
                {editMode ? (
                  <UserEditForm
                    onClose={() => setEditMode(false)}
                    applicationUser={applicationUser}
                  />
                ) : (
                  <ProfileForm
                    applicationUser={applicationUser}
                    onClose={() => onClose()}
                  />
                )}
              </>
            )}
          </Box>
        </Dialog>
      )}
    </Box>
  );
});
