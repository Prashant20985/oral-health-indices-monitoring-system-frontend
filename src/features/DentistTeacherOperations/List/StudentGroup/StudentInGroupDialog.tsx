import { observer } from "mobx-react-lite";
import { Student } from "../../../../app/models/Group";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import SlideUpTransition from "../../../../app/common/transition/SlideUpTransition";
import { Groups3 } from "@mui/icons-material";
import StudentList from "../StudentList/StudentList";

interface Props {
  students: Student[];
  handleClose: () => void;
  isOpen: boolean;
}

export default observer(function StudentsInGroupList({
  students,
  handleClose,
  isOpen,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
      <Card
        style={{
          width: "100%",
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
          title="Students in Group"
        />
        <StudentList students={students} />
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
