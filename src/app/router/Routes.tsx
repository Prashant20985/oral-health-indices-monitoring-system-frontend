import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import LoginForm from "../../features/AccountOperation/LoginForm";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "login", element: <LoginForm /> }],
  },
];

export const router = createBrowserRouter(routes);
