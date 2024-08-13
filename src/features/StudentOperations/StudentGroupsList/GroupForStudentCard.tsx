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
import { useTranslation } from "react-i18next";

interface Props {
  group: GroupWithExams;
}

/**
 * Renders a card component for a student group.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Group} props.group - The group object.
 * @returns {JSX.Element} The rendered card component.
 */
export default observer(function GroupForStudentCard({ group }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [t] = useTranslation("global");

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
            <b>
              {t(
                "student-operations.student-group-list.group-for-student-card.teacher"
              )}
            </b>{" "}
            {`${group.teacher.split("(")[0]}`}
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
          {t(
            "student-operations.student-group-list.group-for-student-card.view-group-details-button"
          )}
        </Button>
      </CardActions>
    </Card>
  );
});
