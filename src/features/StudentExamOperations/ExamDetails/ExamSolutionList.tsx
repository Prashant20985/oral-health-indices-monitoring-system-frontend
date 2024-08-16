import { observer } from "mobx-react-lite";
import { ExamSolution } from "../../../app/models/StudentExam";
import Header from "../../../app/common/header/Header";
import { Box, Grid, Paper, useTheme } from "@mui/material";
import ExamSolutionCard from "./ExamSolutionCard";
import { colors } from "../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface Props {
  examSolutions: ExamSolution[];
  examId: string;
}

/**
 * Renders a list of exam solutions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.examSolutions - The array of exam solutions.
 * @param {string} props.examId - The ID of the exam.
 * @returns {JSX.Element} The rendered ExamSolutionList component.
 */
export default observer(function ExamSolutionList({
  examSolutions,
  examId,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? color.primary[500] : blueGrey[50],
        p: 1.5,
        height: "100%",
      }}
    >
      <Box mb={2}>
        <Header
          title={t(
            "student-exam-operations.exam-details.exam-solution-list.header"
          )}
          subTitle={`${t(
            "student-exam-operations.exam-details.exam-solution-list.sub-header"
          )} ${examSolutions.length}`}
        />
      </Box>
      <Grid container spacing={1}>
        {examSolutions.map((solution) => (
          <Grid item lg={6} md={6} sm={12} key={solution.id}>
            <ExamSolutionCard examSolution={solution} examId={examId} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
});
