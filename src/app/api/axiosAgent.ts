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
  Supervisor,
} from "../models/ApplicationUser";
import { router } from "../router/Routes";
import { StudentGroup, Student, GroupWithExams } from "../models/Group";
import { UserRequest } from "../models/UserRequest";
import {
  ResearchGroup,
  ResearchGroupFormValues,
  ResearchGroupPatient,
} from "../models/ResearchGroup";
import { CreateUpdatePatientFormValues, Patient } from "../models/Patient";
import {
  Exam,
  ExamSolution,
  ExamSolutionFormValues,
  PublishExam,
  UpdateExam,
} from "../models/StudentExam";
import {
  APIUpdateResponse,
  BleedingUpdateResponse,
  DMFT_DMFSUpdateResponse,
  PatientExaminationCard,
  PatientExaminationCardByDoctorFormValues,
  PatientExaminationCardByStudentFormValues,
} from "../models/PatientExaminationCard";
import { RiskFactorAssessmentModel } from "../models/RiskFactorAssesment";
import { UpdateDMFT_DMFSFormValues } from "../models/DMFT_DMFS";
import { APIBleedingAssessmentModel } from "../models/APIBleeding";
import { BeweAssessmentModel } from "../models/Bewe";
import { Summary } from "../models/Summary";
import { LogResponse } from "../models/Logs";

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

  logs: (params: URLSearchParams) =>
    axios.get<LogResponse>("/log/filtered-logs", { params }).then(responseBody),
};

const DentistTeacherOperations = {
  createStudentGroup: (groupName: string) =>
    apiRequests.post<void>(
      `/dentistTeacher/create-group?groupName=${groupName}`,
      {}
    ),

  addStudentToStudentGroup: (groupId: string, studentId: string) =>
    apiRequests.post<void>(
      `/dentistTeacher/add-student/${groupId}?studentId=${studentId}`,
      {}
    ),

  removeStudentFromStudentGroup: (groupId: string, studentId: string) =>
    apiRequests.del<void>(
      `/dentistTeacher/remove-student/${groupId}?studentId=${studentId}`
    ),

  deleteStudentGroup: (groupId: string) =>
    apiRequests.del<void>(`/dentistTeacher/delete-group/${groupId}`),

  updateStudentGroupName: (groupId: string, groupName: string) =>
    apiRequests.put<void>(
      `/dentistTeacher/update-groupname/${groupId}?groupName=${groupName}`,
      {}
    ),

  getStudentsNotInStudentGroup: (groupId: string) =>
    apiRequests.get<Student[]>(
      `/dentistTeacher/get-studentsNotInGroup/${groupId}`
    ),

  getStudentGroups: () =>
    apiRequests.get<StudentGroup[]>(`/dentistTeacher/groups`),

  getStudentGroup: (groupId: string) =>
    apiRequests.get<StudentGroup>(`/dentistTeacher/group-details/${groupId}`),

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

  superviseStudent: (studentId: string) =>
    apiRequests.post<void>(
      `/dentistTeacher/supervise-student/${studentId}`,
      {}
    ),

  unsuperviseStudent: (studentId: string) =>
    apiRequests.del<void>(`/dentistTeacher/unsupervise-student/${studentId}`),

  getSupervisedStudents: () =>
    apiRequests.get<Student[]>(`/dentistTeacher/students-supervised`),

  getUnsupervisedStudents: () =>
    apiRequests.get<Student[]>(`/dentistTeacher/students-not-supervised`),
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
    apiRequests.put<void>(`/patient/update-patient/${patientId}`, values),

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

  getPatientDetails: (patientId: string) =>
    apiRequests.get<Patient>(`/patient/patient-details/${patientId}`),
};

