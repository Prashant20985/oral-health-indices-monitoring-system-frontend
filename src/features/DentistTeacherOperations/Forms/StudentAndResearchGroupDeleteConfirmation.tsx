import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  useTheme,
} from "@mui/material";
import { Diversity2, Groups3 } from "@mui/icons-material";
import { colors } from "../../../themeConfig";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { useStore } from "../../../app/stores/Store";

interface Props {
  groupId: string;
  isOpen: boolean;
  groupName: string;
  onClose: () => void;
  isResearchGroup?: boolean;
}

export default observer(function StudentAndResearchGroupDeleteConfirmation({
  isOpen,
  groupId,
  onClose,
  groupName,
  isResearchGroup = false,
}: Props) {
  const { dentistTeacherStore } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const handleDelete = async () => {
    if (isResearchGroup) {
      await dentistTeacherStore.deleteResearchGroup(groupId).then(() => {
        onClose();
      });
    } else {
      await dentistTeacherStore.deleteGroup(groupId).then(() => {
        onClose();
      });
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        TransitionComponent={SlideUpTransition}
      >
        <Card sx={{ backgroundColor: color.primary[400], p: 1 }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  backgroundColor: color.redAccent[500],
                }}
              >
                {isResearchGroup ? <Diversity2 /> : <Groups3 />}
              </Avatar>
            }
            title={`Are you sure you want to delete ${groupName} ?`}
          />
          <CardActions>
            <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
              <Button
                onClick={() => onClose()}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: color.blueAccent[500],
                  "&:hover": {
                    backgroundColor: color.blueAccent[600],
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={dentistTeacherStore.loading.deleteGroup}
                onClick={handleDelete}
                size="small"
                sx={{
                  backgroundColor: color.redAccent[500],
                  "&:hover": {
                    backgroundColor: color.redAccent[400],
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
});
