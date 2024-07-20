import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import LoginForm from "../../features/AccountOperation/LoginForm";
import ForgotPasswordForm from "../../features/AccountOperation/ForgotPasswordForm";
import ResetPasswordForm from "../../features/AccountOperation/ResetPasswordForm";
import RequireAuthentication from "./RequireAuthentication";
import Dashboard from "../../features/Dashboard/Dashboard";
import ActiveApplicationUsersList from "../../features/AdminOperations/List/ActiveUsers/ActiveApplicationUsersList";
import DeactivatedApplicationUsersList from "../../features/AdminOperations/List/DeactivatedUsers/DeactivatedApplicationUsersList";
import DeletedApplicationUsersList from "../../features/AdminOperations/List/DeletedUsers/DeletedApplicationUsersList";
import ServerError from "../../features/Errors/ServerError";
import Unauthorized from "../../features/Errors/Unauthorized";
import NotFound from "../../features/Errors/NotFound";
import StudentGroupList from "../../features/DentistTeacherOperations/List/StudentGroup/StudentGroupList";
import UserRequestListForCurrentuser from "../../features/UserRequestOperations/List/UserRequestListForCurrentuser";
import UserRequestListForAdmin from "../../features/UserRequestOperations/List/UserRequestListForAdmin";
import ResearchGroupList from "../../features/DentistTeacherOperations/List/ResearchGroup/ResearchGroupList";
import ResearchGroupDetails from "../../features/DentistTeacherOperations/List/ResearchGroup/ResearchGroupDetails";
import PatientsNotInResearchGroupList from "../../features/DentistTeacherOperations/List/ResearchGroup/PatientsNotInResearchGroupList";
import StudentGroupDetails from "../../features/DentistTeacherOperations/List/StudentGroup/StudentGroupDetails";
import StudentsNotInStudentGroupList from "../../features/DentistTeacherOperations/List/StudentGroup/StudentsNotInStudentGroupList";
import PatientProfile from "../../features/PatientOperations/PatientProfile/PatientProfile";
import ExamDetails from "../../features/StudentExamOperations/ExamDetails/ExamDetails";
import ExamSolutionDetailsForTeacher from "../../features/StudentExamOperations/ExamSolutionDetails/ExamSolutionDetailsForTeacher/ExamSolutionDetailsForTeacher";
import GroupsListForStudent from "../../features/StudentOperations/StudentGroupsList/GroupsListForStudent";
import GroupDetailsForStudent from "../../features/StudentOperations/StudentGroupDetails/GroupDetailsForStudent";
import ExamSolutionDetailsForStudent from "../../features/StudentExamOperations/ExamSolutionDetails/ExamSolutionDetailsForStudent/ExamSolutionDetailsForStudent";
import SolveExamMultiStepForm from "../../features/StudentExamOperations/Forms/SolveExamForms/SolveExamMultiStepForm";
import ActivePatientsList from "../../features/PatientOperations/List/ActivePatients/ActivePatientsList";
import ArchivedPatientsList from "../../features/PatientOperations/List/ArchivedPatients/ArchivedPatientsList";
import PatientExaminationCardDetails from "../../features/ExaminationCardOperations/Details/PatientExaminationCardDetails";
import CreatePatientExaminationCardMultiStepForm from "../../features/ExaminationCardOperations/Forms/CreatePatientExaminationCard/CreatePatientExaminationCardMultiStepForm";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          <RequireAuthentication
            roles={[
              "Admin",
              "Student",
              "Dentist_Teacher_Examiner",
              "Dentist_Teacher_Researcher",
            ]}
          />
        ),
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "my-requests", element: <UserRequestListForCurrentuser /> },
          {
            path: "active-patients",
            element: <ActivePatientsList />,
          },
          {
            path: "archived-patients",
            element: <ArchivedPatientsList />,
          },
        ],
      },
      {
        element: <RequireAuthentication roles={["Admin"]} />,
        children: [
          {
            path: "admin/active-users",
            element: <ActiveApplicationUsersList />,
          },
          {
            path: "admin/deactivated-users",
            element: <DeactivatedApplicationUsersList />,
          },
          {
            path: "admin/deleted-users",
            element: <DeletedApplicationUsersList />,
          },
          {
            path: "admin/requests",
            element: <UserRequestListForAdmin />,
          },
        ],
      },
      {
        element: (
          <RequireAuthentication
            roles={["Dentist_Teacher_Examiner", "Dentist_Teacher_Researcher"]}
          />
        ),
        children: [
          {
            path: "student-groups",
            element: <StudentGroupList />,
          },
          {
            path: "student-groups/:id",
            element: <StudentGroupDetails />,
          },
          {
            path: "student-groups/:id/add-students",
            element: <StudentsNotInStudentGroupList />,
          },
          {
            path: "research-groups",
            element: <ResearchGroupList />,
          },
          {
            path: "research-groups/:id",
            element: <ResearchGroupDetails />,
          },
          {
            path: "research-groups/:id/add-patients",
            element: <PatientsNotInResearchGroupList />,
          },
          {
            path: "exam-details/:examId",
            element: <ExamDetails />,
          },
          {
            path: "exam-details/:examId/:cardId",
            element: <ExamSolutionDetailsForTeacher />,
          },
        ],
      },
      {
        element: <RequireAuthentication roles={["Student"]} />,
        children: [
          {
            path: "my-groups",
            element: <GroupsListForStudent />,
          },
          {
            path: "my-groups/:groupId",
            element: <GroupDetailsForStudent />,
          },
          {
            path: "exam/:examId",
            element: <ExamSolutionDetailsForStudent />,
          },
          {
            path: "solve-exam/:examId",
            element: <SolveExamMultiStepForm />,
          },
        ],
      },
      {
        element: (
          <RequireAuthentication
            roles={[
              "Student",
              "Dentist_Teacher_Examiner",
              "Dentist_Teacher_Researcher",
            ]}
          />
        ),
        children: [
          {
            path: "patient-profile/:id",
            element: <PatientProfile />,
          },
          {
            path: "patient-profile/:id/:cardId",
            element: <PatientExaminationCardDetails />,
          },
          {
            path: "create-card/:id",
            element: <CreatePatientExaminationCardMultiStepForm />,
          },
        ],
      },
      { path: "login", element: <LoginForm /> },
      { path: "forgot-pass", element: <ForgotPasswordForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
      { path: "server-error", element: <ServerError /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
