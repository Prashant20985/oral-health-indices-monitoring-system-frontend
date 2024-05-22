import { observer } from "mobx-react-lite";
import { ExamSolution } from "../../../app/models/StudentExam";
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
import { colors } from "../../../themeConfig";
import { AssessmentOutlined } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { router } from "../../../app/router/Routes";

interface Props {
  examSolution: ExamSolution;
  examId: string;
}

export default observer(function ExamSolutionCard({
  examSolution,
  examId,
}: Props) {
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
            <AssessmentOutlined />
          </Avatar>
        }
        title={
          <Typography variant="h5" fontWeight="bold">
            {examSolution.studentName}
          </Typography>
        }
        subheader={
          <Typography
            variant="h6"
            color="textSecondary"
          >{`Score: ${examSolution.studentMark}`}</Typography>
        }
      />
      <CardContent>
        <TextField
          value={
            examSolution.doctorComment
              ? examSolution.doctorComment
              : "No Comments Yet."
          }
          fullWidth
          multiline
          color="info"
          size="small"
          label="Doctor's Comment"
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="success"
          onClick={() =>
            router.navigate(`/exam-details/${examId}/${examSolution.id}`)
          }
        >
          View Solution
        </Button>
      </CardActions>
    </Card>
  );
});
