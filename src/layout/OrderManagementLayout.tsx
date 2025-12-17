import { NavLink, Outlet } from "react-router-dom";

const OrderManagementLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Order Management</h1>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-4">
        <NavLink
          to="pendingOrders"
          className={({ isActive }) =>
            `text-center py-2 rounded-md transition-colors ${
              isActive
                ? "bg-[#0D9488] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`
          }
        >
          Pending Orders
        </NavLink>
        <NavLink
          to="confirmedOrders"
          className={({ isActive }) =>
            `text-center py-2 rounded-md transition-colors ${
              isActive
                ? "bg-[#0D9488] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`
          }
        >
          Confirmed Orders
        </NavLink>
        <NavLink
          to="processingOrders"
          className={({ isActive }) =>
            `text-center py-2 rounded-md transition-colors ${
              isActive
                ? "bg-[#0D9488] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`
          }
        >
          Processing Orders
        </NavLink>
        <NavLink
          to="shippedOrders"
          className={({ isActive }) =>
            `text-center py-2 rounded-md transition-colors ${
              isActive
                ? "bg-[#0D9488] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`
          }
        >
          Shipped Orders
        </NavLink>
        <NavLink
          to="deliveredOrders"
          className={({ isActive }) =>
            `text-center py-2 rounded-md transition-colors ${
              isActive
                ? "bg-[#0D9488] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`
          }
        >
          Delivered Orders
        </NavLink>
        <NavLink
          to="cancelledOrders"
          className={({ isActive }) =>
            `text-center py-2 rounded-md transition-colors ${
              isActive
                ? "bg-[#0D9488] text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`
          }
        >
          Cancelled Orders
        </NavLink>
      </div>
      <div className="mt-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default OrderManagementLayout;
