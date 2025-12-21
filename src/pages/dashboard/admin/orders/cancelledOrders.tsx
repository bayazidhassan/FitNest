import { CornerUpLeft, XCircle } from "lucide-react";
import { useGetOrdersByStatusQuery } from "../../../../redux/api/orders/ordersApi";
import type { TOrder } from "../../../../types/TOrder";

const cancelledOrders = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useGetOrdersByStatusQuery("cancelled");

  const orders = response?.data || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  if (!orders.length)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">No cancelled or returned orders</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-red-500 font-medium">
          Error loading orders.
        </p>
      </div>
    );

  // Function to render status badge with icon
  const renderStatusBadge = (status: string) => {
    if (status === "cancelled") {
      return (
        <div className="flex items-center justify-center gap-1 text-red-600">
          <XCircle size={20} />
          <span className="font-medium">Cancelled</span>
        </div>
      );
    }
    if (status === "returned") {
      return (
        <div className="flex items-center justify-center gap-1 text-blue-600">
          <CornerUpLeft size={20} />
          <span className="font-medium">Returned</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* MOBILE: CARD VIEW */}
      <div className="space-y-4 md:hidden">
        {orders.map((order: TOrder) => (
          <div
            key={order._id}
            className="rounded-lg border bg-white p-4 shadow-sm space-y-3"
          >
            {/* User info */}
            <div>
              <h3 className="font-semibold">{`${order.firstName} ${order.lastName}`}</h3>
              <p className="text-sm text-gray-600">{order.email}</p>
              <p className="text-sm text-gray-600">{order.phone}</p>
              <p className="text-sm text-gray-600">{order.street_address}</p>
              <p className="text-sm text-gray-600">{`${order.upazila}, ${order.district}`}</p>
            </div>

            {/* Comment */}
            {order.comment && (
              <p className="text-sm italic">“{order.comment}”</p>
            )}

            {/* Items */}
            <div className="border-t pt-2 text-sm space-y-1">
              {order.cartItems.map((item) => (
                <p key={item.product_id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>৳{item.price * item.quantity}</span>
                </p>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between font-semibold border-t py-2">
              <span>Total</span>
              <span>৳{order.totalPrice}</span>
            </div>

            {/* Status */}
            {renderStatusBadge(order.status)}
          </div>
        ))}
      </div>

      {/* DESKTOP: TABLE VIEW */}
      <div className="hidden md:block bg-white shadow border-gray-300 rounded overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border-r">Customer</th>
              <th className="p-2 border-r">Items</th>
              <th className="p-2 border-r">Total</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: TOrder) => (
              <tr key={order._id} className="border-t-2 border-gray-300">
                <td className="p-2 border-r">
                  <p className="font-medium">{`${order.firstName} ${order.lastName}`}</p>
                  <p className="text-sm text-gray-600">{order.email}</p>
                  <p className="text-sm">{order.phone}</p>
                  <p className="text-sm text-gray-600">
                    {order.street_address}
                  </p>
                  <p className="text-sm text-gray-600">{`${order.upazila}, ${order.district}`}</p>
                  {order.comment && (
                    <p className="text-sm italic">“{order.comment}”</p>
                  )}
                </td>

                <td className="p-2 text-sm border-r">
                  <div className="grid grid-cols-[1fr_auto] gap-x-2">
                    {order.cartItems.map((item) => (
                      <div key={item.product_id} className="contents">
                        <span className="truncate">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="whitespace-nowrap text-right">
                          ৳{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="p-2 font-semibold text-center border-r">
                  ৳{order.totalPrice}
                </td>

                <td className="p-2 text-center">
                  {renderStatusBadge(order.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default cancelledOrders;
