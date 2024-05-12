import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import { useStore } from "../../../app/stores/Store";
import { Box, Typography, useTheme, Tab, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { colors } from "../../../themeConfig";
import { Details, Assessment, ChevronLeft, Add } from "@mui/icons-material";
import PatientDetails from "./PatientDetails";
import ButtonLoadingComponent from "../../../app/common/loadingComponents/ButtonLoadingComponent";

export default observer(function PatientProfile() {
  const { id } = useParams();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const navigate = useNavigate();

  const {
    patientStore: { fetchPatientDetails, patientDetails, loading },
  } = useStore();

  const [value, setValue] = React.useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const fetchDetails = async () => {
      await fetchPatientDetails(id!);
    };
    fetchDetails();
  }, [fetchPatientDetails, id]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Button
          variant="text"
          color="info"
          startIcon={<ChevronLeft />}
          onClick={() => navigate(-1)}
          size="small"
        >
          Back
        </Button>
        <Button variant="contained" color="success" startIcon={<Add />}>
          Add Examination Card
        </Button>
      </Box>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: color.greenAccent[600],
              },
            }}
          >
            <Tab
              value="1"
              icon={<Details color="info" />}
              iconPosition="start"
              label={
                <Typography color={color.grey[100]}>Patient Details</Typography>
              }
            />
            <Tab
              value="2"
              icon={<Assessment color="info" />}
              iconPosition="start"
              label={
                <Typography color={color.grey[100]}>Patient Cards</Typography>
              }
            />
          </TabList>
        </Box>
        <>
          {loading.patientDetails ? (
            <ButtonLoadingComponent content="Loading Patient Details..." />
          ) : (
            <>
              {patientDetails && (
                <>
                  <TabPanel value="1">
                    <PatientDetails patientDetails={patientDetails} />
                  </TabPanel>
                  <TabPanel value="2">
                    <Typography>Patient Cards</Typography>
                  </TabPanel>
                </>
              )}
            </>
          )}
        </>
      </TabContext>
    </Box>
  );
});
