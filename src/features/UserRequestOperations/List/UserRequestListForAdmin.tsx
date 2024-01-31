import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import {
  Box,
  FormControl,
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

  return (
    <Box>
      <Header title="All Requests" />
      <Box display="flex" mt="1.5rem">
        <Box width="50%">
          <TextField
            label="Search by Requestor Name"
            size="small"
            color="secondary"
            type="text"
            fullWidth
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchRounded color="secondary" />
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
            sx={{
              overflow: "auto",
              backgroundColor: color.primary[400],
              height: "75vh",
            }}
          >
            {filteredRequests.length > 0 ? (
              <>
                {filteredRequests.map((userRequest) => (
                  <UserRequestCard
                    key={userRequest.id}
                    userRequest={userRequest}
                  />
                ))}
              </>
            ) : (
              <NoRowsFound />
            )}
          </Paper>
        </Box>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box component={FormControl}>
            <CustomSelect
              label="Status"
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
