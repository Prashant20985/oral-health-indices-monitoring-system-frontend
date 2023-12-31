import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  ApplicationUser,
  ApplicationUserFormValues,
} from "../models/ApplicationUser";
import axiosAgent from "../api/axiosAgent";

export default class AdminStore {
  selectedApplicationUser: ApplicationUser | undefined;
  activeApplicationUsers: ApplicationUser[] = [];
  deactivatedApplicationUsers: ApplicationUser[] = [];
  deletedApplicationUsers: ApplicationUser[] = [];
  csvAddResponse: string = "";

  activeApplicationUsersSearchTerm: string = "";
  activeApplicationUsersUserType: string = "";
  activeApplicationUsersRole: string = "";

  deactivatedApplicationUsersSearchTerm: string = "";
  deactivatedApplicationUsersUserType: string = "";
  deactivatedApplicationUsersRole: string = "";

  deletedApplicationUsersSearchTerm: string = "";
  deletedApplicationUsersUserType: string = "";
  deletedApplicationUsersRole: string = "";

  loading = {
    activeApplicationUsers: false,
    deactivatdApplicationUsers: false,
    deletedApplicationUsers: false,
    addAppUser: false,
    addAppUsers: false,
    deleteAppUser: false,
    changeActivationStatus: false,
    updateUser: false,
    userDetails: false,
  };

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({
        searchTerm: this.activeApplicationUsersSearchTerm,
        userType: this.activeApplicationUsersUserType,
        role: this.activeApplicationUsersRole,
      }),
      () => {
        this.fetchActiveApplicationUsers();
      }
    );

    reaction(
      () => ({
        searchTerm: this.deactivatedApplicationUsersSearchTerm,
        userType: this.deactivatedApplicationUsersUserType,
        role: this.deactivatedApplicationUsersRole,
      }),
      () => {
        this.fetchDeactivatedApplicationUsers();
      }
    );

    reaction(
      () => ({
        searchTerm: this.deletedApplicationUsersSearchTerm,
        userType: this.deletedApplicationUsersUserType,
        role: this.deletedApplicationUsersRole,
      }),
      () => {
        this.fetchDeletedApplicationUsers();
      }
    );
  }

  setActiveApplicationUsersSearchTerm = (searchTerm: string) => {
    this.activeApplicationUsersSearchTerm = searchTerm;
  };

  setActiveApplicationUsersUserType = (userType: string) => {
    this.activeApplicationUsersUserType = userType;
  };

  setActiveApplicationUsersRole = (role: string) => {
    this.activeApplicationUsersRole = role;
  };

  setDeactivatedApplicationUsersSearchTerm = (searchTerm: string) => {
    this.deactivatedApplicationUsersSearchTerm = searchTerm;
  };

  setDeactivatedApplicationUsersUserType = (userType: string) => {
    this.deactivatedApplicationUsersUserType = userType;
  };

  setDeactivatedApplicationUsersRole = (role: string) => {
    this.deactivatedApplicationUsersRole = role;
  };

  setDeletedApplicationUsersSearchTerm = (searchTerm: string) => {
    this.deletedApplicationUsersSearchTerm = searchTerm;
  };

  setDeletedApplicationUsersUserType = (userType: string) => {
    this.deletedApplicationUsersUserType = userType;
  };

  setDeletedApplicationUsersRole = (role: string) => {
    this.deletedApplicationUsersRole = role;
  };

  setCsvAddResponse = (response: string) => {
    this.csvAddResponse = response;
  };

  setActiveApplicationUsers = (applicationUsers: ApplicationUser[]) => {
    this.activeApplicationUsers = applicationUsers;
  };

  setDeactivatedApplicationUsers = (applicationUsers: ApplicationUser[]) => {
    this.deactivatedApplicationUsers = applicationUsers;
  };

  setDeletedApplicationUsers = (applicationUsers: ApplicationUser[]) => {
    this.deletedApplicationUsers = applicationUsers;
  };

  clearSelectedApplicationUser = () => {
    this.selectedApplicationUser = undefined;
  };

  clearActiveApplicationUsersFilters = () => {
    this.setActiveApplicationUsersSearchTerm("");
    this.setActiveApplicationUsersUserType("");
    this.setActiveApplicationUsersRole("");
  };

  clearDeactivatedApplicationUsersFilters = () => {
    this.setDeactivatedApplicationUsersSearchTerm("");
    this.setDeactivatedApplicationUsersUserType("");
    this.setDeactivatedApplicationUsersRole("");
  };

  clearDeletedApplicationUsersFilters = () => {
    this.setDeletedApplicationUsersSearchTerm("");
    this.setDeletedApplicationUsersUserType("");
    this.setDeletedApplicationUsersRole("");
  };

  get activeApplicationUsersAxiosParams() {
    const params = new URLSearchParams();
    params.append("searchTerm", this.activeApplicationUsersSearchTerm);
    params.append("userType", this.activeApplicationUsersUserType);
    params.append("role", this.activeApplicationUsersRole);
    return params;
  }

  get deactivatedApplicationUsersAxiosParams() {
    const params = new URLSearchParams();
    params.append("searchTerm", this.deactivatedApplicationUsersSearchTerm);
    params.append("userType", this.deactivatedApplicationUsersUserType);
    params.append("role", this.deactivatedApplicationUsersRole);
    return params;
  }

  get deletedApplicationUsersAxiosParams() {
    const params = new URLSearchParams();
    params.append("searchTerm", this.deletedApplicationUsersSearchTerm);
    params.append("userType", this.deletedApplicationUsersUserType);
    params.append("role", this.deletedApplicationUsersRole);
    return params;
  }

  private getUserDetails = (userName: string) => {
    return this.activeApplicationUsers
      .concat(this.deletedApplicationUsers, this.deactivatedApplicationUsers)
      .find((user) => user.userName === userName);
  };

  fetchActiveApplicationUsers = async () => {
    this.loading.activeApplicationUsers = true;
    try {
      const result = await axiosAgent.AdminOperations.activeUsersList(
        this.activeApplicationUsersAxiosParams
      );
      runInAction(() => {
        this.loading.activeApplicationUsers = false;
        this.setActiveApplicationUsers(result);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.activeApplicationUsers = false;
      });
      throw error;
    }
  };

  fetchDeactivatedApplicationUsers = async () => {
    this.loading.deactivatdApplicationUsers = true;
    try {
      const result = await axiosAgent.AdminOperations.deactivatedUsersList(
        this.deactivatedApplicationUsersAxiosParams
      );
      runInAction(() => {
        this.loading.deactivatdApplicationUsers = false;
        this.setDeactivatedApplicationUsers(result);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.deactivatdApplicationUsers = false;
      });
      throw error;
    }
  };

  fetchDeletedApplicationUsers = async () => {
    this.loading.deletedApplicationUsers = true;
    try {
      const result = await axiosAgent.AdminOperations.deletedUsersList(
        this.deletedApplicationUsersAxiosParams
      );
      runInAction(() => {
        this.loading.deletedApplicationUsers = false;
        this.setDeletedApplicationUsers(result);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.deletedApplicationUsers = false;
      });
      throw error;
    }
  };

  addApplicationUser = async (values: ApplicationUserFormValues) => {
    this.loading.addAppUser = true;
    try {
      await axiosAgent.AdminOperations.addApplicationUser(values);
      runInAction(async () => {
        this.loading.addAppUser = false;
        await this.fetchActiveApplicationUsers();
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.addAppUser = false;
      });
      throw error;
    }
  };

  addApplicationUserFromCsv = async (file: File) => {
    this.loading.addAppUsers = true;
    try {
      const response =
        await axiosAgent.AdminOperations.addApplicationUsersFromCsv(file);
      runInAction(async () => {
        this.loading.addAppUsers = false;
        this.setCsvAddResponse(response.data);
        await this.fetchActiveApplicationUsers();
      });
    } catch (error) {
      runInAction(() => {
        this.loading.addAppUsers = false;
      });
      throw error;
    }
  };

  deleteApplicationUser = async (userName: string, deleteComment: string) => {
    this.loading.deleteAppUser = true;
    const user = this.getUserDetails(userName);
    try {
      await axiosAgent.AdminOperations.deleteApplicationUser(
        userName,
        deleteComment
      );
      runInAction(async () => {
        this.loading.deleteAppUser = false;
        if (user?.isAccountActive) {
          Promise.all([
            await this.fetchActiveApplicationUsers(),
            await this.fetchDeletedApplicationUsers(),
          ]);
        } else {
          Promise.all([
            await this.fetchDeactivatedApplicationUsers(),
            await this.fetchDeletedApplicationUsers(),
          ]);
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.deleteAppUser = false;
      });
      throw error;
    }
  };

  fetchUserDetails = async (userName: string) => {
    const userDetails = this.getUserDetails(userName);
    if (userDetails) {
      runInAction(() => {
        this.selectedApplicationUser = userDetails;
      });
      return userDetails;
    } else {
      this.loading.userDetails = true;
      try {
        const userDetails = await axiosAgent.AdminOperations.userDetails(
          userName
        );
        runInAction(() => {
          this.loading.userDetails = false;
          this.selectedApplicationUser = userDetails;
        });
      } catch (error) {
        runInAction(() => {
          this.loading.userDetails = false;
        });
        throw error;
      }
    }
  };

  updateApplicationUser = async (
    userName: string,
    applicationUser: ApplicationUser
  ) => {
    this.loading.updateUser = true;
    try {
      await axiosAgent.AdminOperations.updateApplicationUser(
        userName,
        applicationUser
      );
      runInAction(() => {
        this.loading.updateUser = false;
        if (applicationUser.isAccountActive) {
          this.fetchActiveApplicationUsers();
        } else {
          this.fetchDeactivatedApplicationUsers();
        }
        if (this.selectedApplicationUser?.userName === userName) {
          this.selectedApplicationUser = { ...applicationUser };
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading.updateUser = false;
      });
      throw error;
    }
  };

  changeActivationStatus = async (userName: string) => {
    this.loading.changeActivationStatus = true;
    try {
      await axiosAgent.AdminOperations.changeActivationStatus(userName);
      runInAction(async () => {
        this.loading.changeActivationStatus = false;
        Promise.all([
          await this.fetchActiveApplicationUsers(),
          await this.fetchDeactivatedApplicationUsers(),
        ]);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.changeActivationStatus = false;
      });
      throw error;
    }
  };
}
