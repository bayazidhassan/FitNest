import { useState } from "react";
import toast from "react-hot-toast";
import { useOrderSearch } from "../../hooks/useOrderSearch";
import {
  useGetOrdersByStatusQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/api/orders/ordersApi";
import type { TOrder, TStatus } from "../../types/TOrder";
import NoOrders from "./NoOrders";
import OrdersHeader from "./OrdersHeader";

const buttonActions = {
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "returned"],
} as const;

const buttonText = {
  processing: ["Process", "Processing..."],
  shipped: ["Ship", "Shipping..."],
  delivered: ["Deliver", "Delivering..."],
  cancelled: ["Cancel", "Cancelling..."],
  returned: ["Return", "Returning..."],
};
type OrderManagementProps = {
  status: "confirmed" | "processing" | "shipped";
};
const OrderManagement = ({ status }: OrderManagementProps) => {
  const {
    data: response,
    isLoading,
    error,
  } = useGetOrdersByStatusQuery(status);
  const ordersData = response?.data || [];

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<
    "processing" | "shipped" | "delivered" | "cancelled" | "returned" | null
  >(null);

  const {
    searchText,
    setSearchText,
    filteredOrders: orders,
    totalCount,
    hasSearch,
  } = useOrderSearch(ordersData);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  if (!ordersData.length)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">No {status} orders</p>
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

  const action1: "processing" | "shipped" | "delivered" =
    buttonActions[status][0];

  const handleUpdate = async (
    id: string,
    currentStatus: TStatus,
    newStatus: "processing" | "shipped" | "delivered" | "cancelled" | "returned"
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
        newStatus === action1
          ? `Order is ${action1}.`
          : `Order is ${status === "shipped" ? "returned" : "cancelled"}.`
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
      <OrdersHeader
        title={`Total ${status} Orders`}
        total={totalCount}
        searchText={searchText}
        onSearch={setSearchText}
      />
      {orders.length === 0 && hasSearch && (
        <NoOrders text={`No orders match "${searchText}"`} />
      )}
      {/* MOBILE: CARD VIEW */}
      {orders.length > 0 && (
        <div className="space-y-4 md:hidden">
          {orders.map((order: TOrder) => (
            <div
              key={order._id}
              className={`rounded-lg border p-4 ${
                order.isAlreadyPaid ? "bg-green-100" : "bg-white"
              } shadow-sm space-y-3`}
            >
              {/* User info */}
              <div>
                <h3 className="font-semibold">{`${order.firstName} ${order.lastName}`}</h3>
                <p className="text-sm text-gray-600">{order.email}</p>
                <p className="text-sm text-gray-600">{order.phone}</p>
                <p className="text-sm text-gray-600">{order.street_address}</p>
                <p className="text-sm text-gray-600">{`${order.upazila}, ${order.district}`}</p>
                {order.comment && (
                  <p className="text-sm italic">“{order.comment}”</p>
                )}
                <p className="text-sm">{order._id}</p>
              </div>
              {/* Items */}
              <div className="border-t pt-2 text-sm">
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
              <div className="flex gap-6">
                <button
                  disabled={
                    (isUpdating && activeOrderId === order._id) ||
                    order.isAlreadyPaid
                  }
                  onClick={() =>
                    handleUpdate(
                      order._id,
                      order.status,
                      status === "shipped" ? "returned" : "cancelled"
                    )
                  }
                  className={`flex flex-1 items-center justify-center bg-red-500 text-white ${
                    order.isAlreadyPaid
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {isUpdating &&
                  activeOrderId === order._id &&
                  activeAction ===
                    (status === "shipped" ? "returned" : "cancelled") ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {status === "shipped" ? "Returning" : "Cancelling"}
                    </span>
                  ) : status === "shipped" ? (
                    "Return"
                  ) : (
                    "Cancel"
                  )}
                </button>
                <button
                  disabled={isUpdating && activeOrderId === order._id}
                  onClick={() => handleUpdate(order._id, order.status, action1)}
                  className="flex flex-1 items-center justify-center bg-[#0D9488] text-white cursor-pointer py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating &&
                  activeOrderId === order._id &&
                  activeAction === action1 ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {buttonText[action1][1]}
                    </span>
                  ) : (
                    buttonText[action1][0]
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
                <tr
                  key={order._id}
                  className={`border-t-2 border-gray-300 ${
                    order.isAlreadyPaid && "bg-green-100"
                  }`}
                >
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
                        handleUpdate(order._id, order.status, action1)
                      }
                      className="bg-[#0D9488] hover:bg-[#0a766f] text-white cursor-pointer px-3 py-1 rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdating &&
                      activeOrderId === order._id &&
                      activeAction === action1 ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {buttonText[action1][1]}
                        </span>
                      ) : (
                        buttonText[action1][0]
                      )}
                    </button>
                    <button
                      disabled={
                        (isUpdating && activeOrderId === order._id) ||
                        order.isAlreadyPaid
                      }
                      onClick={() =>
                        handleUpdate(
                          order._id,
                          order.status,
                          status === "shipped" ? "returned" : "cancelled"
                        )
                      }
                      className={`bg-red-500 ${
                        order.isAlreadyPaid
                          ? "cursor-not-allowed"
                          : "hover:bg-red-600 cursor-pointer"
                      }  text-white px-3 py-1 rounded-sm disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {isUpdating &&
                      activeOrderId === order._id &&
                      activeAction ===
                        (status === "shipped" ? "returned" : "cancelled") ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {status === "shipped" ? "Returning" : "Cancelling"}
                        </span>
                      ) : status === "shipped" ? (
                        "Return"
                      ) : (
                        "Cancel"
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

export default OrderManagement;
