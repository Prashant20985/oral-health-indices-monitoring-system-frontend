import { makeAutoObservable, reaction } from "mobx";
import { store } from "./Store";

export default class DeactivatedUsersAxiosParamsStore {
  searchTerm: string = "";
  userType: string = "";
  role: string = "";

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({
        searchTerm: this.searchTerm,
        userType: this.userType,
        role: this.role,
      }),
      () => {
        store.adminStore.fetchDeactivatedApplicationUsers();
      }
    );
  }

  clearFilters = () => {
    this.setRole("");
    this.setSearchTerm("");
    this.setUserType("");
  };

  setRole = (role: string) => {
    this.role = role;
  };

  setUserType = (userType: string) => {
    this.userType = userType;
  };

  setSearchTerm = (searchTerm: string) => {
    this.searchTerm = searchTerm;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("userName", this.searchTerm);
    params.append("userType", this.userType);
    params.append("role", this.role);
    return params;
  }
}
