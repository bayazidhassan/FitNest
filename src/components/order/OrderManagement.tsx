import { CheckCircle, CornerUpLeft, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useOrderSearch } from '../../hooks/useOrderSearch';
import {
  useGetOrdersByStatusQuery,
  useUpdateOrderStatusMutation,
} from '../../redux/api/orders/ordersApi';
import type { TOrder, TStatus } from '../../types/TOrder';
import NoOrders from './NoOrders';
import OrdersHeader from './OrdersHeader';

const buttonActions = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered', 'returned'],
  delivered: [],
  cancelled: [],
} as const;

const buttonText = {
  confirmed: ['Confirm', 'Confirming...'],
  processing: ['Process', 'Processing...'],
  shipped: ['Ship', 'Shipping...'],
  delivered: ['Deliver', 'Delivering...'],
  cancelled: ['Cancel', 'Cancelling...'],
  returned: ['Return', 'Returning...'],
};

type OrderStatus = keyof typeof buttonActions;
type OrderAction = (typeof buttonActions)[OrderStatus][number];

type OrderManagementProps = {
  //status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  status: OrderStatus;
};
const OrderManagement = ({ status }: OrderManagementProps) => {
  const { data: response, isLoading, error } = useGetOrdersByStatusQuery(status);
  const ordersData = response?.data || [];

  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<OrderAction | null>(null);

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
        <p className="text-lg font-medium">Loading {status} orders...</p>
      </div>
    );
  if (!ordersData.length)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">No {status} orders.</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-red-500 font-medium">Error loading {status} orders.</p>
      </div>
    );

  const action1 = buttonActions[status][0];

  const handleUpdate = async (id: string, currentStatus: TStatus, newStatus: OrderAction) => {
    if (isUpdating) return;

    setActiveOrderId(id);
    setActiveAction(newStatus);

    try {
      await updateOrderStatus({
        id,
        fromStatus: currentStatus,
        toStatus: newStatus,
      }).unwrap();
      toast.success(`Order status updated to ${newStatus}.`);
    } catch (err: any) {
      toast.error(err?.data?.message || err.message || 'Something went wrong');
    } finally {
      setActiveOrderId(null);
      setActiveAction(null);
    }
  };

  return (
    <div className="space-y-4">
      <OrdersHeader
        title={`Total ${status} orders`}
        total={totalCount}
        searchText={searchText}
        onSearch={setSearchText}
      />
      {orders.length === 0 && hasSearch && <NoOrders text={`No orders match "${searchText}"`} />}
      {/* MOBILE: CARD VIEW */}
      {orders.length > 0 && (
        <div className="space-y-4 md:hidden">
          {orders.map((order: TOrder) => (
            <div
              key={order._id}
              className={`rounded-lg border p-4 ${
                order.isAlreadyPaid ? 'bg-green-100' : 'bg-white'
              } shadow-sm space-y-3`}
            >
              {/* User info */}
              <div>
                <h3 className="font-semibold">{`${order.firstName} ${order.lastName}`}</h3>
                <p className="text-sm text-gray-600">{order.email}</p>
                <p className="text-sm text-gray-600">{order.phone}</p>
                <p className="text-sm text-gray-600">{order.street_address}</p>
                <p className="text-sm text-gray-600">{`${order.upazila}, ${order.district}`}</p>
                {order.comment && <p className="text-sm italic">“{order.comment}”</p>}
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
              {status === 'delivered' || status === 'cancelled' ? (
                status === 'delivered' ? (
                  <div className="flex items-center justify-center text-green-600 gap-1">
                    <CheckCircle size={20} />
                    <span className="font-medium">Delivered</span>
                  </div>
                ) : order.status === 'cancelled' ? (
                  <div className="flex items-center justify-center gap-1 text-red-600">
                    <XCircle size={20} />
                    <span className="font-medium">Cancelled</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1 text-blue-600">
                    <CornerUpLeft size={20} />
                    <span className="font-medium">Returned</span>
                  </div>
                )
              ) : (
                <div className="flex gap-6">
                  <button
                    disabled={(isUpdating && activeOrderId === order._id) || order.isAlreadyPaid}
                    onClick={() =>
                      handleUpdate(
                        order._id,
                        order.status,
                        status === 'shipped' ? 'returned' : 'cancelled'
                      )
                    }
                    className={`flex flex-1 items-center justify-center bg-red-500 text-white ${
                      order.isAlreadyPaid ? 'cursor-not-allowed' : 'cursor-pointer'
                    } py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {isUpdating &&
                    activeOrderId === order._id &&
                    activeAction === (status === 'shipped' ? 'returned' : 'cancelled') ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {status === 'shipped' ? 'Returning' : 'Cancelling'}
                      </span>
                    ) : status === 'shipped' ? (
                      'Return'
                    ) : (
                      'Cancel'
                    )}
                  </button>
                  {action1 && (
                    <button
                      disabled={isUpdating && activeOrderId === order._id}
                      onClick={() => handleUpdate(order._id, order.status, action1)}
                      className="flex flex-1 items-center justify-center bg-[#0D9488] text-white cursor-pointer py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdating && activeOrderId === order._id && activeAction === action1 ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {buttonText[action1][1]}
                        </span>
                      ) : (
                        buttonText[action1][0]
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* DESKTOP: TABLE VIEW */}
      {orders.length > 0 && (
        <div className="hidden md:block bg-white shadow border-gray-300 rounded-lg overflow-x-auto">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="p-2 border-r">Customer</th>
                  <th className="p-2 border-r">Items</th>
                  <th className="p-2 border-r">Total</th>
                  {status === 'delivered' || status === 'cancelled' ? (
                    <th className="p-2">Status</th>
                  ) : (
                    <th className="p-2">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map((order: TOrder) => (
                  <tr
                    key={order._id}
                    className={`border-t-2 border-gray-300 ${
                      order.isAlreadyPaid && 'bg-green-100'
                    }`}
                  >
                    <td className="p-2 border-r">
                      <p className="font-medium">{`${order.firstName} ${order.lastName}`}</p>
                      <p className="text-sm text-gray-600">{order.email}</p>
                      <p className="text-sm">{order.phone}</p>
                      <p className="text-sm text-gray-600">{order.street_address}</p>
                      <p className="text-sm text-gray-600">{`${order.upazila}, ${order.district}`}</p>
                      {order.comment && <p className="text-sm italic">“{order.comment}”</p>}
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
                    <td className="p-2 font-semibold text-center border-r">৳{order.totalPrice}</td>
                    {status === 'delivered' || status === 'cancelled' ? (
                      status === 'delivered' ? (
                        <td className="p-2 text-center text-green-600">
                          <div className="flex items-center justify-center gap-1">
                            <CheckCircle size={20} />
                            <span className="font-medium">Delivered</span>
                          </div>
                        </td>
                      ) : order.status === 'cancelled' ? (
                        <td className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1 text-red-600">
                            <XCircle size={20} />
                            <span className="font-medium">Cancelled</span>
                          </div>
                        </td>
                      ) : (
                        <td className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1 text-blue-600">
                            <CornerUpLeft size={20} />
                            <span className="font-medium">Returned</span>
                          </div>
                        </td>
                      )
                    ) : (
                      <td className="p-2 space-x-2 text-center">
                        {action1 && (
                          <button
                            disabled={isUpdating && activeOrderId === order._id}
                            onClick={() => handleUpdate(order._id, order.status, action1)}
                            className="bg-[#0D9488] hover:bg-[#0a766f] border border-gray-300 shadow-lg font-semibold text-white cursor-pointer px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
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
                        )}
                        <button
                          disabled={
                            (isUpdating && activeOrderId === order._id) || order.isAlreadyPaid
                          }
                          onClick={() =>
                            handleUpdate(
                              order._id,
                              order.status,
                              status === 'shipped' ? 'returned' : 'cancelled'
                            )
                          }
                          className={`bg-red-500 ${
                            order.isAlreadyPaid
                              ? 'cursor-not-allowed'
                              : 'hover:bg-red-600 cursor-pointer'
                          }  text-white border border-gray-300 shadow-lg font-semibold px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          {isUpdating &&
                          activeOrderId === order._id &&
                          activeAction === (status === 'shipped' ? 'returned' : 'cancelled') ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              {status === 'shipped' ? 'Returning' : 'Cancelling'}
                            </span>
                          ) : status === 'shipped' ? (
                            'Return'
                          ) : (
                            'Cancel'
                          )}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
