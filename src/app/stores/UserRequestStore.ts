import { makeAutoObservable, reaction, runInAction } from "mobx";
import { RequestStatus, UserRequest } from "../models/UserRequest";
import axiosAgent from "../api/axiosAgent";

/**
 * Represents a store for managing user requests.
 */
export default class UserRequestStore {
  // Represents the userRequestsForAdmin property.
  userRequestsForAdmin: UserRequest[] = [];

  // Represents the userRequestsForCurrentUser property
  userRequestsForCurrentUser: UserRequest[] = [];

  // Represents the requestStatusForAdmin property.
  requestStatusForAdmin: RequestStatus = "Submitted";

  // Represents the dateSubmittedForAdmin property.
  dateSubmittedForAdmin: Date | null = null;

  // Represents the requestStatusForCurrentUser property
  requestStatusForCurrentUser: RequestStatus = "Submitted";

  // Represents the dateSubmittedForCurrentUser property.
  dateSubmittedForCurrentUser: Date | null = null;

  // Represents the loading state of various operations.
  loading = {
    createRequest: false,
    userRequestsForAdmin: false,
    userRequestsForCurrentUser: false,
    deleteUserRequest: false,
    updateUserRequest: false,
    updateUserRequestToInProgress: false,
    updateUserRequestToCompleted: false,
  };

  constructor() {
    makeAutoObservable(this);

    // Reaction to the dateSubmittedForAdmin and requestStatusForAdmin properties.
    reaction(
      () => ({
        dateSubmitted: this.dateSubmittedForAdmin,
        requestStatus: this.requestStatusForAdmin,
      }),
      () => {
        this.fetchUserRequestsForAdmin();
      }
    );

    // Reaction to the dateSubmittedForCurrentUser and requestStatusForCurrentUser properties.
    reaction(
      () => ({
        dateSubmitted: this.dateSubmittedForCurrentUser,
        requestStatus: this.requestStatusForCurrentUser,
      }),
      () => {
        this.fetchUserRequestsForCurrentUser();
      }
    );
  }

  // Sets the userRequestsForAdmin property.
  private setUserRequestsForAdmin(requests: UserRequest[]) {
    this.userRequestsForAdmin = requests;
  }

  // Sets the requestStatusForAdmin property.
  setRequestStatusForAdmin(status: RequestStatus) {
    this.requestStatusForAdmin = status;
  }

  // Sets the dateSubmittedForAdmin property.
  setDateSubmittedForAdmin = (date: Date | null) => {
    this.dateSubmittedForAdmin = date;
  };

  // Sets the userRequestsForCurrentUser property.
  private setUserRequestsForCurrentUser(requests: UserRequest[]) {
    this.userRequestsForCurrentUser = requests;
  }

  // Sets the requestStatusForCurrentUser property.
  setRequestStatusForCurrentUser(status: RequestStatus) {
    this.requestStatusForCurrentUser = status;
  }

  // Sets the dateSubmittedForCurrentUser property.
  setDateSubmittedForCurrentUser = (date: Date | null) => {
    this.dateSubmittedForCurrentUser = date;
  };

  // Gets the URLSearchParams object for the userRequestsForAdmin operation.
  get userRequestsForAdminParams() {
    const params = new URLSearchParams();
    params.append("requestStatus", this.requestStatusForAdmin);
    if (this.dateSubmittedForAdmin) {
      params.append("dateSubmitted", this.dateSubmittedForAdmin.toISOString());
    }
    return params;
  }

  // Gets the URLSearchParams object for the userRequestsForCurrentUser operation.
  get userRequestsForCurrentUserParams() {
    const params = new URLSearchParams();
    params.append("requestStatus", this.requestStatusForCurrentUser);
    if (this.dateSubmittedForCurrentUser) {
      params.append(
        "dateSubmitted",
        this.dateSubmittedForCurrentUser.toISOString()
      );
    }
    return params;
  }

  /**
   * Creates a user request with the given title and description.
   * 
   * @param requestTitle - The title of the user request.
   * @param description - The description of the user request.
   */
  createRequest = async (requestTitle: string, description: string) => {
    this.loading.createRequest = true;
    try {
      await axiosAgent.UserRequestOperations.createUserRequest(
        requestTitle,
        description
      );
      runInAction(() => {
        this.loading.createRequest = false;
        this.fetchUserRequestsForCurrentUser();
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.createRequest = false));
    }
  };

  /**
   * Fetches user requests for admin.
   * 
   * @returns {Promise<void>} A promise that resolves when the user requests are fetched.
   */
  fetchUserRequestsForAdmin = async () => {
    this.loading.userRequestsForAdmin = false;
    try {
      const result =
        await axiosAgent.UserRequestOperations.userRequestListForAdmin(
          this.userRequestsForAdminParams
        );
      runInAction(() => {
        this.setUserRequestsForAdmin(result.data);
        this.loading.userRequestsForAdmin = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.userRequestsForAdmin = false;
      });
    }
  };

