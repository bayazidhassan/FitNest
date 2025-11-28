import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteForProductManagement = () => {
  const [role, setRole] = useState<"admin" | "user">("admin");
  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRouteForProductManagement;
