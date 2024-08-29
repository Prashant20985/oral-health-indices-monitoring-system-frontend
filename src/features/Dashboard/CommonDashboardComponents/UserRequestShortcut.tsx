import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import { colors } from "../../../themeConfig";
import { RequestStatus } from "../../../app/models/UserRequest";
import UserRequestCard from "../../UserRequestOperations/List/UserRequestCard";
import { router } from "../../../app/router/Routes";
import NoRowsFound from "../../../app/common/NoRowsFound/NoRowsFound";
import { useTranslation } from "react-i18next";

/**
 * Renders a component for displaying user requests in the dashboard.
 * 
 * @returns The rendered UserRequestShortcut component.
 */
export default observer(function UserRequesthortcut() {
  const { userRequestStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchUserRequests = async () => {
      await userRequestStore.fetchUserRequestsForCurrentUser();
    };
    fetchUserRequests();
  }, [userRequestStore]);

  const [selectedStatus, setSelectedStatus] =
    React.useState<RequestStatus>("Submitted");

  const handleButtonClick = (status: RequestStatus) => {
    userRequestStore.setRequestStatusForCurrentUser(status);
    setSelectedStatus(status);
  };

  const [t] = useTranslation("global");

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : color.primary[900],
        }}
      >
        <Box display="flex" justifyContent="space-between" p={1}>
          <Typography variant="h6" textTransform="uppercase" fontWeight={600}>
            {t("user-request-operations.list.user-request-for-current-user.header")}
          </Typography>
          <ButtonGroup
            size="small"
            variant="contained"
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
          >
            <Button
              onClick={() => handleButtonClick("Submitted")}
              disabled={selectedStatus === "Submitted"}
            >
              {t("admin-operations.dashboard.user-requests.submitted")}
            </Button>
            <Button
              onClick={() => handleButtonClick("In_Progress")}
              disabled={selectedStatus === "In_Progress"}
            >
              {t("admin-operations.dashboard.user-requests.in-progress")}
            </Button>
            <Button
              onClick={() => handleButtonClick("Completed")}
              disabled={selectedStatus === "Completed"}
            >
              {t("admin-operations.dashboard.user-requests.completed")}
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            overflow: "auto",
            height: "30vh",
            backgroundColor: color.primary[400],
          }}
        >
          {userRequestStore.userRequestsForCurrentUser.length > 0 ? (
            <>
              {userRequestStore.userRequestsForCurrentUser.map(
                (userRequest) => (
                  <Box mb={1} mt={1} key={userRequest.id}>
                    <UserRequestCard
                      key={userRequest.id}
                      userRequest={userRequest}
                      isCurrentUserRequest
                    />
                  </Box>
                )
              )}
            </>
          ) : (
            <NoRowsFound />
          )}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            onClick={() => router.navigate("/my-requests")}
            size="small"
          >
            {t("admin-operations.dashboard.user-requests.button")}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
