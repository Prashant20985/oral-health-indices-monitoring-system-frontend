import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import GroupForStudentCard from "./GroupForStudentCard";
import Header from "../../../app/common/header/Header";
import { colors } from "../../../themeConfig";
import { SearchRounded } from "@mui/icons-material";
import UpcomingExams from "./UpcomingExams";

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
      <Header title="My Groups" subTitle="List Of My Groups" />
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6} lg={8}>
          <Box
            sx={{
              p: 2,
              boxShadow: 2,
              backgroundColor: color.primary[400],
              borderRadius: 2,
              overflowY: "auto",
              minHeight: "70vh",
            }}
          >
            <TextField
              color="info"
              label="Search"
              type="text"
              fullWidth
              value={groupSearchQuery}
              onChange={(e) => setGroupSearchQuery(e.target.value)}
              size="small"
              sx={{
                backgroundColor: "transparent",
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
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <UpcomingExams top3Exams={getTop3ExamsByDate} />
        </Grid>
      </Grid>
    </Box>
  );
});
