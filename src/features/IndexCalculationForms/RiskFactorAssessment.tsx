import { observer } from "mobx-react-lite";
import {
  Box,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../themeConfig";
import { RiskFactorAssessmentModel } from "../../app/models/RiskFactorAssesment";

interface Props {
  riskFactorAssessment: RiskFactorAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

/**
 * Renders the RiskFactorAssessment component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Object} props.riskFactorAssessment - The risk factor assessment object.
 * @param {boolean} props.isView - Indicates if the component is in view mode.
 * @param {Function} props.handleChange - The change event handler.
 * @param {string} props.name - The name of the component.
 * @returns {JSX.Element} The RiskFactorAssessment component.
 */
export default observer(function RiskFactorAssessment({
  riskFactorAssessment,
  isView,
  handleChange,
  name,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const riskFactorAssessmentOptions: {
    [key: string]: {
      optionLowRisk: string;
      optionModerateRisk: string;
      optionHighRisk: string;
      disabled: { lowRisk: boolean; moderateRisk: boolean; highRisk: boolean };
    };
  } = {
    "Fluoride exposure / Ekspozycja na fluor": {
      optionLowRisk: "Yes",
      optionModerateRisk: "No",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Consumption of sweetened products and beverages / Spożycie słodzonych produktów i napojów": {
      optionLowRisk: "During main meals",
      optionModerateRisk: "",
      optionHighRisk: "In between meals",
      disabled: { lowRisk: false, moderateRisk: true, highRisk: false },
    },
    "Regular Dental Care / Regularna opieka stomatologiczna": {
      optionLowRisk: "Yes",
      optionModerateRisk: "No",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Systemic diseases / Choroby ogólnoustrojowe": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Eating disorders / Zaburzenia odżywiania": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Complex Pharmacotherapy / Złożona farmakoterapia": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Alcohol/Nicotine / Alkohol/Nikotyna": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "New carious lesions in the last 36 months / Nowe ogniska próchnicy w ciągu ostatnich 36 mies.": {
      optionLowRisk: "None",
      optionModerateRisk: "1-2",
      optionHighRisk: ">3",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: false },
    },
    "Visible Plaque / Widoczna płytka nazębna": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Teeth extraction due to caries in the last 36 months / Ekstrakcja zębów z powodu próchnicy w ciągu ostatnich 36 mies.": {
      optionLowRisk: "No",
      optionModerateRisk: "",
      optionHighRisk: "Yes",
      disabled: { lowRisk: false, moderateRisk: true, highRisk: false },
    },
    "Abnormal Tooth Morphology / Nietypowa morfologia zębów": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "1 or more fillings on proximal surfaces / 1 lub więcej wypełnień na powierzchniach stycznych": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Exposed root surfaces / Eksponowane powierzchnie korzeni": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Overhanging fillings, no proximal contact point / Nawisające wypełnienia, brak punktów stycznych": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Fixed braces / Stały aparat ortodontyczny": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Xerostomia / Kserostomia": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Caries Risk Assessment / OCENA RYZYKA PRÓCHNICY": {
      optionLowRisk: "Low Risk",
      optionModerateRisk: "Moderate Risk",
      optionHighRisk: "High Risk",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: false },
    },
  };

  return (
    <Box>
      <Box>
        <TableContainer
          elevation={3}
          component={Paper}
          sx={{
            overflow: "auto",
            height: "80vh",
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: color.primary[400],
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: color.primary[400],
                    width: "300px",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Questions
                  </Typography>
                </TableCell>
                <>
                  {["Low Risk", "Moderate Risk", "High Risk"].map(
                    (value, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          backgroundColor: color.primary[400],
                          width: "180px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {value}
                        </Typography>
                      </TableCell>
                    )
                  )}
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              {riskFactorAssessment.questions.map((row, index) => {
                const optionLowRisk =
                  riskFactorAssessmentOptions[row.questionText].optionLowRisk ||
                  "";

                const optionModerateRisk =
                  riskFactorAssessmentOptions[row.questionText]
                    .optionModerateRisk || "";

                const optionHighRisk =
                  riskFactorAssessmentOptions[row.questionText]
                    .optionHighRisk || "";

                const disabled =
                  riskFactorAssessmentOptions[row.questionText].disabled || {};

                const carriesQ =
                  row.questionText === "Caries Risk Assessment / OCENA RYZYKA PRÓCHNICY";

                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Typography
                        variant={carriesQ ? "h5" : "h6"}
                        fontWeight={carriesQ ? 700 : 400}
                        sx={{ textTransform: carriesQ ? "uppercase" : "none" }}
                        noWrap
                      >
                        {row.questionText}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select={!isView}
                        fullWidth
                        color="secondary"
                        name={
                          name !== undefined
                            ? `${name}.questions[${index}].answer.lowRisk`
                            : `questions[${index}].answer.lowRisk`
                        }
                        value={row.answer.lowRisk}
                        onChange={handleChange}
                        disabled={disabled.lowRisk}
                        inputProps={{ readOnly: isView }}
                        sx={{
                          backgroundColor: carriesQ
                            ? color.pinkAccent[700]
                            : "inherit",
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={optionLowRisk}>
                          {optionLowRisk}
                        </MenuItem>
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select={!isView}
                        color="secondary"
                        fullWidth
                        name={
                          name !== undefined
                            ? `${name}.questions[${index}].answer.moderateRisk`
                            : `questions[${index}].answer.moderateRisk`
                        }
                        value={row.answer.moderateRisk}
                        onChange={handleChange}
                        inputProps={{ readOnly: isView }}
                        disabled={disabled.moderateRisk}
                        sx={{
                          backgroundColor: carriesQ
                            ? color.pinkAccent[700]
                            : "inherit",
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={optionModerateRisk}>
                          {optionModerateRisk}
                        </MenuItem>
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select={!isView}
                        fullWidth
                        color="secondary"
                        name={
                          name !== undefined
                            ? `${name}.questions[${index}].answer.highRisk`
                            : `questions[${index}].answer.highRisk`
                        }
                        value={row.answer.highRisk}
                        onChange={handleChange}
                        inputProps={{ readOnly: isView }}
                        disabled={disabled.highRisk}
                        sx={{
                          backgroundColor: carriesQ
                            ? color.pinkAccent[700]
                            : "inherit",
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={optionHighRisk}>
                          {optionHighRisk}
                        </MenuItem>
                      </TextField>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
});
