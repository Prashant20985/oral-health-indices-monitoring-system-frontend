import { observer } from "mobx-react-lite";
import { Exam } from "../../../app/models/StudentExam";
import { Alert, Box, Typography, useTheme } from "@mui/material";
import StudentExamCard from "../../StudentExamOperations/ExamsList/StudentExamCard";
import { colors } from "../../../themeConfig";

interface Props {
  top3Exams: Exam[];
  direction?: "row" | "column";
}

export default observer(function UpcomingExams({
  top3Exams,
  direction = "column",
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: color.primary[400],
        minHeight: "25vh",
      }}
    >
      <Typography variant="h6" fontWeight={600} textTransform="uppercase">
        Upcoming Exams
      </Typography>
      <Box display="flex" flexDirection={direction} gap={1}>
        {top3Exams.length > 0 ? (
          <>
            {top3Exams.map((exam) => (
              <StudentExamCard
                key={exam.id}
                exam={exam}
                isTop3
                isForStudentUser
              />
            ))}
          </>
        ) : (
          <Alert severity="info" variant="outlined" sx={{ width: "100%" }}>
            <Typography variant="h6">No upcoming Exams</Typography>
          </Alert>
        )}
      </Box>
    </Box>
  );
});
