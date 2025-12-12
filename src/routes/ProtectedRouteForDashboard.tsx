import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const ProtectedRouteForDashboard = () => {
  const user = useAppSelector((state) => state.auth);
  const data = useLoaderData() as { role: "user" | "admin" };

  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }
  if (user.role !== data.role) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRouteForDashboard;
