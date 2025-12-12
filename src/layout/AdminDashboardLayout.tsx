import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div>
      <h1>admin dashboard</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default AdminDashboardLayout;
