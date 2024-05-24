import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import GroupForStudentCard from "./GroupForStudentCard";
import Header from "../../../app/common/header/Header";
import { colors } from "../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { SearchRounded } from "@mui/icons-material";
import StudentExamCard from "../../StudentExamOperations/ExamsList/StudentExamCard";
import NoRowsFound from "../../../app/common/NoRowsFound/NoRowsFound";

export default observer(function GroupsListForStudent() {
  const {
    studentStore: {
      fetchStudentGroupsWithExams,
      studentGroupsWithExams,
      getTop3ExamsByDate,
    },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    if (studentGroupsWithExams.length === 0) {
      fetchStudentGroupsWithExams();
    }
  }, [fetchStudentGroupsWithExams, studentGroupsWithExams]);

  const [groupSearchQuery, setGroupSearchQuery] = React.useState("");

  const filteredGroups = studentGroupsWithExams.filter((group) =>
    group.groupName.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return (
    <Box>
      <Header title="My Groups" />
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6} lg={8}>
          <Paper
            sx={{
              p: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.primary[500]
                  : blueGrey[50],
              minHeight: "70vh",
            }}
          >
            <TextField
              color="info"
              label="Search"
              component={Paper}
              type="text"
              fullWidth
              value={groupSearchQuery}
              onChange={(e) => setGroupSearchQuery(e.target.value)}
              size="small"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? color.primary[400]
                    : blueGrey[100],
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {filteredGroups.map((group) => (
                <Grid item md={12} lg={6} sm={12} xs={12} key={group.id}>
                  <GroupForStudentCard group={group} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" fontWeight={600} textTransform="uppercase">
              Upcoming Exams
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {getTop3ExamsByDate.length > 0 ? (
                <>
                  {getTop3ExamsByDate.map((exam) => (
                    <StudentExamCard
                      key={exam.id}
                      exam={exam}
                      isExamDetails
                      forStudentUser
                    />
                  ))}
                </>
              ) : (
                <NoRowsFound />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});
