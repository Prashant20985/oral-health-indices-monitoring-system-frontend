import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";
import AdminStore from "./AdminStore";
import DentistTeacherStore from "./DentistTeacherStore";
import UserRequestStore from "./UserRequestStore";
import { PatientStore } from "./PatientStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  adminStore: AdminStore;
  dentistTeacherStore: DentistTeacherStore;
  userRequestStore: UserRequestStore;
  patientStore: PatientStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  adminStore: new AdminStore(),
  dentistTeacherStore: new DentistTeacherStore(),
  userRequestStore: new UserRequestStore(),
  patientStore: new PatientStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
