import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import StudentList from "../StudentList/StudentList";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../../../app/common/header/Header";
import { Add } from "@mui/icons-material";
import { router } from "../../../../app/router/Routes";
import { useTranslation } from "react-i18next";

/**
 * Renders a component for supervising students.
 *
 * @returns The rendered component.
 */
export default observer(function SupervisedStduents() {
  const {
    dentistTeacherStore: {
      supervisedStudents,
      supervisedStudentsSearchParam,
      setSupervisedStudentSearchParams,
      fetchSupervisedStudents,
      loading,
    },
  } = useStore();

  React.useEffect(() => {
    fetchSupervisedStudents();
  }, [fetchSupervisedStudents]);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Box width="100%" display="flex" justifyContent="space-between" mb={1}>
        <Box mb={3}>
          <Header
            title={t(
              "dentist-teacher-operations.list.student-group.supervise-students.header"
            )}
            subTitle={t(
              "dentist-teacher-operations.list.student-group.supervise-students.sub-header"
            )}
          />
        </Box>
        <Box display="flex" gap={2} width="600px">
          <TextField
            color="secondary"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={supervisedStudentsSearchParam.studentName}
            onChange={(e) =>
              setSupervisedStudentSearchParams({
                ...supervisedStudentsSearchParam,
                studentName: e.target.value,
              })
            }
          />
          <TextField
            color="secondary"
            label="Email/User Name"
            variant="outlined"
            fullWidth
            value={supervisedStudentsSearchParam.email}
            onChange={(e) =>
              setSupervisedStudentSearchParams({
                ...supervisedStudentsSearchParam,
                email: e.target.value,
              })
            }
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="success"
          onClick={() => router.navigate("/unsupervised-students")}
        >
          {t(
            "dentist-teacher-operations.list.student-group.supervise-students.add-student-button"
          )}
        </Button>
      </Box>
      <StudentList
        students={supervisedStudents.students}
        loading={loading.supervisedStudents}
        isSupervisedStudents
        studentsInGroupList={false}
        rowCount={supervisedStudents.totalStudents}
        page={supervisedStudentsSearchParam.page}
        pageSize={supervisedStudentsSearchParam.pageSize}
        setPaginationParams={(page: number, pageSize: number) => {
          setSupervisedStudentSearchParams({
            ...supervisedStudentsSearchParam,
            page: page,
            pageSize: pageSize,
          });
        }}
      />
    </Box>
  );
});
