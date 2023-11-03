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
import EditStudentGroupForm from "../../Forms/EditStudentGroupForm";
import StudentGroupDeleteConfirmation from "../../Forms/StudentGroupDeleteConfirmation";

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

  const [openEditGroupDialog, setOpenEditGroupDialog] = React.useState(false);

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

  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    React.useState<{ isOpen: boolean; groupId: string; groupName: string }>({
      isOpen: false,
      groupId: "",
      groupName: "",
    });

  const handleOpenStudentsInGroupDialog = () => {
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

  const handleOpenStudentsNotInGroupDialog = async () => {
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

  const handleDeleteClick = () => {
    setDeleteConfirmationDialog({
      groupId: groupId,
      isOpen: true,
      groupName: groupName,
    });
  };

  const handleDeleteConfiramtionClose = () => {
    setDeleteConfirmationDialog({
      groupId: "",
      isOpen: false,
      groupName: "",
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
            onClick={() => handleOpenStudentsInGroupDialog()}
          >
            View Students
          </Button>
        </Box>
        <Box display="flex">
          <Tooltip title="Add Student">
            <IconButton onClick={() => handleOpenStudentsNotInGroupDialog()}>
              <AddCircleOutline color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Group Name">
            <IconButton onClick={() => setOpenEditGroupDialog(true)}>
              <Edit color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Group">
            <IconButton onClick={() => handleDeleteClick()}>
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
      <EditStudentGroupForm
        isOpen={openEditGroupDialog}
        groupId={groupId}
        name={groupName}
        onClose={() => setOpenEditGroupDialog(false)}
      />
      <StudentGroupDeleteConfirmation
        isOpen={deleteConfirmationDialog.isOpen}
        groupId={deleteConfirmationDialog.groupId}
        groupName={deleteConfirmationDialog.groupName}
        onClose={() => handleDeleteConfiramtionClose()}
      />
    </>
  );
});
