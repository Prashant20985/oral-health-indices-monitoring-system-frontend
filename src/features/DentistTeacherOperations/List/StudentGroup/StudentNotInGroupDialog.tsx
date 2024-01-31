import { observer } from "mobx-react-lite";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import SlideUpTransition from "../../../../app/common/transition/SlideUpTransition";
import { Close } from "@mui/icons-material";
import { colors } from "../../../../themeConfig";
import { Student } from "../../../../app/models/Group";
import StudentList from "../StudentList/StudentList";

interface Props {
  groupId: string;
  isOpen: boolean;
  handleClose: () => void;
  students: Student[];
}

export default observer(function StudentNotInGroupDialog({
  groupId,
  isOpen,
  handleClose,
  students,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      TransitionComponent={SlideUpTransition}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            minWidth: "50rem",
            backgroundColor: color.primary[400],
          },
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignContent="center"
      >
        <Typography variant="h5">Students not in group</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <StudentList
        students={students}
        groupId={groupId}
        studentsInGroupList={false}
      />
    </Dialog>
  );
});
