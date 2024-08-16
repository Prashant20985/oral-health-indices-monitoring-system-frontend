import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import * as React from "react";
import { useStore } from "../../../app/stores/Store";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import Header from "../../../app/common/header/Header";
import StudentExamCard from "../../StudentExamOperations/ExamsList/StudentExamCard";
import { blueGrey } from "@mui/material/colors";
import { Groups3, Email } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { CalendarIcon } from "@mui/x-date-pickers";

/**
 * Renders the details of a student group.
 *
 * @returns The JSX element representing the group details for a student.
 */
export default observer(function GroupDetailsForStudent() {
  const { groupId } = useParams<{ groupId: string }>();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  const {
    studentStore: {
      fetchStudentGroupDetails,
      studentGroupDetails,
      groupedStudentExams,
    },
  } = useStore();

  React.useEffect(() => {
    if (groupId) {
      fetchStudentGroupDetails(groupId);
    }
  }, [groupId, fetchStudentGroupDetails]);

  return (
    <Box>
      {studentGroupDetails && (
        <Box>
          <Card
            elevation={3}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.primary[400]
                  : blueGrey[50],
              padding: 1,
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? blueGrey[400]
                        : blueGrey[600],

                    width: 80,
                    height: 80,
                  }}
                  aria-label="group"
                >
                  <Groups3 sx={{ fontSize: 50 }} />
                </Avatar>
              }
              title={
                <Header
                  title={studentGroupDetails.groupName}
                  subTitle={`${t(
                    "student-operations.student-group-details.teacher"
                  )}  ${studentGroupDetails.teacher.split("(")[0]}`}
                />
              }
              subheader={
                <Box display="flex" gap={2}>
                  <Box display="flex" gap={1} alignItems="center" mt={1}>
                    <Email />
                    <Typography variant="h6">
                      {`${
                        studentGroupDetails.teacher.split("(")[1].split(")")[0]
                      }@test.com`}
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1} alignItems="center" mt={1}>
                    <CalendarIcon />
                    <Typography variant="h6">
                      Created At: &nbsp;
                      {new Date(
                        studentGroupDetails.createdAt
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </Card>
          <Box
            sx={{
              mt: 3,
              p: 2,
              boxShadow: 2,
              borderRadius: 2,
              backgroundColor: color.primary[400],
            }}
          >
            {groupedStudentExams.length > 0 ? (
              <>
                {groupedStudentExams.map(([date, exams]) => (
                  <Box mb={2} display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h4" fontWeight="bold">
                      {date}
                    </Typography>
                    <Grid container spacing={1} sx={{ p: 0.5, width: "100%" }}>
                      {exams.map((exam) => (
                        <Grid item md={6} lg={3} sm={12} xs={12} key={exam.id}>
                          <StudentExamCard exam={exam} isForStudentUser />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </>
            ) : (
              <Alert severity="info" variant="outlined">
                <Typography variant="h6">
                  {t("student-operations.student-group-details.no-exams-found")}
                </Typography>
              </Alert>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
});
