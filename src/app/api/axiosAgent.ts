import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  UserResposne,
  LoginFormValues,
  ChangePasswordValues,
  ResetPasswordValues,
} from "../models/User";
import { store } from "../stores/Store";
import {
  ApplicationUser,
  ApplicationUserFormValues,
} from "../models/ApplicationUser";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (res) => {
    if (process.env.NODE_ENV === "development") {
      new Promise((resolve) => {
        setTimeout(resolve, 1000); // Delays requests by 1 second in development env.
      });
    }
    return res;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get") toast.warning(data);
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.warning("Forbidden");
        break;
      case 500:
        toast.error("Server Error");
    }
    return Promise.reject(error);
  }
);

const apiRequests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const AccountOperations = {
  currentUser: () => apiRequests.get<UserResposne>("/account/current-user"),

  login: (credentials: LoginFormValues) =>
    apiRequests.post<UserResposne>("/account/login", credentials),

  changePassword: (changePassValues: ChangePasswordValues) =>
    apiRequests.put<void>("/account/change-password", changePassValues),

  forgotPassword: (email: string) =>
    apiRequests.post<void>(`account/reset-password/${email}`, {}),

  resetPassword: (resetPassValues: ResetPasswordValues) =>
    apiRequests.post<void>("account/reset-password", resetPassValues),

  refreshToken: () =>
    apiRequests.post<UserResposne>("/account/refreshToken", {}),
};

const AdminOperations = {
  activeUsersList: (params: URLSearchParams) =>
    axios
      .get<ApplicationUser[]>("/admin/active-users", {
        params,
      })
      .then(responseBody),

  deactivatedUsersList: (params: URLSearchParams) =>
    axios
      .get<ApplicationUser[]>("/admin/deactivated-users", {
        params,
      })
      .then(responseBody),

  deletedUsersList: (params: URLSearchParams) =>
    axios
      .get<ApplicationUser[]>("/admin/deleted-users", {
        params,
      })
      .then(responseBody),

  userDetails: (userName: string) =>
    apiRequests.get<ApplicationUser>(`/admin/user-details/${userName}`),

  addApplicationUser: (values: ApplicationUserFormValues) =>
    apiRequests.post<void>("/admin/create-user", values),

  addApplicationUsersFromCsv: (file: File) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<string>("/admin/create-users", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteApplicationUser: (userName: string, deleteComment: string) =>
    apiRequests.del<void>(
      `/admin/delete-user/${userName}?deleteComment=${deleteComment}`
    ),

  updateApplicationUser: (userName: string, values: ApplicationUser) =>
    apiRequests.put<void>(`/admin/update-user/${userName}`, values),

  changeActivationStatus: (userName: string) =>
    apiRequests.put<void>(`/admin/change-activation-status/${userName}`, {}),
};

const axiosAgent = {
  AccountOperations,
  AdminOperations,
};

export default axiosAgent;
