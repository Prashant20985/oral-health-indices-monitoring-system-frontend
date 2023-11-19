import {
  Box,
  Button,
  FormControl,
  Paper,
  SelectChangeEvent,
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
import CustomSelect from "../../../app/common/formInputs/CustomSelect";
import { RequestStatus } from "../../../app/models/UserRequest";

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
  const handleRequestStatusChange = (
    event: SelectChangeEvent<RequestStatus>
  ) => {
    userRequestStore.setRequestStatusForCurrentUser(
      event.target.value! as RequestStatus
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Header title="My Requests" />
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setOpenAddRequestForm(true)}
        >
          New Request
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
            sx={{
              overflow: "auto",
              backgroundColor: color.primary[400],
              height: "75vh",
            }}
          >
            {userRequestsForCurrentUser.map((userRequest) => (
              <UserRequestCard
                key={userRequest.id}
                userRequest={userRequest}
                isCurrentUserRequest={true}
              />
            ))}
          </Paper>
        </Box>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box component={FormControl}>
            <CustomSelect
              label="Request Status"
              value={userRequestStore.requestStatusForCurrentUser}
              options={["Completed", "In_Progress", "Submitted"]}
              onChange={handleRequestStatusChange}
            />
          </Box>
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
