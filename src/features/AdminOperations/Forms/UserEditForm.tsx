import { observer } from "mobx-react-lite";
import { Box, FormControl, useMediaQuery } from "@mui/material";
import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ApplicationUser } from "../../../app/models/ApplicationUser";
import { useStore } from "../../../app/stores/Store";
import { roles } from "../../../app/models/Role";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSelect from "../../../app/common/formInputs/CustomSelect";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";

interface Props {
  applicationUser: ApplicationUser;
  onClose: () => void;
}

export default observer(function UserEditForm({
  applicationUser,
  onClose,
}: Props) {
  const {
    adminStore: { updateApplicationUser },
  } = useStore();

  const [hasChanges, setHasChanges] = React.useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp = /^\d{6,11}$/;
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone Number is Invalid")
      .nullable(),
  });

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (e: React.ChangeEvent<unknown>) => void
  ) => {
    setHasChanges(true);
    handleChange(event);
  };

  return (
    <>
      <Box width="100%">
        {applicationUser && (
          <Formik
            initialValues={{ ...applicationUser, error: null }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors }) =>
              await updateApplicationUser(values.userName, values)
                .catch((error) => setErrors({ error: error.response.data }))
                .finally(() => onClose())
            }
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <Box
                    display="grid"
                    gap="30px"
                    p={4}
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <CustomTextField
                      label="First Name"
                      name="firstName"
                      onChange={(e) => handleFieldChange(e, handleChange)}
                      value={values.firstName}
                      required={true}
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName ? errors.firstName : ""}
                      gridColumn="span 2"
                      type="text"
                    />

                    <CustomTextField
                      label="Last Name"
                      name="lastName"
                      onChange={(e) => handleFieldChange(e, handleChange)}
                      value={values.lastName}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName ? errors.lastName : ""}
                      gridColumn="span 2"
                      type="text"
                    />

                    <CustomTextField
                      label="Phone Number"
                      name="phoneNumber"
                      onChange={(e) => handleFieldChange(e, handleChange)}
                      value={values.phoneNumber}
                      error={touched.firstName && !!errors.phoneNumber}
                      helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                      gridColumn="span 2"
                      type="text"
                    />

                    <Box component={FormControl} sx={{ gridColumn: "span 2" }}>
                      <CustomSelect
                        label="Role"
                        value={values.role}
                        options={roles}
                        required={true}
                        onChange={(event) => {
                          handleChange({
                            target: {
                              name: "role",
                              value: event.target.value,
                            },
                          });
                          setHasChanges(true);
                        }}
                      />
                    </Box>

                    {values.guestUserComment !== null && (
                      <CustomTextField
                        label="Comment"
                        name="guestUserComment"
                        onChange={handleChange}
                        required={true}
                        value={values.guestUserComment}
                        error={
                          touched.guestUserComment && !!errors.guestUserComment
                        }
                        helperText={
                          touched.guestUserComment
                            ? errors.guestUserComment
                            : ""
                        }
                        gridColumn="span 4"
                        type="text"
                      />
                    )}

                    <CustomErrorMessage error={errors.error} />

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ gridColumn: "span 4", gap: 2 }}
                    >
                      {hasChanges && (
                        <CustomSubmitButton
                          isSubmitting={isSubmitting}
                          buttonText="Update"
                          loadingText="Updating..."
                        />
                      )}

                      <CustomCancelButton
                        handleCancel={() => {
                          onClose();
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </>
  );
});
