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
import { router } from "../router/Routes";
import { Group, Student } from "../models/Group";
import { UserRequest } from "../models/UserRequest";
import {
  ResearchGroup,
  ResearchGroupFormValues,
  ResearchGroupPatient,
} from "../models/ResearchGroup";
import { CreateUpdatePatientFormValues, Patient } from "../models/Patient";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (res) => {
    return res;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get") toast.warning(data);
        break;
      case 401:
        if (!config.url?.includes("current-user")) {
          toast.error("Unauthorized");
        }
        break;
      case 403:
        toast.warning("Forbidden");
        break;
      case 500:
        router.navigate("/server-error");
    }
    return Promise.reject(error);
  }
);

const apiRequests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
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
    const formData = new FormData();
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

const DentistTeacherOperations = {
  createGroup: (groupName: string) =>
    apiRequests.post<void>(
      `/dentistTeacher/create-group?groupName=${groupName}`,
      {}
    ),

  addStudentToGroup: (groupId: string, studentId: string) =>
    apiRequests.post<void>(
      `/dentistTeacher/add-student/${groupId}?studentId=${studentId}`,
      {}
    ),

  removeStudentFromGroup: (groupId: string, studentId: string) =>
    apiRequests.del<void>(
      `/dentistTeacher/remove-student/${groupId}?studentId=${studentId}`
    ),

  deleteGroup: (groupId: string) =>
    apiRequests.del<void>(`/dentistTeacher/delete-group/${groupId}`),

  updateGroupName: (groupId: string, groupName: string) =>
    apiRequests.put<void>(
      `/dentistTeacher/update-groupname/${groupId}?groupName=${groupName}`,
      {}
    ),

  getStudentsNotInGroup: (groupId: string) =>
    apiRequests.get<Student[]>(
      `/dentistTeacher/get-studentsNotInGroup/${groupId}`
    ),

  getGroups: () => apiRequests.get<Group[]>(`/dentistTeacher/groups`),

  getResearchGroups: (groupName: string) =>
    apiRequests.get<ResearchGroup[]>(
      `/dentistTeacher/research-groups?groupName=${groupName}`
    ),

  getResearchGroup: (researchGroupId: string) =>
    apiRequests.get<ResearchGroup>(
      `/dentistTeacher/research-group/${researchGroupId}`
    ),

  getPatientsNotInResearchGroup: (params: URLSearchParams) =>
    axios
      .get<ResearchGroupPatient[]>(
        `/dentistTeacher/patients-not-in-research-group`,
        { params }
      )
      .then(responseBody),

  createResearchGroup: (values: ResearchGroupFormValues) =>
    apiRequests.post<void>(`/dentistTeacher/create-research-group`, values),

  deleteResearchGroup: (researchGroupId: string) =>
    apiRequests.del<void>(
      `/dentistTeacher/delete-research-group/${researchGroupId}`
    ),

  updateResearchGroup: (
    researchGroupId: string,
    values: ResearchGroupFormValues
  ) =>
    apiRequests.put<void>(
      `/dentistTeacher/update-research-group/${researchGroupId}`,
      values
    ),

  addPatientToResearchGroup: (researchGroupId: string, patientId: string) =>
    apiRequests.post<void>(
      `/dentistTeacher/add-patient/${researchGroupId}?patientId=${patientId}`,
      {}
    ),

  removePatientFromResearchGroup: (patientId: string) =>
    apiRequests.del<void>(`/dentistTeacher/remove-patient/${patientId}`),
};

const UserRequestOperations = {
  userRequestListForAdmin: (params: URLSearchParams) =>
    axios.get<UserRequest[]>(`/userRequest/user-requests`, { params }),

  userRequestListForCurrentUser: (params: URLSearchParams) =>
    axios.get<UserRequest[]>(`/userRequest/requests-by-userid`, { params }),

  createUserRequest: (requestTitle: string, description: string) =>
    apiRequests.post<void>(
      `/userRequest/create-request?requestTitle=${requestTitle}&description=${description}`,
      {}
    ),

  deleteRequest: (userRequestid: string) =>
    apiRequests.del<void>(`/userRequest/delete-request/${userRequestid}`),

  updateUserRequest: (
    userRequestId: string,
    requestTitle: string,
    description: string
  ) =>
    apiRequests.put<void>(
      `/userRequest/update-request/${userRequestId}?title=${requestTitle}&description=${description}`,
      {}
    ),

  updateUserRequestToInProgress: (userRequestId: string) =>
    apiRequests.put<void>(
      `/userRequest/update-to-inProgress/${userRequestId}`,
      {}
    ),

  updateUserRequestToCompleted: (userRequestId: string, adminComment: string) =>
    apiRequests.put<void>(
      `/userRequest/update-to-completed/${userRequestId}?adminComment=${adminComment}`,
      {}
    ),
};

const PatientOperations = {
  createPatient: (values: CreateUpdatePatientFormValues) =>
    apiRequests.post<void>("/patient/create-patient", values),

  updatePatient: (patientId: string, values: CreateUpdatePatientFormValues) =>
    apiRequests.post<void>(`/patient/update-patient/${patientId}`, values),

  archivePatient: (patientId: string, archiveComment: string) =>
    apiRequests.put<void>(
      `/patient/archive-patient/${patientId}?archiveComment=${archiveComment}`,
      {}
    ),

  unarchivePatient: (patientId: string) =>
    apiRequests.put<void>(`/patient/unarchive-patient/${patientId}`, {}),

  deletePatient: (patientId: string) =>
    apiRequests.del<void>(`/patient/delete-patient/${patientId}`),

  getActicePatients: (params: URLSearchParams) =>
    axios
      .get<Patient[]>(`/patient/active-patients`, { params })
      .then(responseBody),

  getArchivedPatients: (params: URLSearchParams) =>
    axios
      .get<Patient[]>(`/patient/archived-patients`, { params })
      .then(responseBody),

  getActivePatientsByDoctorId: (params: URLSearchParams) =>
    axios
      .get<Patient[]>(`/patient/active-patients-by-doctorId`, { params })
      .then(responseBody),

  getArchivedPatientsByDoctorId: (params: URLSearchParams) =>
    axios
      .get<Patient[]>(`/patient/archived-patients-by-doctorId`, { params })
      .then(responseBody),
};

const axiosAgent = {
  AccountOperations,
  AdminOperations,
  DentistTeacherOperations,
  UserRequestOperations,
  PatientOperations,
};

export default axiosAgent;
