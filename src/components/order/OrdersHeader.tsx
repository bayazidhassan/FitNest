type Props = {
  title: string;
  total: number;
  searchText: string;
  onSearch: (value: string) => void;
};

const OrdersHeader = ({ title, total, searchText, onSearch }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
      <h1>
        {title}: <span className="font-semibold">{total}</span>
      </h1>

      <input
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
        className="p-2 rounded border border-gray-400 md:w-64"
        placeholder="Search orders..."
        type="text"
      />
    </div>
  );
};

export default OrdersHeader;
