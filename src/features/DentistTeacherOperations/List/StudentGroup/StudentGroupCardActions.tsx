import {
  KeyboardDoubleArrowRight,
  AddCircleOutline,
  Edit,
  DeleteSweep,
} from "@mui/icons-material";
import {
  CardActions,
  Box,
  Button,
  Tooltip,
  IconButton,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import * as React from "react";
import StudentInGroupDialog from "./StudentInGroupDialog";
import StudentNotInGroupDialog from "./StudentNotInGroupDialog";
import { Student } from "../../../../app/models/Group";
import { useStore } from "../../../../app/stores/Store";

interface Props {
  groupId: string;
  students: Student[];
  groupName: string;
}

export default observer(function StudentGroupCardActions({
  groupId,
  students,
  groupName,
}: Props) {
  const theme = useTheme();

  const { dentistTeacherStore } = useStore();

  const [studentsInGroupDialog, setStudentsInGroupDialog] = React.useState<{
    groupId: string;
    students: Student[];
    isOpen: boolean;
  }>({
    groupId: "",
    students: [],
    isOpen: false,
  });

  const [studentsNotInGroupDialog, setStudentsNotInGroupDialog] =
    React.useState<{
      groupId: string;
      students: Student[];
      isOpen: boolean;
    }>({
      groupId: "",
      isOpen: false,
      students: [],
    });

  const handleOpenStudentsInGroupDialog = (
    groupId: string,
    groupName: string
  ) => {
    const updatedStudents = students.map((student) => ({
      ...student,
      groupName: groupName,
    }));

    setStudentsInGroupDialog({
      groupId: groupId,
      students: updatedStudents,
      isOpen: true,
    });
  };

  const handleCloseStudentsInGroupDialog = () => {
    setStudentsInGroupDialog({
      groupId: "",
      students: [],
      isOpen: false,
    });
  };

  const handleOpenStudentsNotInGroupDialog = async (groupId: string) => {
    await dentistTeacherStore.getStudentsNotInGroup(groupId);
    setStudentsNotInGroupDialog({
      groupId: groupId,
      isOpen: true,
      students: dentistTeacherStore.studentsNotInGroup,
    });
  };

  const handleCloseStudentsNotInGroupDialog = () => {
    setStudentsNotInGroupDialog({
      groupId: "",
      isOpen: false,
      students: [],
    });
  };

  return (
    <>
      <CardActions
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          height: 35,
        }}
      >
        <Box display="flex">
          <Button
            variant="outlined"
            size="small"
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            endIcon={<KeyboardDoubleArrowRight />}
            onClick={() => handleOpenStudentsInGroupDialog(groupId, groupName)}
          >
            View Students
          </Button>
        </Box>
        <Box display="flex">
          <Tooltip title="Add Student">
            <IconButton
              onClick={() => handleOpenStudentsNotInGroupDialog(groupId)}
            >
              <AddCircleOutline color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Group Name">
            <IconButton>
              <Edit color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Group">
            <IconButton>
              <DeleteSweep color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
      <StudentInGroupDialog
        students={studentsInGroupDialog.students}
        isOpen={studentsInGroupDialog.isOpen}
        groupId={studentsInGroupDialog.groupId}
        handleClose={() => handleCloseStudentsInGroupDialog()}
      />
      <StudentNotInGroupDialog
        groupId={studentsNotInGroupDialog.groupId}
        isOpen={studentsNotInGroupDialog.isOpen}
        students={studentsNotInGroupDialog.students}
        handleClose={handleCloseStudentsNotInGroupDialog}
      />
    </>
  );
});
