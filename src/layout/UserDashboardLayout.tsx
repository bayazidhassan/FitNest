import { Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  return (
    <div>
      <h1>user dashboard</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default UserDashboardLayout;
