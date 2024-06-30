import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import CustomTextField from "../../../../app/common/formInputs/CustomTextField";
import { PracticePatient } from "../../../../app/models/Patient";
import { colors } from "../../../../themeConfig";
import { FormikErrors, FormikTouched } from "formik";

interface Props {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  patient: PracticePatient;
  touched?: FormikTouched<PracticePatient>;
  errors?: FormikErrors<PracticePatient>;
}

export default function CreatePracticePatientForm({
  handleChange,
  patient,
  touched,
  errors,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: color.primary[400],
        borderRadius: 2,
        padding: 3,
        boxShadow: 2,
      }}
    >
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      >
        <CustomTextField
          label="First Name"
          name="patientDto.firstName"
          value={patient.firstName}
          onChange={handleChange}
          variant="outlined"
          required
          error={touched?.firstName || !!errors?.firstName}
          helperText={touched?.firstName ? errors?.firstName : ""}
          gridColumn="span 1"
        />

        <CustomTextField
          label="Last Name"
          name="patientDto.lastName"
          onChange={handleChange}
          value={patient.lastName}
          variant="outlined"
          required
          error={touched?.lastName || !!errors?.lastName}
          helperText={touched?.lastName ? errors?.lastName : ""}
          gridColumn="span 1"
        />

        <TextField
          select
          label="Gender"
          name="patientDto.gender"
          value={patient.gender}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          sx={{ gridColumn: "span 1" }}
          error={touched?.gender || !!errors?.gender}
          helperText={touched?.gender ? errors?.gender : ""}
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>

        <CustomTextField
          label="Age"
          name="patientDto.age"
          onChange={handleChange}
          value={patient.age}
          required
          error={touched?.age || !!errors?.age}
          helperText={touched?.age ? errors?.age : ""}
          variant="outlined"
          type="number"
          gridColumn="span 1"
        />

        <CustomTextField
          label="Email"
          name="patientDto.email"
          onChange={handleChange}
          value={patient.email}
          variant="outlined"
          required
          error={touched?.email || !!errors?.email}
          helperText={touched?.email ? errors?.email : ""}
          gridColumn="span 4"
        />

        <CustomTextField
          label="Years In School"
          name="patientDto.yearsInSchool"
          onChange={handleChange}
          value={patient.yearsInSchool}
          required
          error={touched?.yearsInSchool || !!errors?.yearsInSchool}
          helperText={touched?.yearsInSchool ? errors?.yearsInSchool : ""}
          variant="outlined"
          type="number"
          gridColumn="span 2"
        />

        <CustomTextField
          label="Location"
          name="patientDto.location"
          onChange={handleChange}
          value={patient.location}
          required
          error={touched?.location || !!errors?.location}
          helperText={touched?.location ? errors?.location : ""}
          variant="outlined"
          gridColumn="span 2"
        />

        <CustomTextField
          label="Ethnic Group"
          name="patientDto.ethnicGroup"
          onChange={handleChange}
          value={patient.ethnicGroup}
          required
          error={touched?.ethnicGroup || !!errors?.ethnicGroup}
          helperText={touched?.ethnicGroup ? errors?.ethnicGroup : ""}
          variant="outlined"
          gridColumn="span 2"
        />

        <CustomTextField
          label="Other Group"
          name="patientDto.otherGroup"
          onChange={handleChange}
          variant="outlined"
          error={touched?.otherGroup || !!errors?.otherGroup}
          helperText={touched?.otherGroup ? errors?.otherGroup : ""}
          value={patient.otherGroup}
          gridColumn="span 2"
        />

        <CustomTextField
          label="Other Data"
          name="patientDto.otherData"
          onChange={handleChange}
          variant="outlined"
          error={touched?.otherData || !!errors?.otherData}
          helperText={touched?.otherData ? errors?.otherData : ""}
          value={patient.otherData}
          gridColumn="span 4"
        />

        <CustomTextField
          label="Other Data 2"
          name="patientDto.otherData2"
          onChange={handleChange}
          value={patient.otherData2}
          error={touched?.otherData2 || !!errors?.otherData2}
          helperText={touched?.otherData2 ? errors?.otherData2 : ""}
          variant="outlined"
          gridColumn="span 4"
        />

        <CustomTextField
          label="Other Data 3"
          name="patientDto.otherData3"
          onChange={handleChange}
          value={patient.otherData3}
          error={touched?.otherData3 || !!errors?.otherData3}
          helperText={touched?.otherData3 ? errors?.otherData3 : ""}
          variant="outlined"
          gridColumn="span 4"
        />
      </Box>
    </Box>
  );
}
