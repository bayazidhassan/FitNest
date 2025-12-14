import { Link, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="p-2">
      <Link to="/" className="flex items-center space-x-2 text-white">
        <img
          src="https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-[#0D9488] font-bold text-2xl">FitNest</span>
      </Link>
      <div className="mt-4 flex gap-2">
        <div className="space-y-2">
          <h1 className="border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-sm p-1 cursor-pointer">
            <Link to="/dashboard/admin/home">Home</Link>
          </h1>
          <h1 className="border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-sm p-1 cursor-pointer">
            <Link to="/dashboard/admin/productManagement">
              Product Management
            </Link>
          </h1>
          <h1 className="border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-sm p-1 cursor-pointer">
            <Link to="/dashboard/admin/orderManagement">Order Management</Link>
          </h1>
        </div>
        <div className="border border-gray-400 rounded-sm flex-1 p-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
