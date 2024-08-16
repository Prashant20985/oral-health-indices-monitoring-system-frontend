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
import { CheckExamStatus } from "../../../app/helper/CheckExamStatus";
import MarkAsGradedConformationDialog from "../Forms/MarkAsGradedConformationDialog";
import { useTranslation } from "react-i18next";

interface Props {
  exam: Exam;
  isExamDetails?: boolean;
  isForStudentUser?: boolean;
  isTop3?: boolean;
}

/**
 * Renders an exam card component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Exam} props.exam - The exam object.
 * @param {boolean} props.isForStudentUser - Indicates if the user is a student.
 * @param {boolean} props.isExamDetails - Indicates if the card is for exam details.
 * @param {boolean} props.isTop3 - Indicates if the card is one of the top 3 exams.
 * @returns {JSX.Element} The exam card component.
 */
export default observer(function StudentExamCard({
  exam,
  isForStudentUser,
  isExamDetails,
  isTop3,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const [openMarkAsGradedDialog, setOpenMarkAsGradedDialog] =
    React.useState(false);

  const { ended, ongoing } = CheckExamStatus(
    exam.dateOfExamination.toString(),
    exam.endTime,
    exam.startTime
  );

  const isMarkAsGradedButtonVisible =
    ended && exam.examStatus === "Published" && !isForStudentUser;

  const [t] = useTranslation("global");

  return (
    <>
      <Card
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : color.grey[900],
          width: "100%",
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
                <b>
                  {t(
                    "student-exam-operations.exams-list.student-exam-card.publish-date"
                  )}
                </b>{" "}
                {new Date(exam.publishDate).toDateString()}
              </Typography>
            </>
          }
        />
        <CardContent>
          <Stack spacing={1}>
            {!isTop3 && (
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
                      {t(
                        "student-exam-operations.exams-list.student-exam-card.status"
                      )}{" "}
                      {exam.examStatus}
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
            {!isTop3 && (
              <>
                <Box display="flex" alignItems="center" gap={1}>
                  <Timelapse />
                  <Typography variant="h6" color="textSecondary">
                    {t(
                      "student-exam-operations.exams-list.student-exam-card.duration"
                    )}{" "}
                    {exam.durationInterval}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Assessment />
                  <Typography variant="h6" color="textSecondary">
                    {t(
                      "student-exam-operations.exams-list.student-exam-card.max-marks"
                    )}{" "}
                    {exam.maxMark}
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
        </CardContent>
        <CardActions>
          {!isExamDetails ? (
            <>
              {!isForStudentUser ? (
                <>
                  <Box sx={{ width: "100%" }}>
                    <Button
                      variant="outlined"
                      color={
                        theme.palette.mode === "dark" ? "secondary" : "primary"
                      }
                      endIcon={<Assessment />}
                      size="small"
                      onClick={() =>
                        router.navigate(`/exam-details/${exam.id}`)
                      }
                    >
                      {t(
                        "student-exam-operations.exams-list.student-exam-card.view-exam-button"
                      )}
                    </Button>
                  </Box>
                  <Box display="flex" width="100%" justifyContent="flex-end">
                    <Tooltip
                      title={t(
                        "student-exam-operations.exams-list.student-exam-card.edit-exam-button"
                      )}
                    >
                      <IconButton
                        onClick={() => setOpenEditDialog(true)}
                        disabled={ongoing || ended}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={t(
                        "student-exam-operations.exams-list.student-exam-card.delete-exam-button"
                      )}
                    >
                      <IconButton
                        onClick={() => setOpenDeleteDialog(true)}
                        disabled={ongoing}
                      >
                        <DeleteSweep />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<Assessment />}
                  onClick={() => router.navigate(`/exam/${exam.id}`)}
                  fullWidth
                >
                  {t(
                    "student-exam-operations.exams-list.student-exam-card.view-exam-button"
                  )}
                </Button>
              )}
            </>
          ) : isMarkAsGradedButtonVisible ? (
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => setOpenMarkAsGradedDialog(true)}
            >
              {t(
                "student-exam-operations.exams-list.student-exam-card.mark-as-graded-button"
              )}
            </Button>
          ) : null}
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
      <MarkAsGradedConformationDialog
        isOpen={openMarkAsGradedDialog}
        onClose={() => setOpenMarkAsGradedDialog(false)}
        examId={exam.id}
      />
    </>
  );
});
