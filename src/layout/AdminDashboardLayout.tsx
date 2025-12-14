import { Home, Package, ShoppingCart } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const linkBase =
    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors";

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 fixed top-0 left-0 h-full overflow-y-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 mb-6">
          <img
            src="https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-[#0D9488] font-bold text-xl">
            FitNest
          </span>
        </NavLink>

        {/* Menu */}
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/admin/home"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#0D9488] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/dashboard/admin/productManagement"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#0D9488] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <Package size={18} />
            Product Management
          </NavLink>

          <NavLink
            to="/dashboard/admin/orderManagement"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-[#0D9488] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <ShoppingCart size={18} />
            Order Management
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
