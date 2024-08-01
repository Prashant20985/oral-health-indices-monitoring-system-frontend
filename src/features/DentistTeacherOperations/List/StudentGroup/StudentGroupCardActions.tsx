import {
  KeyboardDoubleArrowRight,
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
import { StudentGroup } from "../../../../app/models/Group";
import { useStore } from "../../../../app/stores/Store";
import EditStudentGroupForm from "../../Forms/EditStudentGroupForm";
import StudentAndResearchGroupDeleteConfirmation from "../../Forms/StudentAndResearchGroupDeleteConfirmation";
import { router } from "../../../../app/router/Routes";
import { useTranslation } from "react-i18next";

interface Props {
  group: StudentGroup;
}

export default observer(function StudentGroupCardActions({ group }: Props) {
  const theme = useTheme();

  const {
    dentistTeacherStore: { setSelectedStudentGroup },
  } = useStore();

  const [openEditGroupDialog, setOpenEditGroupDialog] = React.useState(false);

  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    React.useState<{ isOpen: boolean; groupId: string; groupName: string }>({
      isOpen: false,
      groupId: "",
      groupName: "",
    });

  const handleDeleteClick = () => {
    setDeleteConfirmationDialog({
      groupId: group.id,
      isOpen: true,
      groupName: group.groupName,
    });
  };

  const handleDeleteConfiramtionClose = () => {
    setDeleteConfirmationDialog({
      groupId: "",
      isOpen: false,
      groupName: "",
    });
  };

  const handleViewDetails = () => {
    setSelectedStudentGroup(group);
    router.navigate(`/student-groups/${group.id}`);
  };

  const [t] = useTranslation("global");

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
            onClick={handleViewDetails}
          >
            {t("dentist-teacher-operations.list.student-group.student-group-card.view-details-button")}
          </Button>
        </Box>
        <Box display="flex">
          <Tooltip title={t("dentist-teacher-operations.list.student-group.student-group-card.edit-group-button")}>
            <IconButton onClick={() => setOpenEditGroupDialog(true)}>
              <Edit color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("dentist-teacher-operations.list.student-group.student-group-card.delete-group-button")}>
            <IconButton onClick={() => handleDeleteClick()}>
              <DeleteSweep color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>

      <EditStudentGroupForm
        isOpen={openEditGroupDialog}
        groupId={group.id}
        name={group.groupName}
        onClose={() => setOpenEditGroupDialog(false)}
      />
      <StudentAndResearchGroupDeleteConfirmation
        isOpen={deleteConfirmationDialog.isOpen}
        groupId={deleteConfirmationDialog.groupId}
        groupName={deleteConfirmationDialog.groupName}
        onClose={() => handleDeleteConfiramtionClose()}
      />
    </>
  );
});
