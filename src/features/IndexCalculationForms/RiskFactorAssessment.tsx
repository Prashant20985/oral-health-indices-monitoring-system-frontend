import { observer } from "mobx-react-lite";
import { RiskFactorAssessment } from "../../app/models/RiskFactorAssesment";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import CustomTextField from "../../app/common/formInputs/CustomTextField";
import Header from "../../app/common/header/Header";

interface Props {
  riskFactorAssessment?: RiskFactorAssessment;
  isViewMode?: boolean;
}

export default observer(function RiskFactorAssessment({
  riskFactorAssessment,
  isViewMode = false,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const initialValues: RiskFactorAssessment =
    isViewMode && riskFactorAssessment
      ? riskFactorAssessment
      : {
          riskFactorAssessmentModel: {
            questions: [
              {
                questionText: "Fluoride exposure",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Consumption of sweetened products and beverages",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Regular dental care",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Systemic diseases",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Eating disorders",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Complex pharmacotherapy",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Alcohol/Nicotine",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "New caries foci within last 36 months",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Visible plaque",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText:
                  "Tooth extraction for caries within the last 36 months",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Unusual tooth morphology",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "1 or more fills on tangent surfaces",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Exposed root surfaces",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Overhanging fills, no contact points",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Fixed braces",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
              {
                questionText: "Xerostomy",
                answer: {
                  lowRisk: "",
                  moderateRisk: "",
                  highRisk: "",
                },
              },
            ],
          },
        };

  return (
    <Box>
      <Box mb={2}>
        <Header title="Risk Factor Assessment" />
      </Box>
      <Box>
        <Formik
          initialValues={{
            ...initialValues.riskFactorAssessmentModel,
          }}
          onSubmit={(values) => {
            // Check if any cell is empty and fill it with "No"
            const updatedValues = { ...values };
            updatedValues.questions.forEach((question) => {
              if (question.answer.lowRisk === "")
                question.answer.lowRisk = "No";
              if (question.answer.moderateRisk === "")
                question.answer.moderateRisk = "No";
              if (question.answer.highRisk === "")
                question.answer.highRisk = "No";
            });
            console.log(updatedValues);
          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <TableContainer
                elevation={3}
                component={Paper}
                sx={{
                  overflow: "auto",
                  height: "70vh",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? color.primary[400]
                      : blueGrey[50],
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {[
                        "Questions",
                        "Low Risk",
                        "Moderate Risk",
                        "High Risk",
                      ].map((value, index) => (
                        <TableCell
                          key={index}
                          sx={{
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? blueGrey[600]
                                : blueGrey[200],
                          }}
                        >
                          <Typography variant="h6" fontWeight={600}>
                            {value}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.questions.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Typography variant="h6" fontWeight={600}>
                            {row.questionText}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <CustomTextField
                            name={`questions[${index}].answer.lowRisk`}
                            type="text"
                            label=""
                            variant="outlined"
                            value={row.answer.lowRisk}
                            onChange={handleChange}
                            readOnly={isViewMode}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomTextField
                            name={`questions[${index}].answer.moderateRisk`}
                            type="text"
                            label=""
                            variant="outlined"
                            value={row.answer.moderateRisk}
                            onChange={handleChange}
                            readOnly={isViewMode}
                          />
                        </TableCell>
                        <TableCell>
                          <CustomTextField
                            name={`questions[${index}].answer.highRisk`}
                            type="text"
                            label=""
                            variant="outlined"
                            value={row.answer.highRisk}
                            onChange={handleChange}
                            readOnly={isViewMode}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
});
