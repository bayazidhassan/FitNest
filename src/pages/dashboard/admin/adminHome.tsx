import { useGetOrderStatsQuery } from '../../../redux/api/orders/ordersApi';
import { useCountTotalProductsQuery } from '../../../redux/api/products/productsApi';
import { useCountTotalUserQuery } from '../../../redux/api/user/userApi';

const AdminHome = () => {
  const { data: user } = useCountTotalUserQuery();
  const { data: products } = useCountTotalProductsQuery();
  const { data: orders } = useGetOrderStatsQuery();

  const totalUser = user?.data ?? 0;
  const totalProducts = products?.data ?? 0;
  const totalOrders = orders?.data.totalOrders ?? 0;
  const pendingOrders = orders?.data.pendingOrders ?? 0;
  const confirmOrders = orders?.data.confirmedOrders ?? 0;
  const processingOrders = orders?.data.processingOrders ?? 0;
  const shippedOrders = orders?.data.shippedOrders ?? 0;
  const deliveredOrders = orders?.data.deliveredOrders ?? 0;
  const cancelledOrders = orders?.data.cancelledOrders ?? 0;

  const stats = [
    { label: 'Total Users', value: totalUser },
    { label: 'Total Products', value: totalProducts },
    { label: 'Total Orders', value: totalOrders },
    { label: 'Total Pending Orders', value: pendingOrders },
    { label: 'Total Confirmed Orders', value: confirmOrders },
    { label: 'Total Processing Orders', value: processingOrders },
    { label: 'Total Shipped Orders', value: shippedOrders },
    { label: 'Total Delivered Orders', value: deliveredOrders },
    { label: 'Total Cancelled/Returned Orders', value: cancelledOrders },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="overflow-x-auto bg-white border border-gray-400 rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-3 border-b font-semibold text-gray-700">Overview</th>
              <th className="text-left px-4 py-3 border-b font-semibold text-gray-700">Count</th>
            </tr>
          </thead>

          <tbody>
            {stats.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="px-4 py-3 border-b text-gray-600">{item.label}</td>
                <td className="px-4 py-3 border-b font-semibold text-gray-800">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
