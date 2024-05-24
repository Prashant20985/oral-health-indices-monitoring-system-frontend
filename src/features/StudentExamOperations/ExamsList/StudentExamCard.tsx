import {
  AssignmentOutlined,
  Check,
  AssignmentTurnedIn,
  CalendarMonth,
  Schedule,
  Timelapse,
  Assessment,
  Edit,
  DeleteSweep,
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
  Tooltip,
  IconButton,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import { Exam } from "../../../app/models/StudentExam";
import * as React from "react";
import UpdateExamForm from "../Forms/UpdateExamForm";
import DeleteExamConfirmationForm from "../Forms/DeleteExamConfirmationForm";
import { router } from "../../../app/router/Routes";

interface Props {
  exam: Exam;
  isExamDetails?: boolean;
  forStudentUser?: boolean;
}

export default observer(function StudentExamCard({
  exam,
  forStudentUser,
  isExamDetails,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  return (
    <>
      <Card
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : color.grey[900],
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
            {!isExamDetails && (
              <>
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
              </>
            )}
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonth />
              <Typography variant="h6" color="textSecondary">
                {new Date(exam.dateOfExamination).toDateString()}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Schedule />
              <Typography variant="h6" color="textSecondary">
                {exam.startTime} - {exam.endTime}
              </Typography>
            </Box>
            {!isExamDetails && (
              <>
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
              </>
            )}
          </Stack>
        </CardContent>
        <CardActions>
          {!forStudentUser ? (
            <>
              <Box sx={{ width: "100%" }}>
                <Button
                  variant="outlined"
                  color={
                    theme.palette.mode === "dark" ? "secondary" : "primary"
                  }
                  endIcon={<Assessment />}
                  size="small"
                  onClick={() => router.navigate(`/exam-details/${exam.id}`)}
                >
                  View Exam
                </Button>
              </Box>
              <Box display="flex" width="100%" justifyContent="flex-end">
                <Tooltip title="Edit Exam">
                  <IconButton onClick={() => setOpenEditDialog(true)}>
                    <Edit color="warning" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Exam">
                  <IconButton onClick={() => setOpenDeleteDialog(true)}>
                    <DeleteSweep color="error" />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              color="info"
              startIcon={<Assessment />}
              fullWidth
            >
              View Exam
            </Button>
          )}
        </CardActions>
      </Card>
      <UpdateExamForm
        isOpen={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        exam={exam}
      />
      <DeleteExamConfirmationForm
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        examId={exam.id}
        examTitle={exam.examTitle}
      />
    </>
  );
});