const StudentExamOperations = {
  publishExam: (values: PublishExam) =>
    apiRequests.post<Exam>("/StudentExam/publish-exam", values),

  deleteExam: (examId: string) =>
    apiRequests.del<void>(`/StudentExam/delete-exam/${examId}`),

  updateExam: (examId: string, values: UpdateExam) =>
    apiRequests.put<Exam>(`/StudentExam/update-exam/${examId}`, values),

  commentPracticePatientExaminationCard: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/StudentExam/comment-card/${cardId}?comment=${comment}`,
      {}
    ),

  commentAPIForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/StudentExam/comment-api-form/${cardId}?comment=${comment}`,
      {}
    ),

  commentBleedingForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/StudentExam/comment-bleeding-form/${cardId}?comment=${comment}`,
      {}
    ),

  commentBeweForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/StudentExam/comment-beweForm/${cardId}?comment=${comment}`,
      {}
    ),

  commentDMFT_DMFSForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/StudentExam/comment-dmft_dmfsForm/${cardId}?comment=${comment}`,
      {}
    ),

  markExamAsGraded: (examId: string) =>
    apiRequests.put<void>(`/StudentExam/markAsGraded/${examId}`, {}),

  gradeExaminationCard: (cardId: string, mark: number) =>
    apiRequests.put<void>(
      `/StudentExam/gradeExaminationCard/${cardId}?studentMark=${mark}`,
      {}
    ),

  getExams: (groupId: string) =>
    apiRequests.get<Exam[]>(`/StudentExam/exams/${groupId}`),

  getExamDetails: (examId: string) =>
    apiRequests.get<Exam>(`/StudentExam/exam-details/${examId}`),

  getExamCards: (examId: string) =>
    apiRequests.get<ExamSolution[]>(`/StudentExam/exam-cards/${examId}`),

  getExamCard: (cardId: string) =>
    apiRequests.get<ExamSolution>(`/StudentExam/exam-card-details/${cardId}`),

  submitExamSolution: (examId: string, values: ExamSolutionFormValues) =>
    apiRequests.post<void>(`/StudentExam/exam-solution/${examId}`, values),

  getExamSolution: (examId: string) =>
    apiRequests.get<ExamSolution>(`/StudentExam/exam-solution/${examId}`),

  checkExamEligibility: (examId: string) =>
    apiRequests.get<boolean>(`/StudentExam/exam-eligibility/${examId}`),
};

const StudentOperations = {
  getStudentGroupsWithExams: () =>
    apiRequests.get<GroupWithExams[]>("/student/student-groups"),

  getStudentGroupDetailsWithExams: (groupId: string) =>
    apiRequests.get<GroupWithExams>(
      `/student/student-group-details/${groupId}`
    ),

  getSupervisors: () => apiRequests.get<Supervisor[]>("student/supervisors"),
};

const PatientExamintionCardOperations = {
  commentPatientExaminationCard: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/comment-patient-examination-card/${cardId}?comment=${comment}`,
      {}
    ),

  commentAPIForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/comment-api-form/${cardId}?comment=${comment}`,
      {}
    ),

  commentBleedingForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/comment-bleeding-form/${cardId}?comment=${comment}`,
      {}
    ),

  commentBeweForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/comment-bewe-form/${cardId}?comment=${comment}`,
      {}
    ),

  commentDMFT_DMFSForm: (cardId: string, comment: string) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/comment-dmft-dmfs-form/${cardId}?comment=${comment}`,
      {}
    ),

  updateAPIForm: (cardId: string, values: APIBleedingAssessmentModel) =>
    apiRequests.put<APIUpdateResponse>(
      `/PatientExaminationCard/update-api-form/${cardId}`,
      values
    ),

  updateBleedingForm: (cardId: string, values: APIBleedingAssessmentModel) =>
    apiRequests.put<BleedingUpdateResponse>(
      `/PatientExaminationCard/update-bleeding-form/${cardId}`,
      values
    ),

  updateBeweForm: (cardId: string, values: BeweAssessmentModel) =>
    apiRequests.put<number>(
      `/PatientExaminationCard/update-bewe-form/${cardId}`,
      values
    ),

  updateDMFT_DMFSForm: (cardId: string, values: UpdateDMFT_DMFSFormValues) =>
    apiRequests.put<DMFT_DMFSUpdateResponse>(
      `/PatientExaminationCard/update-dmft-dmfs-form/${cardId}`,
      values
    ),

  updateRiskFactorAssessment: (
    cardId: string,
    values: RiskFactorAssessmentModel
  ) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/update-risk-factor-assessment/${cardId}`,
      values
    ),

  createPatientExaminationCardByDoctor: (
    patientId: string,
    values: PatientExaminationCardByDoctorFormValues
  ) =>
    apiRequests.post<PatientExaminationCard>(
      `/PatientExaminationCard/create-patient-examination-card-by-doctor/${patientId}`,
      values
    ),

  createPatientExaminationCardByStudent: (
    patientId: string,
    values: PatientExaminationCardByStudentFormValues
  ) =>
    apiRequests.post<PatientExaminationCard>(
      `/PatientExaminationCard/create-patient-examination-card-by-student/${patientId}`,
      values
    ),

  deletePatientExaminationCard: (cardId: string) =>
    apiRequests.del<void>(
      `/PatientExaminationCard/delete-patient-examination-card/${cardId}`
    ),

  gradePatientExaminationCard: (cardId: string, score: number) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/grade-patient-examination-card/${cardId}?totalScore=${score}`,
      {}
    ),

  getPatientExaminationCardDetails: (cardId: string) =>
    apiRequests.get<PatientExaminationCard>(
      `/PatientExaminationCard/patient-examination-card/${cardId}`
    ),

  getPatientExaminationCards: (patientId: string) =>
    apiRequests.get<PatientExaminationCard[]>(
      `/PatientExaminationCard/patient-examination-cards/${patientId}`
    ),

  getPatientExaminationCardsAssignedToDoctor: (params: URLSearchParams) =>
    axios
      .get<PatientExaminationCard[]>(
        "/PatientExaminationCard/patient-examination-cards-assigned-to-doctor",
        { params }
      )
      .then(responseBody),

  updatePatientExaminationCardSummary: (cardId: string, summary: Summary) =>
    apiRequests.put<void>(
      `/PatientExaminationCard/update-patient-examination-card-summary/${cardId}`,
      summary
    ),
};

const ExportOperations = {
  exportExamSolution: async (examSolution: ExamSolution): Promise<void> => {
    try {
      const response = await axios({
        url: "export/export-exam-solution",
        method: "POST",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
        data: examSolution,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${examSolution.studentName}_ExamSolution.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel file", error);
    }
  },

  exportExamaminationCard: async (
    examinationCard: PatientExaminationCard
  ): Promise<void> => {
    try {
      const response = await axios({
        url: "export/export-examination-card",
        method: "POST",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
        data: examinationCard,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${examinationCard.patientName}_${new Date(
          examinationCard.dateOfExamination
        ).toDateString()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the Excel file", error);
    }
  },
};

const axiosAgent = {
  AccountOperations,
  AdminOperations,
  DentistTeacherOperations,
  UserRequestOperations,
  PatientOperations,
  StudentExamOperations,
  StudentOperations,
  PatientExamintionCardOperations,
  ExportOperations,
};

export default axiosAgent;
