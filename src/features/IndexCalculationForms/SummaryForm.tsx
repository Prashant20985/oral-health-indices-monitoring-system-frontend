import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Summary } from "../../app/models/Summary";
import { colors } from "../../themeConfig";

interface Props {
  summary: Summary;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  isView?: boolean;
}

export default function SummaryForm({
  summary,
  handleChange,
  isView,
  name,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 4,
        backgroundColor: color.primary[400],
      }}
    >
      <Box display="flex" gap={6} alignItems="center">
        <Box>
          <Typography
            noWrap
            variant="h4"
            fontFamily="monospace"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Need for Dental Interventions
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            0 &nbsp;&nbsp;&nbsp; Missing
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            1 &nbsp;&nbsp;&nbsp; Preventive Treatment
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            2 &nbsp;&nbsp;&nbsp; Treatment In Normal Mode
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            3 &nbsp;&nbsp;&nbsp; Emergency Treatment (Pain, Infection)
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            4 &nbsp;&nbsp;&nbsp; Interdisciplinary Treatment
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          select
          color="secondary"
          onChange={handleChange}
          value={summary.needForDentalInterventions}
          fullWidth
          label="Need for Dental Interventions"
          name={`${name}.needForDentalInterventions`}
          InputProps={{
            readOnly: isView,
          }}
          inputProps={{ maxLength: 1 }}
          sx={{ width: 250 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {["0", "1", "2", "3", "4"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TextField
        variant="outlined"
        fullWidth
        color="secondary"
        multiline
        label="Proposed Plan of Treatment (Max 500 characters)"
        onChange={handleChange}
        value={summary.proposedTreatment}
        rows={4}
        name={`${name}.proposedTreatment`}
        inputProps={{ maxLength: 500 }}
        InputProps={{
          readOnly: isView,
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        onChange={handleChange}
        color="secondary"
        label="Description of the treatment (Max 500 characters)"
        multiline
        value={summary.description}
        rows={4}
        name={`${name}.description`}
        inputProps={{ maxLength: 500 }}
        InputProps={{
          readOnly: isView,
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        color="secondary"
        multiline
        label="Patient Recommendations (Max 500 characters)"
        onChange={handleChange}
        value={summary.patientRecommendations}
        rows={4}
        name={`${name}.patientRecommendations`}
        inputProps={{ maxLength: 500 }}
        InputProps={{
          readOnly: isView,
        }}
      />
    </Box>
  );
}
