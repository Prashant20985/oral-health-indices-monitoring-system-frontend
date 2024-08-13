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
import { useTranslation } from "react-i18next";

interface Props {
  groupId: string;
  isOpen: boolean;
  groupName: string;
  onClose: () => void;
  isResearchGroup?: boolean;
}

/**
 * Renders a confirmation dialog for deleting a student or research group.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the dialog is open.
 * @param {string} props.groupId - The ID of the group to be deleted.
 * @param {Function} props.onClose - The function to close the dialog.
 * @param {string} props.groupName - The name of the group to be deleted.
 * @param {boolean} [props.isResearchGroup=false] - Indicates whether the group is a research group.
 * @returns {JSX.Element} The rendered confirmation dialog component.
 */
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
      await dentistTeacherStore.deleteStudentGroup(groupId).then(() => {
        onClose();
      });
    }
  };

  const [t] = useTranslation("global");

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
            title={t("dentist-teacher-operations.forms.student-and-research-group-delete-confirmation-form.header")+` ${groupName} ?`}
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
                {t("dentist-teacher-operations.forms.student-and-research-group-delete-confirmation-form.cancel-button")}
              </Button>
              <Button
                variant="contained"
                disabled={dentistTeacherStore.loading.deleteStudentGroup}
                onClick={handleDelete}
                size="small"
                sx={{
                  backgroundColor: color.redAccent[500],
                  "&:hover": {
                    backgroundColor: color.redAccent[400],
                  },
                }}
              >
                {t("dentist-teacher-operations.forms.student-and-research-group-delete-confirmation-form.delete-button")}
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
});
