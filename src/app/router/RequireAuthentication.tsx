import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ApplicationRole } from "../models/Role";
import { useStore } from "../stores/Store";

interface AuthProps {
  roles: ApplicationRole[];
  fallbackPath?: string;
}

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
