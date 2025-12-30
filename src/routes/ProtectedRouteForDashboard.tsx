import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const ProtectedRouteForDashboard = () => {
  const { role, token } = useAppSelector((state) => state.auth);
  const data = useLoaderData() as { role: "user" | "admin" };

  if (!token) {
    return <Navigate to="/login" replace></Navigate>;
  }
  if (role !== data.role) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRouteForDashboard;
