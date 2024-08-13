import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../../app/common/header/Header";
import { router } from "../../../../app/router/Routes";
import { useStore } from "../../../../app/stores/Store";
import StudentList from "../StudentList/StudentList";
import { useTranslation } from "react-i18next";

/**
 * Renders a list of students who are not in a specific student group.
 * @returns The JSX element representing the StudentsNotInResearchGroupList component.
 */
export default observer(function StudentsNotInResearchGroupList() {
  const { dentistTeacherStore } = useStore();

  const theme = useTheme();

  const { id } = useParams<string>();

  React.useEffect(() => {
    if (id) {
      dentistTeacherStore.getStudentGroup(id);
    }
    const getStudentsNotInStudentGroup = async () => {
      await dentistTeacherStore.getStudentsNotInStudentGroup(id!);
    };
    getStudentsNotInStudentGroup();
  }, [dentistTeacherStore, id]);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Button
        color={theme.palette.mode === "dark" ? "secondary" : "info"}
        size="small"
        onClick={() => router.navigate(`/student-groups/${id}`)}
        startIcon={<ArrowBackIos />}
      >
        Back
      </Button>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box sx={{ mt: 2, mb: 2 }}>
          <Header
            title={
              t(
                "dentist-teacher-operations.list.student-group.students-not-in-group.header"
              ) + ` ${dentistTeacherStore.selectedStudentGroup?.groupName}`
            }
          />
        </Box>
        <Box display="flex" gap={2} alignItems="center" width="50%">
          <TextField
            label="Email"
            fullWidth
            variant="filled"
            color="secondary"
            sx={{ mb: 2 }}
            value={dentistTeacherStore.studentsNotInGroupSearchParams.email}
            onChange={(e) => {
              dentistTeacherStore.setStudentsNotInGroupSearchParams({
                ...dentistTeacherStore.studentsNotInGroupSearchParams,
                email: e.target.value,
              });
            }}
          />
          <TextField
            label="Student Name"
            variant="filled"
            fullWidth
            value={
              dentistTeacherStore.studentsNotInGroupSearchParams.studentName
            }
            color="secondary"
            sx={{ mb: 2 }}
            onChange={(e) => {
              dentistTeacherStore.setStudentsNotInGroupSearchParams({
                ...dentistTeacherStore.studentsNotInGroupSearchParams,
                studentName: e.target.value,
              });
            }}
          />
        </Box>
      </Box>
      <StudentList
        students={dentistTeacherStore.studentsNotInGroup.students}
        groupId={id!}
        studentsInGroupList={false}
        loading={dentistTeacherStore.loading.studentsNotInGroup}
        rowCount={dentistTeacherStore.studentsNotInGroup.totalStudents}
        page={dentistTeacherStore.studentsNotInGroupSearchParams.page}
        pageSize={dentistTeacherStore.studentsNotInGroupSearchParams.pageSize}
        setPaginationParams={(page: number, pageSize: number) => {
          dentistTeacherStore.setStudentsNotInGroupSearchParams({
            ...dentistTeacherStore.studentsNotInGroupSearchParams,
            page: page,
            pageSize: pageSize,
          });
        }}
      />
    </Box>
  );
});
