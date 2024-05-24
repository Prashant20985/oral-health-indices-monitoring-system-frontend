import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import * as React from "react";
import { useStore } from "../../../app/stores/Store";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import Header from "../../../app/common/header/Header";
import StudentExamCard from "../../StudentExamOperations/ExamsList/StudentExamCard";
import { blueGrey } from "@mui/material/colors";
import NoRowsFound from "../../../app/common/NoRowsFound/NoRowsFound";

export default observer(function GroupDetailsForStudent() {
  const { groupId } = useParams<{ groupId: string }>();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

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
            variant="outlined"
            elevation={3}
            sx={{ backgroundColor: color.primary[400] }}
          >
            <CardContent>
              <Header
                title={studentGroupDetails.groupName}
                subTitle={studentGroupDetails.teacher}
              />
            </CardContent>
          </Card>
          <Paper
            elevation={3}
            sx={{
              mt: 3,
              p: 1,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.primary[500]
                  : blueGrey[50],
            }}
          >
            {groupedStudentExams.length > 0 ? (
              <>
                {groupedStudentExams.map(([date, exams]) => (
                  <Box mb={2}>
                    <Typography variant="h4" fontWeight="bold">
                      {date}
                    </Typography>
                    <Grid container spacing={1} sx={{ p: 0.5, width: "100%" }}>
                      {exams.map((exam) => (
                        <Grid item md={6} lg={3} sm={12} xs={12} key={exam.id}>
                          <StudentExamCard exam={exam} forStudentUser />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </>
            ) : (
              <NoRowsFound message="No Exams Found" />
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
});
