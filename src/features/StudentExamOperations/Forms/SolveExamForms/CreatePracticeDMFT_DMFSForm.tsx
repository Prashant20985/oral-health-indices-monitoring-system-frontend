import {
  Box,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DMFT_DMFSForm from "../../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm";
import { PracticeDMFT_DMFSFormValues } from "../../../../app/models/DMFT_DMFS";
import { colors } from "../../../../themeConfig";

interface Props {
  dmft_dmfsFormValues: PracticeDMFT_DMFSFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePracticeDMFT_DMFSForm({
  dmft_dmfsFormValues,
  handleChange,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Box>
      <Box
        component={Paper}
        elevation={3}
        sx={{
          backgroundColor: color.primary[400],
          boxShadow: 2,
          borderRadius: 2,
          p: 2,
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textTransform: "uppercase",
            color: color.greenAccent[400],
            fontweight: 600,
          }}
        >
          Add Calculated DMFT/DMFS Result
        </Typography>

        <TextField
          label="DMFT Result"
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          onChange={handleChange}
          name="practiceDMFT_DMFS.dmftResult"
        />

        <TextField
          label="DMFS Result"
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          onChange={handleChange}
          name="practiceDMFT_DMFS.dmfsResult"
        />
      </Box>

      <DMFT_DMFSForm
        dmft_dmfsAssessmentModel={dmft_dmfsFormValues.assessmentModel}
        handleChange={handleChange}
        name="practiceDMFT_DMFS.assessmentModel"
      />

      <Box display="flex" justifyContent="center">
        <Box
          mt={5}
          display="flex"
          gap={3}
          justifyContent="center"
          alignItems="center"
          component={Paper}
          elevation={3}
          p={2}
          sx={{
            backgroundColor: color.primary[400],
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              color="secodnary"
              fontWeight={700}
              fontFamily="monospace"
              noWrap
            >
              STATUS PROTECTIVE (Removable Restorations)
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              0 &nbsp;&nbsp;&nbsp; No Prosthetic Restorations
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              1 &nbsp;&nbsp;&nbsp; Partial Denture
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              2 &nbsp;&nbsp;&nbsp; Complete Denture
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              X &nbsp;&nbsp;&nbsp; During Prosthetic Treatment
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            select
            color="secondary"
            sx={{ width: 100 }}
            onChange={handleChange}
            value={dmft_dmfsFormValues.prostheticStatus}
            name="practiceDMFT_DMFS.prostheticStatus"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["0", "1", "2", "x"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
}
