import { useGetOrdersByStatusQuery } from "../../../../redux/api/orders/getOrdersByStatusApi";

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

  return (
    <div>
      {orders.map((order) => <h1>{order.firstName}</h1>)}
    </div>
  );
};

export default pendingOrders;
