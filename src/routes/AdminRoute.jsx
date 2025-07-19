import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingBar from "../components/loding/LoadingBar";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <LoadingBar />;
  }

  if (!user || role !== "admin") {
    return (
      <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default AdminRoute;
