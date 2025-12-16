import { Home, Menu, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkBase =
    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors";

  const links = [
    { to: "/dashboard/admin/home", icon: <Home size={18} />, label: "Home" },
    {
      to: "/dashboard/admin/productManagement",
      icon: <Package size={18} />,
      label: "Product Management",
    },
    {
      to: "/dashboard/admin/orderManagement",
      icon: <ShoppingCart size={18} />,
      label: "Order Management",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 shadow-md"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-white border-r p-4
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 z-40 overflow-y-auto
        `}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 mb-6">
          <img
            src="https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-[#0D9488] font-bold text-xl">FitNest</span>
        </NavLink>

        {/* Menu */}
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "bg-[#0D9488] text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
              onClick={() => setSidebarOpen(false)} // close on mobile
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 md:hidden z-30 transition-opacity bg-[rgba(0,0,0,0.2)]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 min-h-screen">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
