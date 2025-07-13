import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingBar from "../components/loding/LoadingBar";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingBar />;

  return user ? (
    children
  ) : (
    <Navigate to="/join-us" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
