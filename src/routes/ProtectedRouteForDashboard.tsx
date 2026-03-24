import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { verifyToken } from '../utils/verifyToken';

const ProtectedRouteForDashboard = () => {
  const { token } = useAppSelector((state) => state.auth);
  const data = useLoaderData() as { role: 'user' | 'admin' };
  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (user?.role !== data.role) {
    dispatch(logout());
    return <Navigate to="/login" replace></Navigate>;
  }
  if (!token) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRouteForDashboard;
