import { Box, Dialog, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Form, Formik } from "formik";
import { ResearchGroupFormValues } from "../../../app/models/ResearchGroup";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/Store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  researchGroupId?: string;
  groupName?: string;
  description?: string;
  isEdit?: boolean;
}

export default observer(function ResearchGroupForm({
  isOpen,
  onClose,
  researchGroupId = "",
  groupName = "",
  description = "",
  isEdit = false,
}: Props) {
  const { dentistTeacherStore } = useStore();

  const initialValues: ResearchGroupFormValues = {
    groupName: groupName,
    description: description,
  };

  const handleSubmit = async (values: ResearchGroupFormValues) => {
    if (isEdit) {
      await dentistTeacherStore
        .updateResearchGroup(researchGroupId, values)
        .then(() => {
          onClose();
        });
    } else {
      await dentistTeacherStore.createResearchGroup(values).then(() => {
        onClose();
      });
    }
  };

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
              initialValues={{ ...initialValues, error: null }}
              validationSchema={Yup.object().shape({
                groupName: Yup.string().max(
                  50,
                  "Group Name must be at most 50 characters"
                ),
                description: Yup.string().max(
                  500,
                  "Description must be at most 500 characters"
                ),
              })}
              onSubmit={async (values, { setErrors }) => {
                await handleSubmit(values).catch((error) => {
                  setErrors({ error: error.response.data });
                });
              }}
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
                    {!isEdit ? "Add New Research Group" : "Edit Research Group"}
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
                      name="groupName"
                      label="Group Name (Max 50 characters)"
                      onChange={handleChange}
                      required={true}
                      value={values.groupName}
                      error={touched.groupName && !!errors.groupName}
                      helperText={touched.groupName ? errors.groupName : ""}
                      gridColumn="span 4"
                    />

                    <TextField
                      label="Description (Max 500 characters)"
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      error={touched.description && !!errors.description}
                      helperText={touched.description ? errors.description : ""}
                      sx={{
                        gridColumn: "span 4",
                      }}
                      multiline
                      rows={4}
                      variant="filled"
                      color="secondary"
                    />

                    <CustomErrorMessage error={errors.error} />

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ gridColumn: "span 4", gap: 2 }}
                    >
                      <CustomSubmitButton
                        isSubmitting={isSubmitting}
                        buttonText={isEdit ? "Update" : "Create"}
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
    </>
  );
});
