import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import StudentList from "../StudentList/StudentList";
import { Box, Button } from "@mui/material";
import Header from "../../../../app/common/header/Header";
import { Add } from "@mui/icons-material";
import { router } from "../../../../app/router/Routes";
import { useTranslation } from "react-i18next";

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
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Header
            title={t(
              "dentist-teacher-operations.list.student-group.supervise-students.header"
            )}
            subTitle={t(
              "dentist-teacher-operations.list.student-group.supervise-students.sub-header"
            )}
          />
        </Box>
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
