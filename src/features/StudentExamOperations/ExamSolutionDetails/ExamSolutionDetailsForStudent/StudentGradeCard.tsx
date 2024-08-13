import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { router } from "../../../../app/router/Routes";
import { useTranslation } from "react-i18next";

interface Props {
  studentMark: number;
  doctorName: string;
  doctorComment: string;
  subheader: string;
  isExamGoingOn?: boolean;
  examId?: string;
  isEligibleForExam?: boolean;
}

/**
 * Renders a student grade card component.
 * 
 * @param {Props} props - The component props.
 * @param {number} props.studentMark - The student's mark.
 * @param {string} props.doctorName - The name of the doctor who graded the exam.
 * @param {string} props.doctorComment - The comment provided by the doctor.
 * @param {string} props.subheader - The subheader text.
 * @param {boolean} [props.isExamGoingOn=false] - Indicates if the exam is currently ongoing.
 * @param {number} props.examId - The ID of the exam.
 * @param {boolean} props.isEligibleForExam - Indicates if the student is eligible to take the exam.
 *
 * @returns {JSX.Element} The rendered student grade card component.
 */
export default function StudentGradeCard({
  studentMark,
  doctorName,
  doctorComment,
  subheader,
  isExamGoingOn = false,
  examId,
  isEligibleForExam,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Card
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? color.primary[400] : blueGrey[50],
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            aria-label="student-mark"
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? blueGrey[600] : blueGrey[500],
              height: 80,
              width: 80,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 500,
                fontSize: 35,
                color: "white",
                fontFamily: "monospace",
              }}
            >
              {studentMark}
            </Typography>
          </Avatar>
        }
        title={
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {doctorName && `${t("student-exam-operations.exam-solution-details.student-grade-card.graded-by")} ${doctorName}`}
          </Typography>
        }
        subheader={
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {subheader ?? ""}
          </Typography>
        }
      />
      {!isExamGoingOn && (
        <CardContent>
          <TextField
            color="secondary"
            multiline
            rows={5}
            label={t("student-exam-operations.exam-solution-details.student-grade-card.doctor-comment")}
            value={doctorComment ?? t("student-exam-operations.exam-solution-details.student-grade-card.no-comment")}
            variant="outlined"
            fullWidth
          />
        </CardContent>
      )}
      {isExamGoingOn && (
        <CardActions>
          <Button
            variant="contained"
            color="success"
            fullWidth
            disabled={!isEligibleForExam}
            onClick={() => router.navigate(`/solve-exam/${examId}`)}
          >
            {t("student-exam-operations.exam-solution-details.student-grade-card.solve-exam")}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
