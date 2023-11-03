import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";
import AdminStore from "./AdminStore";
import ActiveUsersAxiosParamsStore from "./ActiveUsersAxiosParamsStore";
import DeactivatedUsersAxiosParamsStore from "./DeactivatedUsersAxiosParamsStore";
import DeletedUsersAxiosParamsStore from "./DeletedUsersAxiosParamsStore";
import DentistTeacherStore from "./DentistTeacherStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  adminStore: AdminStore;
  activeUsersAxiosParamsStore: ActiveUsersAxiosParamsStore;
  deactivatedUsersAxiosParamsStore: DeactivatedUsersAxiosParamsStore;
  deletedUsersAxiosParamsStore: DeletedUsersAxiosParamsStore;
  dentistTeacherStore: DentistTeacherStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  adminStore: new AdminStore(),
  activeUsersAxiosParamsStore: new ActiveUsersAxiosParamsStore(),
  deactivatedUsersAxiosParamsStore: new DeactivatedUsersAxiosParamsStore(),
  deletedUsersAxiosParamsStore: new DeletedUsersAxiosParamsStore(),
  dentistTeacherStore: new DentistTeacherStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
