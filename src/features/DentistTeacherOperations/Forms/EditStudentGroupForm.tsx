import { observer } from "mobx-react-lite";
import { Box, Dialog, Typography } from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Form, Formik } from "formik";
import { useStore } from "../../../app/stores/Store";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  groupId?: string;
  name?: string;
}

/**
 * Renders a form for editing a student group.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the form is open or not.
 * @param {Function} props.onClose - The function to close the form.
 * @param {string} props.groupId - The ID of the group.
 * @param {string} props.name - The name of the group.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function EditGroupForm({
  isOpen,
  onClose,
  groupId,
  name,
}: Props) {
  const { dentistTeacherStore } = useStore();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSubmit = async (groupName: string) => {
    await dentistTeacherStore.updateStudentGroupName(groupId!, groupName).then(() => {
      onClose();
      setSnackbarOpen(true);
    });
  };

  const [t] = useTranslation("global");

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        TransitionComponent={SlideUpTransition}
        onClose={() => onClose()}
      >
        <Box
          display="flex"
          padding={3}
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%">
            <Formik
              initialValues={{
                groupName: name,
                error: null,
              }}
              onSubmit={async (values, { setErrors }) =>
                await handleSubmit(values.groupName!).catch((error) => {
                  setErrors({ error: error.response.data });
                })
              }
            >
              {({
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    fontWeight="bold"
                    sx={{ mb: "15px" }}
                    align="left"
                  >
                    {t("dentist-teacher-operations.forms.edit-student-group-form.header")}
                  </Typography>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: "span 4",
                      },
                    }}
                  >
                    <CustomTextField
                      label={t("dentist-teacher-operations.forms.edit-student-group-form.group-name")}
                      name="groupName"
                      required={true}
                      value={values.groupName}
                      onChange={handleChange}
                      error={touched.groupName && !!errors.groupName}
                      helperText={touched.groupName ? errors.groupName : ""}
                      gridColumn="span 4"
                    />

                    <CustomErrorMessage error={errors.error} />

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ gridColumn: "span 4", gap: 2 }}
                    >
                      <CustomSubmitButton
                        isSubmitting={isSubmitting}
                        buttonText={t("dentist-teacher-operations.forms.edit-student-group-form.save-button")}
                      />
                      <CustomCancelButton handleCancel={() => onClose()} />
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Dialog>
      <CustomSanckbar
        snackbarOpen={snackbarOpen}
        snackbarClose={() => setSnackbarOpen(false)}
        message={t("dentist-teacher-operations.forms.edit-student-group-form.group-edited-message")}
      />
    </>
  );
});
