import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ApplicationRole } from "../models/Role";
import { useStore } from "../stores/Store";
import { toast } from "react-toastify";

interface AuthProps {
  roles: ApplicationRole[];
  fallbackPath?: string;
}

export default function RequireAuthentication({
  roles,
  fallbackPath = "/",
}: AuthProps) {
  const { userStore } = useStore();
  const { isUserLoggedIn, user } = userStore;
  const location = useLocation();

  if (!isUserLoggedIn) {
    return <Navigate to={fallbackPath} state={{ from: location }} />;
  } else if (user?.role && !roles.includes(user.role)) {
    toast.info("Unauthorized Area");
    return <Navigate to={fallbackPath} />;
  }

  return <Outlet />;
}
