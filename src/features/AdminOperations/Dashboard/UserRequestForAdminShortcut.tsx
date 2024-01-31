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

export default observer(function UserRequestForAdminShortcut() {
  const { userRequestStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchUserRequests = async () => {
      if (userRequestStore.userRequestsForAdmin.length <= 0) {
        await userRequestStore.fetchUserRequestsForAdmin();
      }
    };
    fetchUserRequests();
  }, [userRequestStore]);

  const [selectedStatus, setSelectedStatus] =
    React.useState<RequestStatus>("Submitted");

  const handleButtonClick = (status: RequestStatus) => {
    userRequestStore.setRequestStatusForAdmin(status);
    setSelectedStatus(status);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper sx={{ backgroundColor: color.primary[400] }}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            p={0.5}
            textTransform="uppercase"
            fontWeight={600}
          >
            User Requests
          </Typography>
          <ButtonGroup
            size="small"
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
          >
            {["Submitted", "In_Progress", "Completed"].map((status) => (
              <Button
                key={status}
                onClick={() => handleButtonClick(status as RequestStatus)}
                disabled={selectedStatus === status}
              >
                {status === "In_Progress" ? "In Progress" : status}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            overflow: "auto",
            height: "30vh",
          }}
        >
          {userRequestStore.userRequestsForAdmin.length > 0 ? (
            <>
              {userRequestStore.userRequestsForAdmin.map((userRequest) => (
                <UserRequestCard
                  key={userRequest.id}
                  userRequest={userRequest}
                />
              ))}
            </>
          ) : (
            <NoRowsFound />
          )}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            onClick={() => router.navigate("/admin/requests")}
            size="small"
          >
            View All
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
