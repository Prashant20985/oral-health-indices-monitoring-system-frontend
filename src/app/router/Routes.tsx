import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [{}],
  },
];

export const router = createBrowserRouter(routes);
