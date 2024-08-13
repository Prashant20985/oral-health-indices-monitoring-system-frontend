import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  SelectChangeEvent,
  TextField,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import Header from "../../../app/common/header/Header";
import UserRequestCard from "./UserRequestCard";
import CustomSelect from "../../../app/common/formInputs/CustomSelect";
import { RequestStatus } from "../../../app/models/UserRequest";
import Calendar from "../../../app/common/calendar/Calendar";
import { SearchRounded } from "@mui/icons-material";
import NoRowsFound from "../../../app/common/NoRowsFound/NoRowsFound";
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

/**
 * Renders the UserRequestListForAdmin component.
 * This component displays a list of user requests for the admin user.
 * It allows the admin user to search for requests, filter them by status, and view details of each request.
 */
export default observer(function UserRequestListForAdmin() {
  const { userRequestStore } = useStore();
  const {
    fetchUserRequestsForAdmin,
    userRequestsForAdmin,
    setDateSubmittedForAdmin,
  } = userRequestStore;

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchUserRequests = async () => {
      await fetchUserRequestsForAdmin();
    };
    fetchUserRequests();
  }, [fetchUserRequestsForAdmin]);

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleRequestStatusChange = (
    event: SelectChangeEvent<RequestStatus>
  ) => {
    userRequestStore.setRequestStatusForAdmin(
      event.target.value! as RequestStatus
    );
  };

  const filteredRequests = userRequestsForAdmin.filter((request) =>
    request.userName.toLocaleLowerCase().includes(searchQuery)
  );

  const [t] = useTranslation("global");

  return (
    <Box>
      <Header title={t("user-request-operations.list.user-request-admin.header")} />
      <Box display="flex" mt="1.5rem">
        <Box width="50%">
          <TextField
            label={t("user-request-operations.list.user-request-admin.search-label")}
            size="small"
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            type="text"
            fullWidth
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchRounded
                    color={theme.palette.mode === "dark" ? "secondary" : "info"}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box display="flex" mt="1rem" width="100%" gap={4}>
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
            {filteredRequests.length > 0 ? (
              <Grid container spacing={1}>
                {filteredRequests.map((userRequest) => (
                  <Grid item key={userRequest.id} lg={12} md={12}>
                    <UserRequestCard userRequest={userRequest} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <NoRowsFound />
            )}
          </Paper>
        </Box>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box component={FormControl}>
            <CustomSelect
              label={t("user-request-operations.list.user-request-admin.status-label")}
              options={["Completed", "In_Progress", "Submitted"]}
              value={userRequestStore.requestStatusForAdmin}
              onChange={handleRequestStatusChange}
            />
          </Box>
          <Box>
            <Calendar setDate={setDateSubmittedForAdmin} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
