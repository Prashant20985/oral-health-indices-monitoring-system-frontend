import { makeAutoObservable, reaction, runInAction } from "mobx";
import { RequestStatus, UserRequest } from "../models/UserRequest";
import axiosAgent from "../api/axiosAgent";

export default class UserRequestStore {
  userRequestsForAdmin: UserRequest[] = [];
  userRequestsForCurrentUser: UserRequest[] = [];

  requestStatusForAdmin: RequestStatus = "Submitted";
  dateSubmittedForAdmin = new Date();

  requestStatusForCurrentUser: RequestStatus = "Submitted";
  dateSubmittedForCurrentUser = new Date();

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

    reaction(
      () => ({
        dateSubmitted: this.dateSubmittedForAdmin,
        requestStatus: this.requestStatusForAdmin,
      }),
      () => {
        this.setUserRequestsForAdmin([]);
        this.fetchUserRequestsForAdmin();
      }
    );

    reaction(
      () => ({
        dateSubmitted: this.dateSubmittedForCurrentUser,
        requestStatus: this.requestStatusForCurrentUser,
      }),
      () => {
        this.setUserRequestsForCurrentUser([]);
        this.fetchUserRequestsForCurrentUser();
      }
    );
  }

  private setUserRequestsForAdmin(requests: UserRequest[]) {
    this.userRequestsForAdmin = requests;
  }

  setRequestStatusForAdmin(status: RequestStatus) {
    this.requestStatusForAdmin = status;
  }

  setDateSubmittedForAdmin = (date: Date) => {
    this.dateSubmittedForAdmin = date;
  };

  private setUserRequestsForCurrentUser(requests: UserRequest[]) {
    this.userRequestsForCurrentUser = requests;
  }

  setRequestStatusForCurrentUser(status: RequestStatus) {
    this.requestStatusForCurrentUser = status;
  }

  setDateSubmittedForCurrentUser = (date: Date) => {
    this.dateSubmittedForCurrentUser = date;
  };

  get userRequestsForAdminParams() {
    const params = new URLSearchParams();
    params.append("requestStatus", this.requestStatusForAdmin);
    params.append("dateSubmitted", this.dateSubmittedForAdmin.toISOString());
    return params;
  }

  get userRequestsForCurrentUserParams() {
    const params = new URLSearchParams();
    params.append("requestStatus", this.requestStatusForCurrentUser);
    params.append(
      "dateSubmitted",
      this.dateSubmittedForCurrentUser.toISOString()
    );
    return params;
  }

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
