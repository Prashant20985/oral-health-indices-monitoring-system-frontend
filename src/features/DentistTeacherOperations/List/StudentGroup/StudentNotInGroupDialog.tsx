import { observer } from "mobx-react-lite";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  useTheme,
} from "@mui/material";
import SlideUpTransition from "../../../../app/common/transition/SlideUpTransition";
import { Groups3 } from "@mui/icons-material";
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
    <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
      <Card
        style={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#1F2A40" : "#E2DFD2",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                backgroundColor: color.redAccent[400],
                height: 30,
                width: 30,
              }}
              aria-label="group"
            >
              <Groups3 />
            </Avatar>
          }
          title="Students To Add"
        />
        <StudentList
          students={students}
          groupId={groupId}
          studentsInGroupList={false}
        />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
});
