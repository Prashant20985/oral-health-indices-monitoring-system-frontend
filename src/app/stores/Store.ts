import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";
import AdminStore from "./AdminStore";
import DentistTeacherStore from "./DentistTeacherStore";
import UserRequestStore from "./UserRequestStore";
import { PatientStore } from "./PatientStore";
import { StudentExamStore } from "./StudentExamStore";
import StudentStore from "./StudentStore";
import { PatientExaminationCardStore } from "./PatientExaminationCardStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  adminStore: AdminStore;
  dentistTeacherStore: DentistTeacherStore;
  userRequestStore: UserRequestStore;
  patientStore: PatientStore;
  studentExamStore: StudentExamStore;
  studentStore: StudentStore;
  patientExaminationCardStore: PatientExaminationCardStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  adminStore: new AdminStore(),
  dentistTeacherStore: new DentistTeacherStore(),
  userRequestStore: new UserRequestStore(),
  patientStore: new PatientStore(),
  studentExamStore: new StudentExamStore(),
  studentStore: new StudentStore(),
  patientExaminationCardStore: new PatientExaminationCardStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
