import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { API } from "../../../../app/models/APIBleeding";
import { colors } from "../../../../themeConfig";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";

interface Props {
  api: API;
}

export default observer(function PracticePatientAPIDetailsForStudent({
  api,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          backgroundColor: color.primary[400],
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight={600}>
              API Details
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            {[
              { label: "API Result", value: api.apiResult },
              { label: "Maxilla", value: api.maxilla },
              { label: "Mandible", value: api.mandible },
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
          <TextField
            label="Doctor Comment"
            value={api.comment ? api.comment : "No Comment yet."}
            fullWidth
            rows={3}
            multiline
            color="secondary"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </CardContent>
      </Card>
      <APIBleedingForm
        apiBleedingAssessmentModel={api.assessmentModel}
        isView
      />
    </Box>
  );
});
