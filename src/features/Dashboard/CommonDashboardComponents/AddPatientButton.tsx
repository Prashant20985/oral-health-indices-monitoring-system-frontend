import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import * as React from "react";
import CreateEditPatientForm from "../../PatientOperations/Forms/CreateEditPatientForm";
import { PersonAddAlt1Rounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Renders a button component for adding a patient.
 *
 * @returns The rendered AddPatientButton component.
 */
export default observer(function AddPatientButton() {
  const [openForm, setOpenForm] = React.useState(false);

  const [t] = useTranslation("global")

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenForm(true)}
        startIcon={<PersonAddAlt1Rounded />}
      >
        {t("dentist-teacher-operations.dashboard.add-patient-button")}
      </Button>
      <CreateEditPatientForm
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
      />
    </>
  );
});
