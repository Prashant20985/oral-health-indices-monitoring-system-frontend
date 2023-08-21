import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import LoginForm from "../../features/AccountOperation/LoginForm";
import ForgotPasswordForm from "../../features/AccountOperation/ForgotPasswordForm";
import ResetPasswordForm from "../../features/AccountOperation/ResetPasswordForm";
import RequireAuthentication from "./RequireAuthentication";
import Dashboard from "../../features/Dashboard/Dashboard";

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
      { path: "login", element: <LoginForm /> },
      { path: "forgot-pass", element: <ForgotPasswordForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
