import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, SpeakerNotes } from "@mui/icons-material";
import * as React from "react";
import { UserRequest } from "../../../app/models/UserRequest";
import { colors } from "../../../themeConfig";
import Status from "./Status";
import UserRequestActionsForCurrentUser from "./UserRequestActionsForCurrentUser";
import UserRequestActionsForAdmin from "./UserRequestActionsForAdmin";
import { useStore } from "../../../app/stores/Store";
import { blueGrey } from "@mui/material/colors";

interface Props {
  userRequest: UserRequest;
  isCurrentUserRequest?: boolean;
}

export default observer(function UserRequestCard({
  userRequest,
  isCurrentUserRequest = false,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    userRequestStore: { updateUserRequestToCompleted },
  } = useStore();

  const [dropdownDescription, setDropdownDescription] = React.useState(false);
  const [openMarkAsComplete, setOpenMarkAsComplete] = React.useState(false);
  const [adminComment, setAdminComment] = React.useState("");

  const hanldeCompleteClick = async () => {
    await updateUserRequestToCompleted(userRequest.id, adminComment).then(
      () => {
        setOpenMarkAsComplete(false);
      }
    );
  };

  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? color.primary[400] : blueGrey[50],
        padding: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: color.blueAccent[600],
            }}
            aria-label="user request"
          >
            <SpeakerNotes />
          </Avatar>
        }
        title={
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent="center"
          >
            <Typography variant="h5">{userRequest.requestTitle}</Typography>
            <Status status={userRequest.requestStatus} />
          </Box>
        }
        subheader={
          <Box>
            <Typography>{`Requestor: ${userRequest.userName}`}</Typography>
            <Typography>
              {`Submit Date: ${
                userRequest.dateSubmitted.toString().split("T")[0]
              }`}
            </Typography>

            {userRequest.requestStatus === "Completed" && (
              <Typography>
                {`Complete Date: ${
                  userRequest.dateCompleted?.toString().split("T")[0]
                }`}
              </Typography>
            )}
          </Box>
        }
      />
      <CardActions>
        {isCurrentUserRequest ? (
          <UserRequestActionsForCurrentUser userRequest={userRequest} />
        ) : (
          <UserRequestActionsForAdmin
            userRequest={userRequest}
            openMarkAsComplete={() => setOpenMarkAsComplete(true)}
          />
        )}
        {dropdownDescription ? (
          <IconButton onClick={() => setDropdownDescription(false)}>
            <ArrowDropUp />
          </IconButton>
        ) : (
          <IconButton onClick={() => setDropdownDescription(true)}>
            <ArrowDropDown />
          </IconButton>
        )}
      </CardActions>
      {openMarkAsComplete && (
        <>
          <CardContent>
            <Box>
              <TextField
                size="small"
                fullWidth
                color="info"
                label="Comment (Optional)"
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={1} mt=".5rem">
              <Button
                size="small"
                color="success"
                onClick={hanldeCompleteClick}
              >
                Completed
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => setOpenMarkAsComplete(false)}
              >
                Cancel
              </Button>
            </Box>
          </CardContent>
          <Divider />
        </>
      )}
      {dropdownDescription && (
        <CardContent>
          <Typography variant="h6">Description:</Typography>
          {userRequest.description === null
            ? "No Description."
            : userRequest.description}
          {userRequest.adminComment && (
            <>
              <Typography variant="h6" sx={{ mt: ".5rem" }}>
                Admin Comment:
              </Typography>
              <Typography>{userRequest.adminComment}</Typography>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
});
