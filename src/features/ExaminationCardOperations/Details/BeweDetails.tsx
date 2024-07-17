import { observer } from "mobx-react-lite";
import { BeweValues } from "../../../app/models/Bewe";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import { Comment } from "@mui/icons-material";
import BeweEditForm from "../Forms/BeweEditForm";

interface Props {
  cardId: string;
  bewe: BeweValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

export default observer(function BeweDetails({
  cardId,
  bewe,
  isRegularMode,
  isUserEligibleToComment,
  isUserEligibleToEdit,
  setIsEditMode,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box>
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
          fullWidth
          color="secondary"
          label="Bewe Result"
          value={bewe.beweResult}
        />
        <TextField
          multiline
          fullWidth
          color="secondary"
          label="Doctor DMFT/DMFS Comment"
          rows={3}
          value={bewe.doctorComment ?? "No Comment Provided."}
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label="Student DMFT/DMFS Comment"
            rows={3}
            value={bewe.studentComment ?? "No Comment Provided."}
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
                Comment BEWE Form
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
      <BeweEditForm
        cardId={cardId}
        assessmentModel={bewe.assessmentModel}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
      />
    </Box>
  );
});
