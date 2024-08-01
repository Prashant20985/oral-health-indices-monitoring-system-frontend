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
import ChangePasswordForm from "../Forms/ChangePasswordForm";
import { useTranslation } from "react-i18next";

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
  const [changePasswordMode, setChangePasswordMode] = React.useState(false);

  React.useEffect(() => {
    if (userName) {
      fetchUserDetails(userName);
    }
    return () => clearSelectedApplicationUser();
  }, [userName, fetchUserDetails, clearSelectedApplicationUser]);

  const [t] = useTranslation("global");

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
                    {editMode
                      ? t("admin-operations.user-profile.edit-user")
                      : changePasswordMode
                      ? t("admin-operations.user-profile.change-password")
                      : t("admin-operations.user-profile.header")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  alignContent="center"
                  width="40%"
                  gap={2}
                >
                  {userName === user?.userName && !changePasswordMode ? (
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Edit />}
                      onClick={() => setChangePasswordMode(!changePasswordMode)}
                      sx={{
                        backgroundColor: color.pinkAccent[600],
                        "&:hover": {
                          backgroundColor: color.pinkAccent[400],
                        },
                      }}
                    >
                      {t("admin-operations.user-profile.change-password")}
                    </Button>
                  ) : (
                    user?.role === "Admin" &&
                    userName !== user.userName &&
                    !editMode &&
                    applicationUser.deletedAt === null && (
                      <>
                        {!changePasswordMode && (
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
                            {t("admin-operations.user-profile.edit-user")}
                          </Button>
                        )}
                      </>
                    )
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
                ) : changePasswordMode ? (
                  <ChangePasswordForm
                    email={applicationUser.email}
                    onClose={() => setChangePasswordMode(false)}
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
