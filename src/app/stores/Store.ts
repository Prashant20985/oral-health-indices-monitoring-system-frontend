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

/**
 * Represents a store object that contains various store instances.
 * @interface Store
 * @property {CommonStore} commonStore - The common store instance.
 * @property {UserStore} userStore - The user store instance.
 * @property {AdminStore} adminStore - The admin store instance.
 * @property {DentistTeacherStore} dentistTeacherStore - The dentist teacher store instance.
 * @property {UserRequestStore} userRequestStore - The user request store instance.
 * @property {PatientStore} patientStore - The patient store instance.
 * @property {StudentExamStore} studentExamStore - The student exam store instance.
 * @property {StudentStore} studentStore - The student store instance.
 * @property {PatientExaminationCardStore} patientExaminationCardStore - The patient examination card store instance.
 */
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

/**
 * The store object that holds instances of various store classes.
 * @typedef {Object} Store
 * @property {CommonStore} commonStore - The common store instance.
 * @property {UserStore} userStore - The user store instance.
 * @property {AdminStore} adminStore - The admin store instance.
 * @property {DentistTeacherStore} dentistTeacherStore - The dentist teacher store instance.
 * @property {UserRequestStore} userRequestStore - The user request store instance.
 * @property {PatientStore} patientStore - The patient store instance.
 * @property {StudentExamStore} studentExamStore - The student exam store instance.
 * @property {StudentStore} studentStore - The student store instance.
 * @property {PatientExaminationCardStore} patientExaminationCardStore - The patient examination card store instance.
 */
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

/**
 * The context for the store.
 */
export const StoreContext = createContext(store);

/**
 * Returns the store context using the useContext hook.
 *
 * @returns The store context.
 */
export function useStore() {
  return useContext(StoreContext);
}
