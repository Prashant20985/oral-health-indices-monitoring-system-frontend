import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import StudentList from "../StudentList/StudentList";
import { Box } from "@mui/material";
import Header from "../../../../app/common/header/Header";

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

  return (
    <Box>
      <Box mb={3}>
        <Header
          title="Unsupervised Students"
          subTitle="Students Not Under My Supervison"
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
