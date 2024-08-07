import { observer } from "mobx-react-lite";
import { Summary } from "../../../app/models/Summary";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import FormButtons from "./FormButtons";
import SummaryForm from "../../IndexCalculationForms/SummaryForm";
import React from "react";
import { useStore } from "../../../app/stores/Store";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";

interface Props {
  cardId: string;
  summary: Summary;
  isUserEligibleToEdit: boolean;
  setIsEditMode: (value: boolean) => void;
}

export default observer(function SummaryEditForm({
  cardId,
  summary,
  isUserEligibleToEdit,
  setIsEditMode,
}: Props) {
  const [isView, setIsView] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  
  const {
    patientExaminationCardStore: { updateSummary },
  } = useStore();

  const handleSubmit = async (values: Summary) => {
    await updateSummary(cardId, values).then(() => {
      setIsView(true);
      setIsEditMode(false);
      setOpenSnackbar(true);
    });
  };

  return (
    <Box width="100%">
      <Formik
        initialValues={{ ...summary, error: null }}
        onSubmit={async (values, { setErrors }) => {
          await handleSubmit(values).catch((error) => {
            setErrors({ error: error });
          });
        }}
      >
        {({ values, handleChange, resetForm, errors, handleSubmit }) => (
          <Form>
            <Form>
              {isUserEligibleToEdit && (
                <FormButtons
                  isView={isView}
                  setIsView={setIsView}
                  resetForm={resetForm}
                  message="Summary"
                  setIsEditMode={setIsEditMode}
                  handleSubmit={handleSubmit}
                />
              )}
              <Box mt={2} mb={2}>
                <CustomErrorMessage error={errors.error} />
              </Box>
              <SummaryForm
                isView={isView}
                summary={values}
                handleChange={handleChange}
              />
            </Form>
          </Form>
        )}
      </Formik>
      <CustomSanckbar
        snackbarOpen={openSnackbar}
        snackbarClose={() => setOpenSnackbar(false)}
        message="Summary updated successfully!"
      />
    </Box>
  );
});
