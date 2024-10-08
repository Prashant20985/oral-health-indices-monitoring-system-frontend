import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import Header from "../../../app/common/header/Header";
import { Add } from "@mui/icons-material";
import * as React from "react";
import AddUserRequestForm from "../Forms/AddUserRequestForm";
import { useStore } from "../../../app/stores/Store";
import { colors } from "../../../themeConfig";
import UserRequestCard from "./UserRequestCard";
import Calendar from "../../../app/common/calendar/Calendar";
import { RequestStatus } from "../../../app/models/UserRequest";
import NoRowsFound from "../../../app/common/NoRowsFound/NoRowsFound";
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

/**
 * Renders a list of user requests for the current user.
 * 
 * @returns The UserRequestListForCurrentuser component.
 */
export default observer(function UserRequestListForCurrentuser() {
  const { userRequestStore } = useStore();
  const {
    fetchUserRequestsForCurrentUser,
    userRequestsForCurrentUser,
    setDateSubmittedForCurrentUser,
  } = userRequestStore;

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchUserRequests = async () => {
      await fetchUserRequestsForCurrentUser();
    };
    fetchUserRequests();
  }, [fetchUserRequestsForCurrentUser]);

  const [openAddRequestForm, setOpenAddRequestForm] = React.useState(false);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Header title={t("user-request-operations.list.user-request-for-current-user.header")} />
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setOpenAddRequestForm(true)}
        >
          {t("user-request-operations.list.user-request-for-current-user.new-request-button")}
        </Button>
      </Box>

      <Box display="flex" mt="2rem" width="100%" gap={4}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          width="100%"
        >
          <Paper
            elevation={3}
            sx={{
              overflow: "auto",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.primary[500]
                  : blueGrey[50],
              p: 1.5,
              borderRadius: 2,
              height: "75vh",
            }}
          >
            {userRequestsForCurrentUser.length > 0 ? (
              <Grid container spacing={1}>
                {userRequestsForCurrentUser.map((userRequest) => (
                  <Grid item key={userRequest.id} lg={12} md={12}>
                    <UserRequestCard
                      userRequest={userRequest}
                      isCurrentUserRequest
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoRowsFound />
            )}
          </Paper>
        </Box>
        <Box display="flex" flexDirection="column" gap={4}>
          <TextField
            select
            variant="outlined"
            color="secondary"
            size="small"
            value={userRequestStore.requestStatusForCurrentUser}
            onChange={(event) => userRequestStore.setRequestStatusForCurrentUser(event.target.value as RequestStatus)}
            fullWidth
          >
            <MenuItem value="In_Progress">{t("user-request-operations.list.user-request-for-current-user.in-progress")}</MenuItem>
            <MenuItem value="Completed">{t("user-request-operations.list.user-request-for-current-user.completed")}</MenuItem>
            <MenuItem value="Submitted">{t("user-request-operations.list.user-request-for-current-user.submitted")}</MenuItem>
          </TextField>
          <Box>
            <Calendar setDate={setDateSubmittedForCurrentUser} />
          </Box>
        </Box>
      </Box>
      <AddUserRequestForm
        isOpen={openAddRequestForm}
        onClose={() => setOpenAddRequestForm(false)}
      />
    </Box>
  );
});
