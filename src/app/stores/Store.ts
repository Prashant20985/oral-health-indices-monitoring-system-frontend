import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";
import AdminStore from "./AdminStore";
import ActiveUsersAxiosParamsStore from "./ActiveUsersAxiosParamsStore";
import DeactivatedUsersAxiosParamsStore from "./DeactivatedUsersAxiosParamsStore";
import DeletedUsersAxiosParamsStore from "./DeletedUsersAxiosParamsStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  adminStore: AdminStore;
  activeUsersAxiosParamsStore: ActiveUsersAxiosParamsStore;
  deactivatedUsersAxiosParamsStore: DeactivatedUsersAxiosParamsStore;
  deletedUsersAxiosParamsStore: DeletedUsersAxiosParamsStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  adminStore: new AdminStore(),
  activeUsersAxiosParamsStore: new ActiveUsersAxiosParamsStore(),
  deactivatedUsersAxiosParamsStore: new DeactivatedUsersAxiosParamsStore(),
  deletedUsersAxiosParamsStore: new DeletedUsersAxiosParamsStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
