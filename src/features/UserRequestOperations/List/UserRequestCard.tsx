import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, SpeakerNotes } from "@mui/icons-material";
import * as React from "react";
import { UserRequest } from "../../../app/models/UserRequest";
import { colors } from "../../../themeConfig";
import Status from "./Status";
import UserRequestActionsForCurrentUser from "./UserRequestActionsForCurrentUser";

interface Props {
  userRequest: UserRequest;
}

export default observer(function UserRequestCard({ userRequest }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [dropdownDescription, setDropdownDescription] = React.useState(false);

  return (
    <Card sx={{ backgroundColor: color.primary[400], marginBottom: "10px" }}>
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
        <UserRequestActionsForCurrentUser userRequest={userRequest} />
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
      {dropdownDescription && (
        <CardContent>
          {userRequest.description === null
            ? "No Description."
            : userRequest.description}
        </CardContent>
      )}
    </Card>
  );
});
