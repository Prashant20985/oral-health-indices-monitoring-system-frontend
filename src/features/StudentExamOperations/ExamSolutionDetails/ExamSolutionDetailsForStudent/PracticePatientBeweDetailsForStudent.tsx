import { observer } from "mobx-react-lite";
import { Bewe } from "../../../../app/models/Bewe";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import BeweForm from "../../../IndexCalculationForms/Bewe/BeweForm";

interface Props {
  bewe: Bewe;
}

export default observer(function PracticePatientBeweDetailsForStudent({
  bewe,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? color.primary[400] : blueGrey[50],
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight={600}>
              BEWE Details
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" mb={2}>
            <TextField
              label="BEWE Result"
              value={bewe.beweResult}
              fullWidth
              color="secondary"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label="Doctor's Comment"
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={bewe.comment ?? "No comment yet."}
            />
          </Box>
        </CardContent>
      </Card>
      <BeweForm beweAssessmentModel={bewe.assessmentModel} isView />
    </Box>
  );
});
