import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Comment } from "@mui/icons-material";
import { BleedingValues } from "../../../app/models/APIBleeding";
import APIBleedingEditForm from "../Forms/APIBleedingEditForm";

interface Props {
  cardId: string;
  bleeding: BleedingValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

export default observer(function BleedingDetails({
  cardId,
  bleeding,
  isRegularMode,
  isUserEligibleToComment,
  isUserEligibleToEdit,
  setIsEditMode,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
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
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            color="secondary"
            label="Bleeding Result"
            value={bleeding.bleedingResult}
          />
          <TextField
            fullWidth
            color="secondary"
            label="Maxilla"
            value={bleeding.maxilla}
          />
          <TextField
            fullWidth
            color="secondary"
            label="Mandible"
            value={bleeding.mandible}
          />
        </Box>
        <TextField
          multiline
          fullWidth
          color="secondary"
          label="Doctor Bleeding Comment"
          rows={3}
          value={bleeding.doctorComment ?? "No Comment Provided."}
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label="Student Bleeding Comment"
            rows={3}
            value={bleeding.studentComment ?? "No Comment Provided."}
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
                Comment bleeding Form
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
      <APIBleedingEditForm
        cardId={cardId}
        assessmentModel={bleeding.assessmentModel}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
        isAPIForm={false}
      />
    </Box>
  );
});
