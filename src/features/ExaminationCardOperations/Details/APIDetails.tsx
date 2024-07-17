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
import { APIValues } from "../../../app/models/APIBleeding";
import { Comment } from "@mui/icons-material";
import APIBleedingEditForm from "../Forms/APIBleedingEditForm";

interface Props {
  cardId: string;
  api: APIValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

export default observer(function APIDetails({
  cardId,
  api,
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
            label="API Result"
            value={api.apiResult}
          />
          <TextField
            fullWidth
            color="secondary"
            label="Maxilla"
            value={api.maxilla}
          />
          <TextField
            fullWidth
            color="secondary"
            label="Mandible"
            value={api.mandible}
          />
        </Box>
        <TextField
          multiline
          fullWidth
          color="secondary"
          label="Doctor API Comment"
          rows={3}
          value={api.doctorComment ?? "No Comment Provided."}
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label="Student API Comment"
            rows={3}
            value={api.studentComment ?? "No Comment Provided."}
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
                Comment API Form
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
      <APIBleedingEditForm
        cardId={cardId}
        assessmentModel={api.assessmentModel}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
        isAPIForm
      />
    </Box>
  );
});
