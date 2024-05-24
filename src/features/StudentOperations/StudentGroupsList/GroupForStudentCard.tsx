import { observer } from "mobx-react-lite";
import { GroupWithExams } from "../../../app/models/Group";
import {
  Avatar,
  Card,
  CardHeader,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { Groups3 } from "@mui/icons-material";
import { router } from "../../../app/router/Routes";

interface Props {
  group: GroupWithExams;
}

export default observer(function GroupForStudentCard({ group }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Tooltip title="Click to view group details">
      <Card
        elevation={3}
        onClick={() => router.navigate(`/my-group/${group.id}`)}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? color.primary[400] : blueGrey[200],
          cursor: "pointer",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? color.primary[500]
                : blueGrey[300],
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? blueGrey[400] : blueGrey[600],
              }}
              aria-label="group"
            >
              <Groups3 />
            </Avatar>
          }
          title={<Typography variant="h5">{group.groupName}</Typography>}
          subheader={
            <Typography variant="body1">Created By: {group.teacher}</Typography>
          }
        />
      </Card>
    </Tooltip>
  );
});
