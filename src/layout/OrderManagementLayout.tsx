import { NavLink, Outlet } from "react-router-dom";

const OrderManagementLayout = () => {
  const orderTabs = [
    { label: "Pending Orders", path: "pendingOrders" },
    { label: "Confirmed Orders", path: "confirmedOrders" },
    { label: "Processing Orders", path: "processingOrders" },
    { label: "Shipped Orders", path: "shippedOrders" },
    { label: "Delivered Orders", path: "deliveredOrders" },
    { label: "Cancelled Orders", path: "cancelledOrders" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold border-b pb-4 md:pb-2">Order Management</h1>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-4">
        {orderTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `text-center py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#0D9488] text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      <div className="mt-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default OrderManagementLayout;
