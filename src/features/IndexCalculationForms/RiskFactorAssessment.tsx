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
      options: string[];
      disabled: { lowRisk: boolean; moderateRisk: boolean; highRisk: boolean };
    };
  } = {
    "Fluoride exposure": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Consumption of sweetened products and beverages": {
      options: ["During main meals", "In between meals"],
      disabled: { lowRisk: false, moderateRisk: true, highRisk: false },
    },
    "Systematic Dental Care": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Systemic diseases": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Eating disorders": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Complex Pharmacotherapy": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Alcohol/Nicotine": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "New carious lesions in the last 36 months": {
      options: ["None", "1-2", ">3"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: false },
    },
    "Visible Plaque": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Teeth extraction due to caries in the last 36 months": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: true, highRisk: false },
    },
    "Abnormal Tooth Morphology": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "1 or more proximal restorations": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Exposed root surfaces": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Overhanging fills, no contact points": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Fixed Orthodontic Braces": {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    Xerostomy: {
      options: ["YES", "NO"],
      disabled: { lowRisk: false, moderateRisk: false, highRisk: true },
    },
    "Caries risk factor assessment": {
      options: ["YES", "NO"],
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
                const options =
                  riskFactorAssessmentOptions[row.questionText].options || [];
                const disabled =
                  riskFactorAssessmentOptions[row.questionText].disabled || {};
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" fontWeight={600}>
                        {row.questionText}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select={!isView}
                        fullWidth
                        color="secondary"
                        name={`${name}.questions[${index}].answer.lowRisk`}
                        value={row.answer.lowRisk}
                        onChange={handleChange}
                        disabled={disabled.lowRisk}
                        inputProps={{ readOnly: isView }}
                      >
                        {options.map((option, idx) => (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select={!isView}
                        color="secondary"
                        fullWidth
                        name={`${name}.questions[${index}].answer.moderateRisk`}
                        value={row.answer.moderateRisk}
                        onChange={handleChange}
                        inputProps={{ readOnly: isView }}
                        disabled={disabled.moderateRisk}
                      >
                        {options.map((option, idx) => (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select={!isView}
                        fullWidth
                        color="secondary"
                        name={`${name}.questions[${index}].answer.highRisk`}
                        value={row.answer.highRisk}
                        onChange={handleChange}
                        inputProps={{ readOnly: isView }}
                        disabled={disabled.highRisk}
                      >
                        {options.map((option, idx) => (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        ))}
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
