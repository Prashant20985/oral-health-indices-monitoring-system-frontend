import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
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
    </Box>
  );
}
