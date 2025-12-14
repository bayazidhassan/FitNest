const AdminHome = () => {
  const stats = [
    { label: "Total Users", value: 128 },
    { label: "Total Products", value: 56 },
    { label: "Total Orders", value: 342 },
    { label: "Pending Orders", value: 24 },
    { label: "Confirmed Orders", value: 298 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b font-semibold text-gray-700">
                Overview
              </th>
              <th className="text-left px-4 py-3 border-b font-semibold text-gray-700">
                Count
              </th>
            </tr>
          </thead>

          <tbody>
            {stats.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 border-b text-gray-600">
                  {item.label}
                </td>
                <td className="px-4 py-3 border-b font-semibold text-gray-800">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
