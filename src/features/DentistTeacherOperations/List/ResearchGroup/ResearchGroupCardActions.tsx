import {
  DeleteSweep,
  Edit,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CardActions,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { ResearchGroup } from "../../../../app/models/ResearchGroup";
import * as React from "react";
import ResearchGroupForm from "../../Forms/ResearchGroupForm";
import StudentAndResearchGroupDeleteConfirmation from "../../Forms/StudentAndResearchGroupDeleteConfirmation";
import { router } from "../../../../app/router/Routes";
import { useStore } from "../../../../app/stores/Store";
import { useTranslation } from "react-i18next";

interface Props {
  researchGroup: ResearchGroup;
}

/**
 * Renders the actions for a research group card.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {ResearchGroup} props.researchGroup - The research group object.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function ResearchGroupCardActions({
  researchGroup,
}: Props) {
  const [openEditGroupDialog, setOpenEditGroupDialog] = React.useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false);
  const theme = useTheme();

  const {
    dentistTeacherStore: { setSelectedResearchGroup },
  } = useStore();

  const handleViewDetails = () => {
    setSelectedResearchGroup(researchGroup);
    router.navigate(`/research-groups/${researchGroup.id}`);
  };

  const [t] = useTranslation("global");
  
  return (
    <>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
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
            View Details
          </Button>
        </Box>
        <Box display="flex">
          <Tooltip title={t("dentist-teacher-operations.list.research-group.research-group-card.edit-button")}>
            <IconButton onClick={() => setOpenEditGroupDialog(true)}>
              <Edit color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("dentist-teacher-operations.list.research-group.research-group-card.delete-button")}>
            <IconButton onClick={() => setOpenDeleteConfirmation(true)}>
              <DeleteSweep color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
      <ResearchGroupForm
        isOpen={openEditGroupDialog}
        onClose={() => setOpenEditGroupDialog(false)}
        isEdit={true}
        researchGroupId={researchGroup.id}
        groupName={researchGroup.groupName}
        description={researchGroup.description}
      />
      <StudentAndResearchGroupDeleteConfirmation
        isOpen={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        groupId={researchGroup.id}
        groupName={researchGroup.groupName}
        isResearchGroup={true}
      />
    </>
  );
});
