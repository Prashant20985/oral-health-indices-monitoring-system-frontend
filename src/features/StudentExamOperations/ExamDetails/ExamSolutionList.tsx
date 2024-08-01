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

export default observer(function ExamSolutionList({ examSolutions, examId }: Props) {
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
        minHeight: "50vh",
      }}
    >
      <Box mb={2}>
        <Header
          title={t("student-exam-operations.exam-details.exam-solution-list.header")}
          subTitle={`${t("student-exam-operations.exam-details.exam-solution-list.sub-header")} ${examSolutions.length}`}
        />
      </Box>
      <Grid container spacing={1}>
        {examSolutions.map((solution) => (
          <Grid item xs={12} lg={4} md={6} sm={6} key={solution.id}>
            <ExamSolutionCard examSolution={solution} examId={examId}/>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
});
