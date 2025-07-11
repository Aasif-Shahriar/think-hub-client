import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <span className="loading loading-spinner" />;

  return user ? (
    children
  ) : (
    <Navigate to="/join-us" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
