import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

const ProtectedRouteForCheckout = () => {
  const user = useAppSelector((state) => state.auth);
  const location = useLocation();
  const cartItems = useAppSelector((state) => state.cart);

  if (user.role === "guest") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  
  return <Outlet></Outlet>;
};

export default ProtectedRouteForCheckout;
