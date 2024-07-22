import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import * as React from "react";
import CreateEditPatientForm from "../../PatientOperations/Forms/CreateEditPatientForm";
import { PersonAddAlt1Rounded } from "@mui/icons-material";

export default observer(function AddPatientButton() {
  const [openForm, setOpenForm] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenForm(true)}
        startIcon={<PersonAddAlt1Rounded />}
      >
        Add New Patient
      </Button>
      <CreateEditPatientForm
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
      />
    </>
  );
});
