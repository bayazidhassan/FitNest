import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const ProtectedRouteForProductManagement = () => {
  const user = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user.role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRouteForProductManagement;
