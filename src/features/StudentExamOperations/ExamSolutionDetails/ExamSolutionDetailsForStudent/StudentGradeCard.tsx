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

interface Props {
  studentMark: number;
  doctorName: string;
  doctorComment: string;
  subheader: string;
  isExamGoingOn?: boolean;
  examId?: string;
  isEligibleForExam?: boolean;
}

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
            {doctorName && `Graded By: ${doctorName}`}
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
            label="Doctor's Comment"
            value={doctorComment ?? "No Comment Provided"}
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
            Solve Exam
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
