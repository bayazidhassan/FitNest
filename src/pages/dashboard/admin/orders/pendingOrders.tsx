import { useGetOrdersByStatusQuery } from "../../../../redux/api/orders/getOrdersByStatusApi";
import type { TOrder } from "../../../../types/TOrder";

const pendingOrders = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useGetOrdersByStatusQuery("pending");

  const orders = response?.data || [];

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading orders.</p>
    );

  console.log(orders);

  return (
    <div>
      {orders.map((order: TOrder) => (
        <h1>{order.firstName}</h1>
      ))}
    </div>
  );
};

export default pendingOrders;
