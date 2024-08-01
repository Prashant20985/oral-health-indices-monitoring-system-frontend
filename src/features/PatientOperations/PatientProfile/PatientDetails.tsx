import { observer } from "mobx-react-lite";
import { Patient } from "../../../app/models/Patient";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import { colors } from "../../../themeConfig";
import { Mail, LocationCity, EditCalendar, School } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface Props {
  patientDetails: Patient;
  isPracticePatient?: boolean;
}

export default observer(function PatientDetails({
  patientDetails,
  isPracticePatient,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] =  useTranslation("global");

  return (
    <Paper
      elevation={5}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? color.primary[500] : blueGrey[50],
        p: 2,
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.primary[400]
                  : blueGrey[100],
            }}
          >
            <CardHeader
              component={Box}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              avatar={
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? blueGrey[500]
                        : blueGrey[600],
                  }}
                >
                  <Typography
                    variant="h1"
                    fontWeight={600}
                    fontSize={60}
                    fontFamily="monospace"
                  >
                    {patientDetails.firstName.charAt(0)}
                    {patientDetails.lastName.charAt(0)}
                  </Typography>
                </Avatar>
              }
            />
            <CardContent>
              <Box display="flex" justifyContent="center" gap={1}>
                <Typography
                  variant="h4"
                  noWrap
                  sx={{ fontFamily: "revert-layer", fontWeight: 700 }}
                >
                  {patientDetails.firstName} {patientDetails.lastName},
                </Typography>
                <Typography variant="h4" color="textSecondary" noWrap>
                  {patientDetails.age}
                </Typography>
              </Box>
              <Box>
                <Stack mt={2} spacing={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Mail />
                    <Typography variant="h6" color="textSecondary">
                      {patientDetails.email}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationCity />
                    <Typography variant="h6" color="textSecondary">
                      {patientDetails.location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <School />
                    <Typography variant="h6" color="textSecondary">
                      {t("patient-operations.patient-profile.years-in-school")} {patientDetails.yearsInSchool}
                    </Typography>
                  </Box>
                  {!isPracticePatient && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <EditCalendar />
                      <Typography variant="h6" color="textSecondary">
                      {t("patient-operations.patient-profile.created-at")}{" "}
                        {new Date(patientDetails.createdAt).toDateString()}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card
            elevation={3}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.primary[400]
                  : blueGrey[50],
            }}
          >
            <CardHeader title={t("patient-operations.patient-profile.header")} />
            <CardContent>
              <Box
                display="grid"
                gap={2}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
                <CustomTextField
                  label={t("patient-operations.patient-profile.first-name")}
                  name="firstName"
                  value={patientDetails.firstName}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 2"
                />

                <CustomTextField
                  label={t("patient-operations.patient-profile.last-name")}
                  name="lastName"
                  value={patientDetails.lastName}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 2"
                />

                <CustomTextField
                  label={t("patient-operations.patient-profile.gender")}
                  name="gender"
                  value={patientDetails.gender}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 2"
                />

                <CustomTextField
                  label={t("patient-operations.patient-profile.ethnic-group")}
                  name="ethnicGroup"
                  value={patientDetails.ethnicGroup}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 2"
                />

                {!isPracticePatient && (
                  <>
                    <CustomTextField
                      label={t("patient-operations.patient-profile.doctor-name")}
                      name="doctorName"
                      value={patientDetails.doctorName}
                      readOnly={true}
                      variant="outlined"
                      gridColumn="span 4"
                    />

                    <CustomTextField
                      label={t("patient-operations.patient-profile.research-group-name")}
                      name="researchGroupName"
                      value={patientDetails.researchGroupName}
                      readOnly={true}
                      variant="outlined"
                      gridColumn="span 4"
                    />
                  </> 
                )}

                <CustomTextField
                  label={t("patient-operations.patient-profile.other-group")}
                  name="otherGroup"
                  value={patientDetails.otherGroup}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 4"
                />

                <CustomTextField
                  label={t("patient-operations.patient-profile.other-data")}
                  name="otherData"
                  value={patientDetails.otherData}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 4"
                />

                <CustomTextField
                  label={t("patient-operations.patient-profile.other-data2")}
                  name="otherData2"
                  value={patientDetails.otherData2}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 4"
                />

                <CustomTextField
                  label={t("patient-operations.patient-profile.other-data3")}
                  name="otherData3"
                  value={patientDetails.otherData3}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 4"
                />

                {patientDetails.isArchived && (
                  <CustomTextField
                    label={t("patient-operations.patient-profile.archive-comment")}
                    name="archiveComment"
                    value={patientDetails.archiveComment}
                    readOnly={true}
                    variant="outlined"
                    gridColumn="span 4"
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
});
