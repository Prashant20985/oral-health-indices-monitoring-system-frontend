import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ApplicationRole } from "../models/Role";
import { useStore } from "../stores/Store";

interface AuthProps {
  roles: ApplicationRole[];
  fallbackPath?: string;
}

/**
 * A higher-order component that enforces authentication and role-based access control for a route.
 * 
 * @component
 * @param {AuthProps} props - The props for the RequireAuthentication component.
 * @param {string[]} props.roles - The roles allowed to access the route.
 * @returns {ReactNode} The rendered component based on the authentication and role checks.
 */
export default function RequireAuthentication({
  roles,
}: AuthProps) {
  const { userStore } = useStore();
  const { isUserLoggedIn, user } = userStore;
  const location = useLocation();

  if (!isUserLoggedIn) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  } else if (user?.role && !roles.includes(user.role)) {
    return <Navigate to={"/unauthorized"} />;
  }

  return <Outlet />;
}
