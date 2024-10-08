import { observer } from "mobx-react-lite";
import { APIBleedingAssessmentModel } from "../../../app/models/APIBleeding";
import React from "react";
import { useStore } from "../../../app/stores/Store";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import FormButtons from "./FormButtons";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import APIBleedingForm from "../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { useTranslation } from "react-i18next";

interface Props {
  cardId: string;
  assessmentModel: APIBleedingAssessmentModel;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isAPIForm?: boolean;
}

/**
 * Renders a form for editing API Bleeding assessment.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.cardId - The ID of the examination card.
 * @param {APIBleedingAssessmentModel} props.assessmentModel - The assessment model for API Bleeding.
 * @param {Function} props.setIsEditMode - A function to set the edit mode.
 * @param {boolean} props.isUserEligibleToEdit - Indicates whether the user is eligible to edit the form.
 * @param {boolean} props.isAPIForm - Indicates whether the form is an API form.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function APIBleedingEditForm({
  cardId,
  assessmentModel,
  setIsEditMode,
  isUserEligibleToEdit,
  isAPIForm,
}: Props) {
  const [isView, setIsView] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const {
    patientExaminationCardStore: { updateAPIForm, updateBleedingForm },
  } = useStore();

  const handleFormSubmit = async (values: APIBleedingAssessmentModel) => {
    if (isAPIForm) {
      await updateAPIForm(cardId, values).then(() => {
        setIsView(true);
        setIsEditMode(false);
        setOpenSnackbar(true);
      });
    } else {
      await updateBleedingForm(cardId, values).then(() => {
        setIsView(true);
        setIsEditMode(false);
        setOpenSnackbar(true);
      });
    }
  };

  const [t] = useTranslation("global");

  return (
    <Box width="100%">
      <Formik
        initialValues={{ ...assessmentModel, error: null }}
        onSubmit={async (values, { setErrors }) => {
          await handleFormSubmit(values).catch((error) => {
            const errorMessage = error.response?.data?.errors
              ? Object.entries(error.response.data.errors)
                  .map(
                    ([key, messages]) =>
                      `${key}: ${(messages as string[]).join(" ")}`
                  )
                  .join(" ")
              : t("examination-card-operations.forms.api-bleeding-edit-form.error-message");
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
                resetForm={resetForm}
                message={isAPIForm ? "API" : "Bleeding"}
                setIsEditMode={setIsEditMode}
                handleSubmit={handleSubmit}
              />
            )}
            <Box mt={2} mb={2}>
              <CustomErrorMessage error={errors.error} />
            </Box>
            <APIBleedingForm
              isView={isView}
              apiBleedingAssessmentModel={values}
              handleChange={handleChange}
            />
          </Form>
        )}
      </Formik>
      <CustomSanckbar
        snackbarOpen={openSnackbar}
        snackbarClose={() => setOpenSnackbar(false)}
        message={
          isAPIForm
            ? t("examination-card-operations.forms.api-bleeding-edit-form.api-form-updated")
            : t("examination-card-operations.forms.api-bleeding-edit-form.bleeding-form-updated")
        }
      />
    </Box>
  );
});
