import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "../../redux/api/productsApi";
import type { TProduct } from "../../types/TProduct";

function valuetext(value: number) {
  return `৳${value}`;
}

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");

  const { data: response } = useGetAllProductsQuery();
  const {
    data: categoryResponse,
    isLoading,
    error,
  } = useGetAllCategoriesQuery();

  const [searchText, setSearchText] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategories([categoryFromQuery]);
    }
  }, [categoryFromQuery]);

  const [value, setValue] = useState<number[]>([0, 100000]);
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sorting: default | asc | desc
  const [sortOption, setSortOption] = useState<"default" | "asc" | "desc">(
    "default"
  );

  const products = response?.data || [];
  const categories = categoryResponse?.data || [];

  useEffect(() => {
    if (products.length) {
      const highestPrice = Math.max(...products.map((p: TProduct) => p.price));
      setMaxPrice(highestPrice);
      setValue([0, highestPrice]);
    }
  }, [products]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) setValue(newValue);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchText("");
    setSelectedCategories([]);
    setValue([0, maxPrice]);
    setItemsPerPage(12);
    setCurrentPage(1);
    setSortOption("default");
  };

  // Filter products
  let filteredProducts = products.filter((product: TProduct) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice = product.price >= value[0] && product.price <= value[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  if (sortOption === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }
  // else "default" keeps original API order

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading products</p>
    );

  return (
    <div className="pt-16 px-6 pb-10 max-w-7xl mx-auto">
      {/* Row 1: Title + Search */}
      <div className="md:flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#0D9488]">Our Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border-2 rounded px-2 py-1 mt-4 md:mt-0 md:w-1/4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Row 2: Sidebar + Products */}
      <div className="md:flex gap-6">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/5">
          {/* Price Slider */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <span className="font-semibold text-gray-700">Price Range:</span>
            <Box sx={{ width: "93%", ml: 1.3 }}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={value}
                min={0}
                max={maxPrice}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
              <div className="text-sm mt-1">
                Min: ৳{value[0]} | Max: ৳{value[1]}
              </div>
            </Box>
          </div>

          {/* Category Filters */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <span className="font-semibold text-gray-700">Categories:</span>
            <div className="flex flex-col gap-2 mt-2">
              {categories.map(
                (category: { category: string; image?: string }) => (
                  <label
                    key={category.category}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded cursor-pointer hover:bg-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.category)}
                      onChange={() => toggleCategory(category.category)}
                    />
                    <span>{category.category}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Clear Filters
          </button>
        </div>

        {/* Right Products Grid */}
        <div className="w-full md:w-4/5">
          {/* Controls: Items per page + Sorting */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Show:</label>
              <select
                className="border rounded px-2 py-1"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[4, 8, 12, 16].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Sort by:</label>
              <select
                className="border rounded px-2 py-1"
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as "default" | "asc" | "desc")
                }
              >
                <option value="default">Default</option>
                <option value="asc">Price (Low → High)</option>
                <option value="desc">Price (High → Low)</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.length === 0 && (
              <p className="text-center col-span-4 text-gray-500">
                No products found.
              </p>
            )}

            {paginatedProducts.map((product: TProduct) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded shadow flex flex-col"
              >
                <div className="w-full h-48 overflow-hidden rounded">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 duration-300"
                  />
                </div>

                <h2 className="text-gray-700 mt-3">{product.name}</h2>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  ৳ {product.price}
                </p>

                <div className="mt-3 flex justify-between gap-2">
                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 text-center bg-[#0D9488] text-white px-2 py-1 rounded hover:bg-[#0a766f] text-sm"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 text-center bg-[#F97316] text-white px-2 py-1 rounded hover:bg-[#ea5f0d] text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      page === currentPage
                        ? "bg-[#0D9488] text-white"
                        : "bg-white"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
