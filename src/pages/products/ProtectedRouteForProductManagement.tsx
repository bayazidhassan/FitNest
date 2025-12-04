import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const ProtectedRouteForProductManagement = () => {
  const user = useAppSelector((state) => state.auth);

  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRouteForProductManagement;