  /**
   * Fetches user requests for the current user.
   * @returns {Promise<void>} A promise that resolves when the user requests are fetched.
   */
  fetchUserRequestsForCurrentUser = async () => {
    this.loading.userRequestsForCurrentUser = false;
    try {
      const result =
        await axiosAgent.UserRequestOperations.userRequestListForCurrentUser(
          this.userRequestsForCurrentUserParams
        );
      runInAction(() => {
        this.setUserRequestsForCurrentUser(result.data);
        this.loading.userRequestsForCurrentUser = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.userRequestsForCurrentUser = false;
      });
    }
  };

  /**
   * Deletes a user request.
   *
   * @param userRequestId - The ID of the user request to delete.
   * @returns A Promise that resolves when the user request is successfully deleted.
   * @throws An error if the deletion fails.
   */
  deleteUserRequest = async (userRequestId: string) => {
    this.loading.deleteUserRequest = true;
    try {
      await axiosAgent.UserRequestOperations.deleteRequest(userRequestId);
      runInAction(() => {
        const updatedRequestList = this.userRequestsForCurrentUser.filter(
          (request) => request.id !== userRequestId
        );
        this.setUserRequestsForCurrentUser(updatedRequestList);
        this.loading.deleteUserRequest = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.deleteUserRequest = false;
      });
    }
  };

  /**
   * Updates a user request with the specified ID.
   * 
   * @param userRequestId - The ID of the user request to update.
   * @param requestTitle - The new title for the user request.
   * @param description - The new description for the user request.
   * @returns A Promise that resolves when the user request is successfully updated.
   * @throws An error if the update operation fails.
   */
  updateUserRequest = async (
    userRequestId: string,
    requestTitle: string,
    description: string
  ) => {
    this.loading.updateUserRequest = false;
    try {
      await axiosAgent.UserRequestOperations.updateUserRequest(
        userRequestId,
        requestTitle,
        description
      );

      runInAction(() => {
        const userRequestIndex = this.userRequestsForCurrentUser.findIndex(
          (request) => request.id === userRequestId
        );

        if (userRequestIndex !== -1) {
          const updatedRequest = {
            ...this.userRequestsForCurrentUser[userRequestIndex],
          };
          updatedRequest.requestTitle = requestTitle;
          updatedRequest.description = description;
          const requests = [...this.userRequestsForCurrentUser];
          requests[userRequestIndex] = updatedRequest;
          this.setUserRequestsForCurrentUser(requests);
        }

        this.loading.updateUserRequest = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.updateUserRequest = false));
    }
  };

  /**
   * Updates the user request to "In Progress" status.
   * 
   * @param userRequestId - The ID of the user request to update.
   * @returns A Promise that resolves when the user request is successfully updated.
   * @throws An error if the update operation fails.
   */
  updateUserRequestToInProgress = async (userRequestId: string) => {
    this.loading.updateUserRequestToInProgress = false;
    try {
      await axiosAgent.UserRequestOperations.updateUserRequestToInProgress(
        userRequestId
      );
      runInAction(() => {
        const userRequestIndex = this.userRequestsForAdmin.findIndex(
          (request) => request.id === userRequestId
        );

        if (userRequestIndex !== -1) {
          const updatedRequest = {
            ...this.userRequestsForAdmin[userRequestIndex],
          };
          updatedRequest.requestStatus = "In_Progress";
          const requests = [...this.userRequestsForAdmin];
          requests[userRequestIndex] = updatedRequest;
          this.setUserRequestsForAdmin(requests);
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.updateUserRequestToInProgress = false));
    }
  };

  /**
   * Updates a user request to completed status.
   * 
   * @param userRequestId - The ID of the user request to update.
   * @param adminComment - The admin comment to associate with the completed request.
   * @returns A promise that resolves when the update is successful.
   * @throws An error if the update fails.
   */
  updateUserRequestToCompleted = async (
    userRequestId: string,
    adminComment: string
  ) => {
    this.loading.updateUserRequestToInProgress = false;
    try {
      await axiosAgent.UserRequestOperations.updateUserRequestToCompleted(
        userRequestId,
        adminComment
      );
      runInAction(() => {
        const userRequestIndex = this.userRequestsForAdmin.findIndex(
          (request) => request.id === userRequestId
        );

        if (userRequestIndex !== -1) {
          const updatedRequest = {
            ...this.userRequestsForAdmin[userRequestIndex],
          };
          updatedRequest.requestStatus = "Completed";
          updatedRequest.adminComment = adminComment;
          updatedRequest.dateCompleted = new Date();
          const requests = [...this.userRequestsForAdmin];
          requests[userRequestIndex] = updatedRequest;
          this.setUserRequestsForAdmin(requests);
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.updateUserRequestToInProgress = false));
    }
  };
}
