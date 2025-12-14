import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div>
      <h1>FitNest</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default AdminDashboardLayout;
