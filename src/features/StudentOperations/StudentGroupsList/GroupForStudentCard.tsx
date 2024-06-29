import { observer } from "mobx-react-lite";
import { GroupWithExams } from "../../../app/models/Group";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { DoubleArrow, Groups3 } from "@mui/icons-material";
import { router } from "../../../app/router/Routes";

interface Props {
  group: GroupWithExams;
}

export default observer(function GroupForStudentCard({ group }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Card
      elevation={2}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? color.primary[400] : color.grey[900],
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? blueGrey[400] : blueGrey[600],
              width: 50,
              height: 50,
            }}
            aria-label="group"
          >
            <Groups3 />
          </Avatar>
        }
        title={
          <Typography variant="h5" fontWeight="bold">
            {group.groupName}
          </Typography>
        }
        subheader={
          <Typography variant="h6" color="textSecondary">
            <b>Teacher:</b> {`${group.teacher.split("(")[0]}`}
          </Typography>
        }
      />
      <CardActions>
        <Button
          onClick={() => router.navigate(`/my-groups/${group.id}`)}
          color={theme.palette.mode === "dark" ? "secondary" : "info"}
          variant="outlined"
          size="small"
          fullWidth
          endIcon={<DoubleArrow />}
        >
          View Group Details
        </Button>
      </CardActions>
    </Card>
  );
});
