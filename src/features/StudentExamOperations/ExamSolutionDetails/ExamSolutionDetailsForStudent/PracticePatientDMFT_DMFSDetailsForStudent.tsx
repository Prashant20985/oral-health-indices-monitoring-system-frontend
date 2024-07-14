import { observer } from "mobx-react-lite";
import { DMFT_DMFS } from "../../../../app/models/DMFT_DMFS";
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
import DMFT_DMFSForm from "../../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm";

interface Props {
  dmft_dmfs: DMFT_DMFS;
}

export default observer(function PracticePatientDMFT_DMFSDetailsForStudent({
  dmft_dmfs,
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
              DMFT/DMFS Details
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            {[
              { label: "DMFT", value: dmft_dmfs.dmftResult },
              { label: "DMFS", value: dmft_dmfs.dmftResult },
            ].map((item) => (
              <TextField
                id={item.label}
                label={item.label}
                value={item.value}
                fullWidth
                color="secondary"
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            ))}
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label="Doctor Comment"
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={dmft_dmfs.comment ?? "No comment yet."}
            />
          </Box>
        </CardContent>
      </Card>
      <DMFT_DMFSForm
        dmft_dmfsAssessmentModel={dmft_dmfs.assessmentModel}
        prostheticStatus={dmft_dmfs.prostheticStatus}
        isView
      />
    </Box>
  );
});
