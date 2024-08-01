import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import StudentList from "../StudentList/StudentList";
import { Box } from "@mui/material";
import Header from "../../../../app/common/header/Header";
import { useTranslation } from "react-i18next";

export default observer(function UnsupervisedStduents() {
  const {
    dentistTeacherStore: {
      unsupervisedStudents,
      fetchUnsupervisedStudents,
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
          title={t("dentist-teacher-operations.list.student-group.unsupervised-students.header")}
          subTitle={t("dentist-teacher-operations.list.student-group.unsupervised-students.sub-header")}
        />
      </Box>
      <StudentList
        students={unsupervisedStudents}
        loading={loading.unsupervisedStudents}
        isUnsupervisedStudents
        studentsInGroupList={false}
      />
    </Box>
  );
});
