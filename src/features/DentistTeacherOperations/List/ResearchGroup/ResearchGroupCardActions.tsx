import {
  AddCircleOutline,
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

interface Props {
  researchGroup: ResearchGroup;
}

export default observer(function ResearchGroupCardActions({
  researchGroup,
}: Props) {
  const [openEditGroupDialog, setOpenEditGroupDialog] = React.useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false);
  const theme = useTheme();
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
            onClick={() => console.log(researchGroup)}
          >
            View Patients
          </Button>
        </Box>
        <Box display="flex">
          <Tooltip title="Add Patient">
            <IconButton>
              <AddCircleOutline color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => setOpenEditGroupDialog(true)}>
              <Edit color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
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
