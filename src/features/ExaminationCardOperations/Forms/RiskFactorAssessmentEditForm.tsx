import { observer } from "mobx-react-lite";
import { RiskFactorAssessmentModel } from "../../../app/models/RiskFactorAssesment";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import FormButtons from "./FormButtons";
import RiskFactorAssessment from "../../IndexCalculationForms/RiskFactorAssessment";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  cardId: string;
  riskfactorAssessmentModel: RiskFactorAssessmentModel;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
}

/**
 * Renders a form for editing a risk factor assessment.
 *
 * @param cardId - The ID of the examination card.
 * @param riskfactorAssessmentModel - The model containing the risk factor assessment data.
 * @param setIsEditMode - A function to set the edit mode of the form.
 * @param isUserEligibleToEdit - A boolean indicating whether the user is eligible to edit the form.
 */
export default observer(function RiskFactorAssessmentEditForm({
  cardId,
  riskfactorAssessmentModel,
  setIsEditMode,
  isUserEligibleToEdit,
}: Props) {
  const [isView, setIsView] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const {
    patientExaminationCardStore: { updateRiskFactorAssessment },
  } = useStore();

  const handleSubmitRiskFactorAssessmentForm = async (
    values: RiskFactorAssessmentModel
  ) => {
    await updateRiskFactorAssessment(cardId, values).then(() => {
      setIsView(true);
      setIsEditMode(false);
      setOpenSnackbar(true);
    });
  };
  const [t] = useTranslation("global");
  return (
    <Box width="100%">
      <Formik
        initialValues={{ ...riskfactorAssessmentModel, error: null }}
        onSubmit={async (values, { setErrors }) => {
          await handleSubmitRiskFactorAssessmentForm(values).catch((error) => {
            const errorMessage = error.response?.data?.errors
              ? Object.entries(error.response.data.errors)
                  .map(
                    ([key, messages]) =>
                      `${key}: ${(messages as string[]).join(" ")}`
                  )
                  .join("\n")
              : error.message;
            setErrors({ error: errorMessage });
          });
        }}
      >
        {({ values, handleChange, resetForm, errors, handleSubmit }) => (
          <Form>
            {isUserEligibleToEdit && (
              <FormButtons
                isView={isView}
                setIsView={setIsView}
                setIsEditMode={setIsEditMode}
                resetForm={resetForm}
                handleSubmit={handleSubmit}
              />
            )}
            <Box mt={2} mb={2}>
              <CustomErrorMessage error={errors.error} />
            </Box>
            <RiskFactorAssessment
              riskFactorAssessment={values}
              handleChange={handleChange}
              isView={isView}
            />
          </Form>
        )}
      </Formik>
      <CustomSanckbar
        snackbarOpen={openSnackbar}
        snackbarClose={() => setOpenSnackbar(false)}
        message={t("examination-card-operations.forms.risk-factor-assessment-edit-form.risk-factor-assessment-updated")}
      />
    </Box>
  );
});
