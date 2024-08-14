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
    "Fluoride exposure": {
      optionLowRisk: "Yes",
      optionModerateRisk: "No",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Consumption of sweetened products and beverages": {
      optionLowRisk: "During main meals",
      optionModerateRisk: "",
      optionHighRisk: "In between meals",
      disabled: { lowRisk: false, moderateRisk: true, highRisk: false },
    },
    "Systematic Dental Care": {
      optionLowRisk: "Yes",
      optionModerateRisk: "No",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Systemic diseases": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Eating disorders": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Complex Pharmacotherapy": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Alcohol/Nicotine": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "New carious lesions in the last 36 months": {
      optionLowRisk: "None",
      optionModerateRisk: "1-2",
      optionHighRisk: ">3",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: false },
    },
    "Visible Plaque": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Teeth extraction due to caries in the last 36 months": {
      optionLowRisk: "No",
      optionModerateRisk: "",
      optionHighRisk: "Yes",
      disabled: { lowRisk: false, moderateRisk: true, highRisk: false },
    },
    "Abnormal Tooth Morphology": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "1 or more proximal restorations": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Exposed root surfaces": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Overhanging fills, no contact points": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Fixed Orthodontic Braces": {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    Xerostomy: {
      optionLowRisk: "No",
      optionModerateRisk: "Yes",
      optionHighRisk: "",
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Caries risk factor assessment": {
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
                  row.questionText === "Caries risk factor assessment";

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
