import { observer } from "mobx-react-lite";
import { BeweAssessmentModel } from "../../../app/models/Bewe";
import React from "react";
import { useStore } from "../../../app/stores/Store";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import FormButtons from "./FormButtons";
import BeweForm from "../../IndexCalculationForms/Bewe/BeweForm";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";

interface Props {
  cardId: string;
  assessmentModel: BeweAssessmentModel;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
}

export default observer(function BeweEditForm({
  cardId,
  assessmentModel,
  setIsEditMode,
  isUserEligibleToEdit,
}: Props) {
  const [isView, setIsView] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const {
    patientExaminationCardStore: { updateBeweForm },
  } = useStore();

  const handleSubmitBeweForm = async (values: BeweAssessmentModel) => {
    await updateBeweForm(cardId, values).then(() => {
      setIsView(true);
      setIsEditMode(false);
      setOpenSnackbar(true);
    });
  };
  return (
    <Box width="100%">
      <Formik
        initialValues={{ ...assessmentModel, error: null }}
        onSubmit={async (values, { setErrors }) => {
          await handleSubmitBeweForm(values).catch((error) => {
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
            <BeweForm
              beweAssessmentModel={values}
              handleChange={handleChange}
              isView={isView}
            />
          </Form>
        )}
      </Formik>
      <CustomSanckbar
        snackbarOpen={openSnackbar}
        snackbarClose={() => setOpenSnackbar(false)}
        message="Bewe form updated successfully!"
      />
    </Box>
  );
});
