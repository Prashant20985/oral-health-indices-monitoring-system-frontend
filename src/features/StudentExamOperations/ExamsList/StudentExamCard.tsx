import {
  AssignmentOutlined,
  Check,
  AssignmentTurnedIn,
  CalendarMonth,
  Schedule,
  Timelapse,
  Assessment,
} from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Stack,
  Box,
  CardActions,
  Button,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import { Exam } from "../../../app/models/StudentExam";

interface Props {
  exam: Exam;
}

export default observer(function StudentExamCard({ exam }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? color.primary[400] : color.grey[900],
      }}
    >
      <CardHeader
        sx={{ width: "100%" }}
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
            <AssignmentOutlined />
          </Avatar>
        }
        title={
          <Typography variant="h5" fontWeight="bold">
            {exam.examTitle}
          </Typography>
        }
        subheader={
          <>
            <Typography variant="h6" color="textSecondary">
              <b>Publish Date:</b> {new Date(exam.publishDate).toDateString()}
            </Typography>
          </>
        }
      />
      <CardContent>
        <Stack spacing={1}>
          {exam.examStatus === "Published" ? (
            <Box display="flex" alignItems="center" gap={1}>
              <Check />
              <Typography variant="h6" color="textSecondary">
                Status: {exam.examStatus}
              </Typography>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              <AssignmentTurnedIn />
              <Typography variant="h6" color="textSecondary">
                Status: {exam.examStatus}
              </Typography>
            </Box>
          )}
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonth />
            <Typography variant="h6" color="textSecondary">
              {exam.dateOfExamination.toDateString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Schedule />
            <Typography variant="h6" color="textSecondary">
              {exam.startTime} - {exam.endTime}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Timelapse />
            <Typography variant="h6" color="textSecondary">
              Duration: {exam.durationInterval}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Assessment />
            <Typography variant="h6" color="textSecondary">
              Max Marks: {exam.maxMark}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
          endIcon={<Assessment />}
          size="small"
        >
          View Exam
        </Button>
      </CardActions>
    </Card>
  );
});
