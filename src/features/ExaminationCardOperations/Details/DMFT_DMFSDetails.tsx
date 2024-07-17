import { observer } from "mobx-react-lite";
import {
  DMFT_DMFSValues,
  UpdateDMFT_DMFSFormValues,
} from "../../../app/models/DMFT_DMFS";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import DMFT_DMFSEditForm from "../Forms/DMFT_DMFSEditForm";
import { Comment } from "@mui/icons-material";

interface Props {
  cardId: string;
  dmft_dmfs: DMFT_DMFSValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

export default observer(function DMFT_DMFSDetails({
  cardId,
  dmft_dmfs,
  isRegularMode,
  isUserEligibleToComment,
  isUserEligibleToEdit,
  setIsEditMode,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const updateDMFT_DMFSFromValues: UpdateDMFT_DMFSFormValues = {
    dmftResult: dmft_dmfs.dmftResult,
    dmfsResult: dmft_dmfs.dmfsResult,
    assessmentModel: dmft_dmfs.assessmentModel,
    prostheticStatus: dmft_dmfs.prostheticStatus,
  };
  return (
    <Box width="100%">
      <Box
        display="flex"
        gap={2}
        mb={3}
        flexDirection="column"
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          padding: 3,
          backgroundColor: color.primary[400],
        }}
      >
        <TextField
          multiline
          fullWidth
          color="secondary"
          label="Doctor DMFT/DMFS Comment"
          rows={3}
          value={dmft_dmfs.doctorComment ?? "No Comment Provided."}
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label="Student DMFT/DMFS Comment"
            rows={3}
            value={dmft_dmfs.studentComment ?? "No Comment Provided."}
          />
        )}
        {isUserEligibleToComment && (
          <Box mt={1} display="flex" justifyContent="flex-end">
            <Button
              color="secondary"
              startIcon={<Comment />}
              variant="contained"
              size="small"
            >
              <Typography variant="h6" fontWeight={600}>
                Comment DMF/DMFS Form
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
      <DMFT_DMFSEditForm
        cardId={cardId}
        updateDMFT_DMFSFromValues={updateDMFT_DMFSFromValues}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
      />
    </Box>
  );
});
