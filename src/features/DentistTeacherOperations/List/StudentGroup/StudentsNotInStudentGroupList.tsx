import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../../app/common/header/Header";
import { router } from "../../../../app/router/Routes";
import { useStore } from "../../../../app/stores/Store";
import StudentList from "../StudentList/StudentList";
import { useTranslation } from "react-i18next";

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

  const[t] = useTranslation("global");

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
      <Box sx={{ mt: 2, mb: 2 }}>
        <Header
          title={t("dentist-teacher-operations.list.student-group.students-not-in-group.header") +` ${dentistTeacherStore.selectedStudentGroup?.groupName}`}
        />
      </Box>
      <StudentList
        students={dentistTeacherStore.studentsNotInGroup}
        groupId={id!}
        studentsInGroupList={false}
      />
    </Box>
  );
});
