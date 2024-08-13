import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import StudentList from "../StudentList/StudentList";
import { Box } from "@mui/material";
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
