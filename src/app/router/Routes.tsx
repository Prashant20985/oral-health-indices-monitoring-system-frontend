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
            path: "research-groups",
            element: <ResearchGroupList />,
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
