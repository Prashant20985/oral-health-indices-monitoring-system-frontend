import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  ApplicationUser,
  ApplicationUserFormValues,
  PaginatedApplicationUserList,
} from "../models/ApplicationUser";
import axiosAgent from "../api/axiosAgent";
import { LogResponse } from "../models/Logs";

export default class AdminStore {
  selectedApplicationUser: ApplicationUser | undefined;
  activeApplicationUsers: PaginatedApplicationUserList = {
    users: [],
    totalUsersCount: 0,
  };
  deactivatedApplicationUsers: PaginatedApplicationUserList = {
    users: [],
    totalUsersCount: 0,
  };
  deletedApplicationUsers: PaginatedApplicationUserList = {
    users: [],
    totalUsersCount: 0,
  };
  csvAddResponse: string = "";
  logResponse: LogResponse = { logs: [], totalCount: 0 };

  activeApplicationUsersSearchParams: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  } = {
    searchTerm: "",
    userType: "",
    role: "",
    pageNumber: 0,
    pageSize: 20,
  };

  deactivatedApplicationUsersSearchParams: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  } = {
    searchTerm: "",
    userType: "",
    role: "",
    pageNumber: 0,
    pageSize: 20,
  };

  deletedApplicationUsersSearchParams: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  } = {
    searchTerm: "",
    userType: "",
    role: "",
    pageNumber: 0,
    pageSize: 20,
  };

  logsSearchParams: {
    startDate: Date;
    endDate: Date;
    userName: string;
    level: string;
    pageNumber: number;
    pageSize: number;
  } = {
    startDate: new Date(),
    endDate: new Date(),
    userName: "",
    level: "",
    pageNumber: 1,
    pageSize: 50,
  };

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
    logs: false,
  };

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({
        searchTerm: this.activeApplicationUsersSearchParams.searchTerm,
        userType: this.activeApplicationUsersSearchParams.userType,
        role: this.activeApplicationUsersSearchParams.role,
        page: this.activeApplicationUsersSearchParams.pageNumber,
        pageSize: this.activeApplicationUsersSearchParams.pageSize,
      }),
      () => {
        this.fetchActiveApplicationUsers();
      }
    );

    reaction(
      () => ({
        searchTerm: this.deactivatedApplicationUsersSearchParams.searchTerm,
        userType: this.deactivatedApplicationUsersSearchParams.userType,
        role: this.deactivatedApplicationUsersSearchParams.role,
        page: this.deactivatedApplicationUsersSearchParams.pageNumber,
        pageSize: this.deactivatedApplicationUsersSearchParams.pageSize,
      }),
      () => {
        this.fetchDeactivatedApplicationUsers();
      }
    );

    reaction(
      () => ({
        searchTerm: this.deletedApplicationUsersSearchParams.searchTerm,
        userType: this.deletedApplicationUsersSearchParams.userType,
        role: this.deletedApplicationUsersSearchParams.role,
        page: this.deletedApplicationUsersSearchParams.pageNumber,
        pageSize: this.deletedApplicationUsersSearchParams.pageSize,
      }),
      () => {
        this.fetchDeletedApplicationUsers();
      }
    );

    reaction(
      () => ({
        startDate: this.logsSearchParams.startDate,
        endDate: this.logsSearchParams.endDate,
        userName: this.logsSearchParams.userName,
        level: this.logsSearchParams.level,
        pageNumber: this.logsSearchParams.pageNumber,
        pageSize: this.logsSearchParams.pageSize,
      }),
      () => {
        this.loadLogs();
      }
    );
  }

  setActiveApplicationUserSearchParam = (searchParam: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    this.activeApplicationUsersSearchParams = searchParam;
  };

  setDeactivatedApplicationUserSearchParam = (searchParam: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    this.deactivatedApplicationUsersSearchParams = searchParam;
  };

  setDeletedApplicationUserSearchParam = (searchParam: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    this.deletedApplicationUsersSearchParams = searchParam;
  };

  setCsvAddResponse = (response: string) => {
    this.csvAddResponse = response;
  };

  setActiveApplicationUsers = (applicationUsers: PaginatedApplicationUserList) => {
    this.activeApplicationUsers = applicationUsers;
  };

  setDeactivatedApplicationUsers = (applicationUsers: PaginatedApplicationUserList) => {
    this.deactivatedApplicationUsers = applicationUsers;
  };

  setDeletedApplicationUsers = (applicationUsers: PaginatedApplicationUserList) => {
    this.deletedApplicationUsers = applicationUsers;
  };

  clearSelectedApplicationUser = () => {
    this.selectedApplicationUser = undefined;
  };

  setLogSearchhParamsStartDate = (date: Date) => {
    this.logsSearchParams.startDate = date;
  };

  setLogSearchParamsEndDate = (date: Date) => {
    this.logsSearchParams.endDate = date;
  };

  setLogSearchParamsUserName = (userName: string) => {
    this.logsSearchParams.userName = userName;
  };

  setLogSearchParamsLevel = (level: string) => {
    this.logsSearchParams.level = level;
  };

  setLogSearchParamsPageNumber = (pageNumber: number) => {
    this.logsSearchParams.pageNumber = pageNumber;
  };

  setLogSearchParamsPageSize = (pageSize: number) => {
    this.logsSearchParams.pageSize = pageSize;
  };

  clearActiveApplicationUsersFilters = () => {
    this.setActiveApplicationUserSearchParam({
      searchTerm: "",
      userType: "",
      role: "",
      pageNumber: 0,
      pageSize: 20,
    });
  };

  clearDeactivatedApplicationUsersFilters = () => {
    this.setDeactivatedApplicationUserSearchParam({
      searchTerm: "",
      userType: "",
      role: "",
      pageNumber: 0,
      pageSize: 20,
    });
  };

  clearDeletedApplicationUsersFilters = () => {
    this.setDeletedApplicationUserSearchParam({
      searchTerm: "",
      userType: "",
      role: "",
      pageNumber: 0,
      pageSize: 20,
    });
  };

  get activeApplicationUsersAxiosParams() {
    const params = new URLSearchParams();
    params.append(
      "searchTerm",
      this.activeApplicationUsersSearchParams.searchTerm
    );
    params.append("userType", this.activeApplicationUsersSearchParams.userType);
    params.append("role", this.activeApplicationUsersSearchParams.role);
    params.append(
      "page",
      this.activeApplicationUsersSearchParams.pageNumber.toString()
    );
    params.append(
      "pageSize",
      this.activeApplicationUsersSearchParams.pageSize.toString()
    );
    return params;
  }

  get deactivatedApplicationUsersAxiosParams() {
    const params = new URLSearchParams();
    params.append(
      "searchTerm",
      this.deactivatedApplicationUsersSearchParams.searchTerm
    );
    params.append(
      "userType",
      this.deactivatedApplicationUsersSearchParams.userType
    );
    params.append("role", this.deactivatedApplicationUsersSearchParams.role);
    params.append(
      "page",
      this.deactivatedApplicationUsersSearchParams.pageNumber.toString()
    );
    params.append(
      "pageSize",
      this.deactivatedApplicationUsersSearchParams.pageSize.toString()
    );
    return params;
  }

  get deletedApplicationUsersAxiosParams() {
    const params = new URLSearchParams();
    params.append(
      "searchTerm",
      this.deletedApplicationUsersSearchParams.searchTerm
    );
    params.append(
      "userType",
      this.deletedApplicationUsersSearchParams.userType
    );
    params.append("role", this.deletedApplicationUsersSearchParams.role);
    params.append(
      "page",
      this.deletedApplicationUsersSearchParams.pageNumber.toString()
    );
    params.append(
      "pageSize",
      this.deletedApplicationUsersSearchParams.pageSize.toString()
    );
    return params;
  }

  get logsAxiosParams() {
    const params = new URLSearchParams();
    params.append("startDate", this.logsSearchParams.startDate.toISOString());
    params.append("endDate", this.logsSearchParams.endDate.toISOString());
    params.append("userName", this.logsSearchParams.userName);
    params.append("level", this.logsSearchParams.level);
    params.append("pageNumber", this.logsSearchParams.pageNumber.toString());
    params.append("pageSize", this.logsSearchParams.pageSize.toString());
    return params;
  }

  private getUserDetails = (userName: string) => {
    return this.activeApplicationUsers.users
      .concat(
        this.deletedApplicationUsers.users,
        this.deactivatedApplicationUsers.users
      )
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

  loadLogs = async () => {
    this.loading.logs = true;
    try {
      const response = await axiosAgent.AdminOperations.logs(
        this.logsAxiosParams
      );
      runInAction(() => {
        this.loading.logs = false;
        this.logResponse = response;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.logs = false;
      });
      throw error;
    }
  };
}
