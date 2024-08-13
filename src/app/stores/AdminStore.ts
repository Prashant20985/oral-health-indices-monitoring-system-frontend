import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  ApplicationUser,
  ApplicationUserFormValues,
  PaginatedApplicationUserList,
} from "../models/ApplicationUser";
import axiosAgent from "../api/axiosAgent";
import { LogResponse } from "../models/Logs";

/**
 * Represents the AdminStore class.
 * This class is responsible for managing the state and operations related to the admin functionality in the application.
 */
export default class AdminStore {
  // The selected application user.
  selectedApplicationUser: ApplicationUser | undefined;

  // The active application users.
  activeApplicationUsers: PaginatedApplicationUserList = {
    users: [],
    totalUsersCount: 0,
  };

  // The deactivated application users.
  deactivatedApplicationUsers: PaginatedApplicationUserList = {
    users: [],
    totalUsersCount: 0,
  };

  // The deleted application users.
  deletedApplicationUsers: PaginatedApplicationUserList = {
    users: [],
    totalUsersCount: 0,
  };
  
  // The response from the CSV add operation.
  csvAddResponse: string = "";
  logResponse: LogResponse = { logs: [], totalCount: 0 };

  // The search parameters for the active application users.
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

  // The search parameters for the deactivated application users.
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

  // The search parameters for the deleted application users.
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

  // The search parameters for the logs.
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

  // The loading state for the admin operations.
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

  // Initializes a new instance of the AdminStore class.
  constructor() {
    makeAutoObservable(this);

    // The reaction to the changes in the search parameters for the active application users.
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

    // The reaction to the changes in the search parameters for the deactivated application users.
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

    // The reaction to the changes in the search parameters for the deleted application users.
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

    // The reaction to the changes in the search parameters for the logs.
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

  // Sets the search parameters for the active application users.
  setActiveApplicationUserSearchParam = (searchParam: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    this.activeApplicationUsersSearchParams = searchParam;
  };

  // Sets the search parameters for the deactivated application users.
  setDeactivatedApplicationUserSearchParam = (searchParam: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    this.deactivatedApplicationUsersSearchParams = searchParam;
  };

  // Sets the search parameters for the deleted application users.
  setDeletedApplicationUserSearchParam = (searchParam: {
    searchTerm: string;
    userType: string;
    role: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    this.deletedApplicationUsersSearchParams = searchParam;
  };

  // Sets the response from the CSV add operation.
  setCsvAddResponse = (response: string) => {
    this.csvAddResponse = response;
  };

  // Sets the selected application user.
  setActiveApplicationUsers = (applicationUsers: PaginatedApplicationUserList) => {
    this.activeApplicationUsers = applicationUsers;
  };

  // Sets the deactivated application users.
  setDeactivatedApplicationUsers = (applicationUsers: PaginatedApplicationUserList) => {
    this.deactivatedApplicationUsers = applicationUsers;
  };

  // Sets the deleted application users.
  setDeletedApplicationUsers = (applicationUsers: PaginatedApplicationUserList) => {
    this.deletedApplicationUsers = applicationUsers;
  };

  // Clears the selected application user.
  clearSelectedApplicationUser = () => {
    this.selectedApplicationUser = undefined;
  };

  // Sets the search parameters for the logs start date.
  setLogSearchhParamsStartDate = (date: Date) => {
    this.logsSearchParams.startDate = date;
  };

  // Sets the search parameters for the logs end date.
  setLogSearchParamsEndDate = (date: Date) => {
    this.logsSearchParams.endDate = date;
  };

  // Sets the search parameters for the logs user name.
  setLogSearchParamsUserName = (userName: string) => {
    this.logsSearchParams.userName = userName;
  };

  // Sets the search parameters for the logs level.
  setLogSearchParamsLevel = (level: string) => {
    this.logsSearchParams.level = level;
  };

  // Sets the search parameters for the logs page number.
  setLogSearchParamsPageNumber = (pageNumber: number) => {
    this.logsSearchParams.pageNumber = pageNumber;
  };

  // Sets the search parameters for the logs page size.
  setLogSearchParamsPageSize = (pageSize: number) => {
    this.logsSearchParams.pageSize = pageSize;
  };

  // Clears the search parameters for active application users.
  clearActiveApplicationUsersFilters = () => {
    this.setActiveApplicationUserSearchParam({
      searchTerm: "",
      userType: "",
      role: "",
      pageNumber: 0,
      pageSize: 20,
    });
  };

  // Clears the search parameters for deactivated application users.
  clearDeactivatedApplicationUsersFilters = () => {
    this.setDeactivatedApplicationUserSearchParam({
      searchTerm: "",
      userType: "",
      role: "",
      pageNumber: 0,
      pageSize: 20,
    });
  };

  // Clears the search parameters for deleted application users.
  clearDeletedApplicationUsersFilters = () => {
    this.setDeletedApplicationUserSearchParam({
      searchTerm: "",
      userType: "",
      role: "",
      pageNumber: 0,
      pageSize: 20,
    });
  };

  // Gets the URL parameters for the active application users.
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

  // Gets the URL parameters for the deactivated application users.
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

  // Gets the URL parameters for the deleted application users.
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

  // Gets the URL parameters for the logs.
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

  // Gets the user details.
  private getUserDetails = (userName: string) => {
    return this.activeApplicationUsers.users
      .concat(
        this.deletedApplicationUsers.users,
        this.deactivatedApplicationUsers.users
      )
      .find((user) => user.userName === userName);
  };

  /**
   * Fetches the list of active application users.
   * 
   * @returns {Promise<void>} A promise that resolves when the list of active application users is fetched.
   * @throws {Error} If an error occurs while fetching the list of active application users.
   */
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

  /**
   * Fetches the list of deactivated application users.
   * 
   * @returns {Promise<void>} A promise that resolves when the list of deactivated application users is fetched.
   * @throws {Error} If an error occurs while fetching the list of deactivated application users.
   */
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

  /**
   * Fetches the list of deleted application users.
   * 
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} If an error occurs during the operation.
   */
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

  /**
   * Adds an application user.
   * 
   * @param values - The values of the application user form.
   * @returns A promise that resolves when the application user is added successfully.
   * @throws An error if there is an issue adding the application user.
   */
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

  /**
   * Adds application users from a CSV file.
   * 
   * @param file - The CSV file containing the application users to be added.
   * @returns A Promise that resolves when the operation is complete.
   * @throws If an error occurs during the operation.
   */
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

  /**
   * Deletes an application user.
   *
   * @param userName - The username of the user to be deleted.
   * @param deleteComment - The comment explaining the reason for deletion.
   * @throws {Error} - If an error occurs during the deletion process.
   */
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

  /**
   * Fetches user details for the given user name.
   * 
   * @param userName - The user name for which to fetch the details.
   * @returns The user details for the given user name.
   * @throws If an error occurs while fetching the user details.
   */
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

  /**
   * Updates an application user.
   *
   * @param userName - The username of the user to update.
   * @param applicationUser - The updated application user object.
   * @returns A promise that resolves when the user is successfully updated.
   * @throws If an error occurs during the update process.
   */
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

  /**
   * Changes the activation status of a user.
   * 
   * @param userName - The username of the user whose activation status will be changed.
   * @returns A promise that resolves when the activation status is successfully changed.
   * @throws An error if there is an issue changing the activation status.
   */
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

  /**
   * Loads logs from the server.
   * @returns {Promise<void>} A promise that resolves when the logs are loaded.
   * @throws {Error} If an error occurs while loading the logs.
   */
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
