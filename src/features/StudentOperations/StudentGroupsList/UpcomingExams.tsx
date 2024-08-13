import { observer } from "mobx-react-lite";
import { Alert, Box, Typography, useTheme } from "@mui/material";
import StudentExamCard from "../../StudentExamOperations/ExamsList/StudentExamCard";
import { colors } from "../../../themeConfig";
import { useTranslation } from "react-i18next";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import LoadingComponent from "../../../app/common/loadingComponents/LoadingComponent";

interface Props {
  direction?: "row" | "column";
}

/**
 * Renders a component that displays upcoming exams for students.
 *
 * @component
 * @param {Object} Props - The component props.
 * @param {string} Props.direction - The direction of the component layout. Defaults to "column".
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function UpcomingExams({
  direction = "column",
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    studentExamStore: {
      upcomingExams,
      getUpcomingExams,
      loading: { upcomingExams: loadingUpcomingExams },
    },
  } = useStore();

  const [t] = useTranslation("global");

  React.useEffect(() => {
    const loadUpcomingExams = async () => {
      await getUpcomingExams();
    };
    loadUpcomingExams();
  }, [getUpcomingExams]);

  return (
    <Box
      sx={{
        boxShadow: 2,
        padding: 2,
        backgroundColor: color.primary[400],
      }}
    >
      <Box m={2}>
        <Typography variant="h6" fontWeight={600} textTransform="uppercase">
          {t("student-operations.student-group-list.upcoming-exams.title")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: direction,
          gap: 1,
          height: direction === "column" ? "70vh" : "auto",
          overflowY: direction === "column" ? "auto" : "hidden",
          overflowX: direction === "row" ? "auto" : "hidden",
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        {loadingUpcomingExams ? (
          <LoadingComponent content="Loading Upcoming Exams..." />
        ) : (
          <>
            {upcomingExams.length > 0 ? (
              upcomingExams.map((exam) => (
                <Box
                  key={exam.id}
                  sx={{
                    width: direction === "row" ? "300px" : "100%",
                    flexShrink: 0,
                  }}
                >
                  <StudentExamCard exam={exam} isTop3 isForStudentUser />
                </Box>
              ))
            ) : (
              <Alert severity="info" variant="outlined" sx={{ width: "100%" }}>
                <Typography variant="h6">
                  {t(
                    "student-operations.student-group-list.upcoming-exams.no-upcoming-exams"
                  )}
                </Typography>
              </Alert>
            )}
          </>
        )}
      </Box>
    </Box>
  );
});
