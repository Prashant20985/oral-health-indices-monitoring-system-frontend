import { observer } from "mobx-react-lite";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import { colors } from "../../../themeConfig";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Delete, DoubleArrow, Medication } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";

interface Props {
  patientExaminationCard: PatientExaminationCard;
}

export default observer(function ExaminationCardItem({
  patientExaminationCard,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: color.primary[400],
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? blueGrey[400] : blueGrey[600],
              width: 70,
              height: 70,
            }}
            aria-label="patient-card-avatar"
          >
            <Medication sx={{ fontSize: 40 }} />
          </Avatar>
        }
        title={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h3" fontWeight="bold">
              {new Date(
                patientExaminationCard.dateOfExamination
              ).toDateString()}
            </Typography>
            <Chip
              size="small"
              label={
                <Typography
                  fontWeight={700}
                  sx={{ textTransform: "uppercase" }}
                >
                  {patientExaminationCard.isRegularMode
                    ? "Regular Mode"
                    : "Test Mode"}
                </Typography>
              }
              color="secondary"
            />
          </Box>
        }
        subheader={
          <Typography variant="h6" color="textSecondary">
            Created By:{" "}
            {patientExaminationCard.isRegularMode
              ? patientExaminationCard.doctorName
              : patientExaminationCard.studentName}
            <br />
            {!patientExaminationCard.isRegularMode &&
              `Assigned Doctor: ${patientExaminationCard.doctorName}`}
          </Typography>
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          color="secondary"
          label="Description of the treatment"
          value={patientExaminationCard.summary.description}
        />
      </CardContent>
      <CardActions>
        <IconButton>
          <Delete />
        </IconButton>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            variant="outlined"
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            endIcon={<DoubleArrow />}
          >
            View Card
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
});
