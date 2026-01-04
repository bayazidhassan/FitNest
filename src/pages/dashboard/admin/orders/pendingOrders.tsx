import { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetOrdersByStatusQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/api/orders/ordersApi";
import type { TOrder, TStatus } from "../../../../types/TOrder";

const pendingOrders = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useGetOrdersByStatusQuery("pending");

  const ordersData = response?.data || [];

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<
    "confirmed" | "cancelled" | null
  >(null);

  const [searchText, setSearchText] = useState("");
  const orders = ordersData.filter((order: TOrder) => {
    const matchesFirstName = order.firstName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesLastName = order.lastName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const email = order.email.toLowerCase().includes(searchText.toLowerCase());
    const phone = order.phone.toLowerCase().includes(searchText.toLowerCase());
    const street_address = order.street_address
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const upazila = order.upazila
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const district = order.district
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const comment = order.comment
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return (
      matchesFirstName ||
      matchesLastName ||
      email ||
      phone ||
      street_address ||
      upazila ||
      district ||
      comment
    );
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  if (!ordersData.length)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">No pending orders</p>
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

  const handleUpdate = async (
    id: string,
    currentStatus: TStatus,
    newStatus: "confirmed" | "cancelled"
  ) => {
    setActiveOrderId(id);
    setActiveAction(newStatus);

    try {
      await updateOrderStatus({
        id,
        fromStatus: currentStatus,
        toStatus: newStatus,
      }).unwrap();
      toast.success(
        newStatus === "confirmed"
          ? "Order confirmed successfully!"
          : "Order cancelled successfully!"
      );
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || "Something went wrong");
    } finally {
      setActiveOrderId(null);
      setActiveAction(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold">Total Pending Orders: {orders.length}</h1>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-1 rounded border border-gray-400"
          placeholder="Search orders..."
          type="text"
        />
      </div>
      {orders.length === 0 && searchText && (
        <div className="flex justify-center items-center h-[40vh]">
          <p className="text-gray-500 text-lg text-center px-4">
            No orders match “{searchText}”
          </p>
        </div>
      )}

      {/* MOBILE: CARD VIEW */}
      {orders.length > 0 && (
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

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  disabled={isUpdating && activeOrderId === order._id}
                  onClick={() =>
                    handleUpdate(order._id, order.status, "cancelled")
                  }
                  className="flex-1 bg-red-500 text-white cursor-pointer py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating &&
                  activeOrderId === order._id &&
                  activeAction === "cancelled" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Cancelling...
                    </span>
                  ) : (
                    "Cancel"
                  )}
                </button>
                <button
                  disabled={isUpdating && activeOrderId === order._id}
                  onClick={() =>
                    handleUpdate(order._id, order.status, "confirmed")
                  }
                  className="flex-1 bg-[#0D9488] text-white cursor-pointer py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating &&
                  activeOrderId === order._id &&
                  activeAction === "confirmed" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Confirming...
                    </span>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DESKTOP: TABLE VIEW */}
      {orders.length > 0 && (
        <div className="hidden md:block bg-white shadow border-gray-300 rounded overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-r">Customer</th>
                <th className="p-2 border-r">Items</th>
                <th className="p-2 border-r">Total</th>
                <th className="p-2">Actions</th>
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
                    <p className="text-sm">{order._id}</p>
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

                  <td className="p-2 space-x-2 text-center">
                    <button
                      disabled={isUpdating && activeOrderId === order._id}
                      onClick={() =>
                        handleUpdate(order._id, order.status, "cancelled")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-3 py-1 rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdating &&
                      activeOrderId === order._id &&
                      activeAction === "cancelled" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Cancelling...
                        </span>
                      ) : (
                        "Cancel"
                      )}
                    </button>

                    <button
                      disabled={isUpdating && activeOrderId === order._id}
                      onClick={() =>
                        handleUpdate(order._id, order.status, "confirmed")
                      }
                      className="bg-[#0D9488] hover:bg-[#0a766f] text-white cursor-pointer px-3 py-1 rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdating &&
                      activeOrderId === order._id &&
                      activeAction === "confirmed" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Confirming...
                        </span>
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default pendingOrders;
