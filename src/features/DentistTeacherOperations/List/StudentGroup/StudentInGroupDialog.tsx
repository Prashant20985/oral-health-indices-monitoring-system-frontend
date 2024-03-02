import { observer } from "mobx-react-lite";
import { Student } from "../../../../app/models/Group";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import SlideUpTransition from "../../../../app/common/transition/SlideUpTransition";
import { Close } from "@mui/icons-material";
import StudentList from "../StudentList/StudentList";
import { blueGrey } from "@mui/material/colors";

interface Props {
  students: Student[];
  handleClose: () => void;
  isOpen: boolean;
  groupId: string;
}

export default observer(function StudentsInGroupDialog({
  students,
  handleClose,
  isOpen,
  groupId,
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
            backgroundColor:
              theme.palette.mode === "dark"
                ? color.primary[400]
                : blueGrey[100],
          },
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h6"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          Students In Group
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <StudentList students={students} groupId={groupId} />
    </Dialog>
  );
});
