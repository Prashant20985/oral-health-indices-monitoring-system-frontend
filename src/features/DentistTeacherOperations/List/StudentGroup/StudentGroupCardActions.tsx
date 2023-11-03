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
import { Student } from "../../../../app/models/Group";

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

  const [studentsInGroupDialog, setStudentsInGroupDialog] = React.useState<{
    groupId: string;
    students: Student[];
    isOpen: boolean;
  }>({
    groupId: "",
    students: [],
    isOpen: false,
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
            <IconButton>
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
        handleClose={() => handleCloseStudentsInGroupDialog()}
      />
    </>
  );
});
