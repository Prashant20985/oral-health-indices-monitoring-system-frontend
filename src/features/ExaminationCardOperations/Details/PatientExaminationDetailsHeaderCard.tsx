import { observer } from "mobx-react-lite";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import { colors } from "../../../themeConfig";
import { Medication, Download, Person2, Mail } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Button,
  CardContent,
  useTheme,
  Grid,
  Stack,
  TextField,
  CardActions,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Add, Comment } from "@mui/icons-material";

interface Props {
  patientExaminationCard: PatientExaminationCard;
  isUserEligibleToComment: boolean;
  isUserEligibleToEdit: boolean;
}

export default observer(function PatientExaminationDetailsHeaderCard({
  patientExaminationCard,
  isUserEligibleToComment,
  isUserEligibleToEdit,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : color.grey[900],
          marginBottom: 2,
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
              alignItems="center"
              mb={1}
              justifyContent="space-between"
            >
              <Box display="flex" gap={6} alignItems="center">
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
              <Button
                color="secondary"
                variant="contained"
                startIcon={<Download />}
              >
                <Typography variant="h6" fontWeight={600}>
                  Download Report CSV
                </Typography>
              </Button>
            </Box>
          }
          subheader={
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h5" fontWeight="bold">
                Patient Name: {patientExaminationCard.patientName}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} lg={3}>
              <Box component={Stack} spacing={1}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  textTransform={"uppercase"}
                >
                  Doctor Information
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Person2 />
                  <Typography variant="h6" color="textSecondary">
                    {patientExaminationCard.doctorName.split("(")[0]}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Mail />
                  <Typography variant="h6" color="textSecondary">
                    {
                      patientExaminationCard.doctorName
                        .split("(")[1]
                        .split(")")[0]
                    }
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={12} lg={3}>
              {!patientExaminationCard.isRegularMode && (
                <Box component={Stack} spacing={1}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    textTransform={"uppercase"}
                  >
                    Student Information
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Person2 />
                    <Typography variant="h6" color="textSecondary">
                      {patientExaminationCard.studentName.split("(")[0]}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Mail />
                    <Typography variant="h6" color="textSecondary">
                      {
                        patientExaminationCard.studentName
                          .split("(")[1]
                          .split(")")[0]
                      }
                    </Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              multiline
              rows={3}
              color="secondary"
              label="Doctor Comment"
              value={
                patientExaminationCard.doctorComment ?? "No Comment Provided."
              }
            />
            {!patientExaminationCard.isRegularMode && (
              <TextField
                fullWidth
                multiline
                rows={3}
                color="secondary"
                label="Student Comment"
                value={
                  patientExaminationCard.studentComment ??
                  "No Comment Provided."
                }
              />
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ gap: 2, p: 2 }}>
          {isUserEligibleToEdit &&
            patientExaminationCard.totalScore === null && (
              <Button color="info" variant="outlined" startIcon={<Add />}>
                Mark Card
              </Button>
            )}
          {isUserEligibleToComment && (
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<Comment />}
            >
              Comment Card
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
});
