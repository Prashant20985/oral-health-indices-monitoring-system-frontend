import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import StudentList from "../StudentList/StudentList";
import { Box, Button } from "@mui/material";
import Header from "../../../../app/common/header/Header";
import { Add } from "@mui/icons-material";
import { router } from "../../../../app/router/Routes";

export default observer(function SupervisedStduents() {
  const {
    dentistTeacherStore: {
      supervisedStudents,
      fetchSupervisedStudents,
      loading,
    },
  } = useStore();

  React.useEffect(() => {
    fetchSupervisedStudents();
  }, [fetchSupervisedStudents]);

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
            title="Supervised Students"
            subTitle="Students Under My Supervison"
          />
        </Box>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="success"
          onClick={() => router.navigate("/unsupervised-students")}
        >
          Add Student
        </Button>
      </Box>
      <StudentList
        students={supervisedStudents}
        loading={loading.supervisedStudents}
        isSupervisedStudents
        studentsInGroupList={false}
      />
    </Box>
  );
});
