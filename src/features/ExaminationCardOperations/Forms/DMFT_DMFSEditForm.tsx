import { observer } from "mobx-react-lite";
import { UpdateDMFT_DMFSFormValues } from "../../../app/models/DMFT_DMFS";
import React from "react";
import { useStore } from "../../../app/stores/Store";
import { Box, Paper, TextField, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import FormButtons from "./FormButtons";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import DMFT_DMFSForm from "../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { colors } from "../../../themeConfig";

interface Props {
  cardId: string;
  updateDMFT_DMFSFromValues: UpdateDMFT_DMFSFormValues;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
}

/**
 * Renders a form for editing DMFT/DMFS values.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.cardId - The ID of the examination card.
 * @param {Function} props.updateDMFT_DMFSFromValues - The function to update DMFT/DMFS form values.
 * @param {Function} props.setIsEditMode - The function to set the edit mode.
 * @param {boolean} props.isUserEligibleToEdit - Indicates whether the user is eligible to edit.
 * @returns {JSX.Element} The DMFT/DMFS edit form component.
 */
export default observer(function DMFT_DMFSEditForm({
  cardId,
  updateDMFT_DMFSFromValues,
  setIsEditMode,
  isUserEligibleToEdit,
}: Props) {
  const [isView, setIsView] = React.useState(true);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const {
    patientExaminationCardStore: { updateDMFT_DMFSForm },
  } = useStore();

  const handleSubmitDMFT_DMFSForm = async (
    values: UpdateDMFT_DMFSFormValues
  ) => {
    await updateDMFT_DMFSForm(cardId, values).then(() => {
      setIsView(true);
      setIsEditMode(false);
      setOpenSnackbar(true);
    });
  };

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box width="100%">
      <Formik
        initialValues={{ ...updateDMFT_DMFSFromValues, error: null }}
        onSubmit={async (values, { setErrors }) => {
          await handleSubmitDMFT_DMFSForm(values).catch((error) => {
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

            <Box
              display="flex"
              gap={2}
              mb={3}
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: 2,
                padding: 3,
                backgroundColor: color.primary[400],
              }}
            >
              <TextField
                variant="outlined"
                label="DMFT Result"
                name="dmftResult"
                color="secondary"
                value={values.dmftResult}
                onChange={handleChange}
                inputProps={{ readOnly: isView }}
              />
              <TextField
                variant="outlined"
                label="DMFS Result"
                name="dmfsResult"
                color="secondary"
                value={values.dmfsResult}
                onChange={handleChange}
                inputProps={{ readOnly: isView }}
              />
            </Box>
            <DMFT_DMFSForm
              isView={isView}
              dmft_dmfsAssessmentModel={values.assessmentModel}
              handleChange={handleChange}
              prostheticStatus={values.prostheticStatus}
            />
          </Form>
        )}
      </Formik>
      <CustomSanckbar
        snackbarOpen={openSnackbar}
        snackbarClose={() => setOpenSnackbar(false)}
        message="DMFT/DMFS Form Updated Successfully!"
      />
    </Box>
  );
});
