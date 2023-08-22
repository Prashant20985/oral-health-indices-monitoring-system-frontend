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
        children: [{ path: "/", element: <Dashboard /> }],
      },
      {
        element: <RequireAuthentication roles={["Admin"]} fallbackPath="/" />,
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
        ],
      },
      { path: "login", element: <LoginForm /> },
      { path: "forgot-pass", element: <ForgotPasswordForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
