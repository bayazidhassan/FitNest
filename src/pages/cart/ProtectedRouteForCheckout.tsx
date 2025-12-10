import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const ProtectedRouteForCheckout = () => {
  const user = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user.role === "guest") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet></Outlet>;
};

export default ProtectedRouteForCheckout;
