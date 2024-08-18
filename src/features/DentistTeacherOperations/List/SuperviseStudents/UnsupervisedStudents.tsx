import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import StudentList from "../StudentList/StudentList";
import { Box, TextField } from "@mui/material";
import Header from "../../../../app/common/header/Header";
import { useTranslation } from "react-i18next";

/**
 * Renders a component for displaying a list of unsupervised students.
 *
 * @returns The rendered UnsupervisedStudents component.
 */
export default observer(function UnsupervisedStduents() {
  const {
    dentistTeacherStore: {
      unsupervisedStudents,
      fetchUnsupervisedStudents,
      setUnsupervisedStudentSearchParams,
      unsupervisedStudentsSearchParam,
      loading,
    },
  } = useStore();

  React.useEffect(() => {
    fetchUnsupervisedStudents();
  }, [fetchUnsupervisedStudents]);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Box width="100%" display="flex" justifyContent="space-between" mb={1}>
        <Box mb={3}>
          <Header
            title={t(
              "dentist-teacher-operations.list.student-group.unsupervised-students.header"
            )}
            subTitle={t(
              "dentist-teacher-operations.list.student-group.unsupervised-students.sub-header"
            )}
          />
        </Box>
        <Box display="flex" gap={2} width="600px">
          <TextField
            color="secondary"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={unsupervisedStudentsSearchParam.studentName}
            onChange={(e) =>
              setUnsupervisedStudentSearchParams({
                ...unsupervisedStudentsSearchParam,
                studentName: e.target.value,
              })
            }
          />
          <TextField
            color="secondary"
            label="Email/User Name"
            variant="outlined"
            fullWidth
            value={unsupervisedStudentsSearchParam.email}
            onChange={(e) =>
              setUnsupervisedStudentSearchParams({
                ...unsupervisedStudentsSearchParam,
                email: e.target.value,
              })
            }
          />
        </Box>
      </Box>
      <StudentList
        students={unsupervisedStudents.students}
        loading={loading.unsupervisedStudents}
        isUnsupervisedStudents
        studentsInGroupList={false}
        page={unsupervisedStudentsSearchParam.page}
        pageSize={unsupervisedStudentsSearchParam.pageSize}
        rowCount={unsupervisedStudents.totalStudents}
        setPaginationParams={(page: number, pageSize: number) => {
          setUnsupervisedStudentSearchParams({
            ...unsupervisedStudentsSearchParam,
            page: page,
            pageSize: pageSize,
          });
        }}
      />
    </Box>
  );
});
