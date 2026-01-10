import { useMemo, useState } from "react";
import type { TOrder } from "../types/TOrder";

export const useOrderSearch = (ordersData: TOrder[]) => {
  const [searchText, setSearchText] = useState("");

  const filteredOrders = useMemo(() => {
    const q = searchText.toLowerCase();

    if (!q) return ordersData;

    return ordersData.filter((order) => {
      return (
        order.firstName.toLowerCase().includes(q) ||
        order.lastName.toLowerCase().includes(q) ||
        order.email.toLowerCase().includes(q) ||
        order.phone.toLowerCase().includes(q) ||
        order.street_address.toLowerCase().includes(q) ||
        order.upazila.toLowerCase().includes(q) ||
        order.district.toLowerCase().includes(q) ||
        order.comment?.toLowerCase().includes(q)
      );
    });
  }, [ordersData, searchText]);

  return {
    searchText,
    setSearchText,
    filteredOrders,
    totalCount: filteredOrders.length,
    hasSearch: Boolean(searchText),
  };
};
