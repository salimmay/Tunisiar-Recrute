import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If not logged in, redirect to login page immediately
  // 'replace' prevents them from clicking Back to return to the dashboard
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child routes (The Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;