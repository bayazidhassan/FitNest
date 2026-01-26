import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useGetAllProductsQuery } from '../../redux/api/products/productsApi';
import { addToCart } from '../../redux/features/cart/addToCartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import type { TProduct } from '../../types/TProduct';

import { ListFilter } from 'lucide-react';
import FilterSidebar from '../../components/product/FilterSidebar';
import PaginationSetup from '../../components/product/PaginationSetup';
import { Button } from '../../components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';

const Products = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);
  const { data: response, isLoading, error } = useGetAllProductsQuery();
  const products = response?.data || [];
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get('category');

  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sliderRange, setSliderRange] = useState<number[]>([0, 0]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>('default');

  //useMemo() -> React reuses the previously memoized value until one of the dependencies changes.
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const priceRange = useMemo(() => {
    if (!products.length) return null;
    const prices = products.map((p: TProduct) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategories([categoryFromQuery]);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    if (priceRange) {
      setSliderRange([priceRange.min, priceRange.max]);
    }
  }, [priceRange]);

  const handleChange = (_event: Event, newValue: number[]) => {
    setSliderRange(newValue);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedCategories([]);
    if (priceRange) setSliderRange([priceRange.min, priceRange.max]);
    setItemsPerPage(12);
    setCurrentPage(1);
    setSortOption('default');
    navigate(location.pathname, { replace: true }); //reset query params
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= sliderRange[0] && product.price <= sliderRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortOption === 'asc') result.sort((a, b) => a.price - b.price);
    else if (sortOption === 'desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, searchText, selectedCategories, sliderRange, sortOption]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (isLoading)
    return <p className="min-h-[60vh] flex justify-center items-center">Loading products...</p>;
  if (error)
    return (
      <p className="min-h-[60vh] flex justify-center items-center text-red-500">
        Error loading products.
      </p>
    );

  return (
    <div className="p-2 md:p-0 md:mt-0 max-w-7xl mx-auto">
      {/* Row 1: Title + Search */}
      <div className="flex justify-between md:justify-center items-center gap-1 md:gap-0 mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-[#0D9488]">Our Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="flex md:hidden border border-gray-300 rounded px-2 py-1 w-4/7 md:w-1/4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Row 2: Sidebar + Products */}
      <div className="md:flex gap-6">
        {/* Left Sidebar */}
        <div className="hidden md:block w-full md:w-1/5">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            sliderRange={sliderRange}
            handleSliderChange={handleChange}
            clearFilters={clearFilters}
            priceRange={priceRange}
          ></FilterSidebar>
        </div>

        {/* Right Products Grid */}
        <div className="w-full md:w-4/5">
          {/* Controls: Items per page + Sorting */}
          <div className="flex justify-between mb-4">
            <div className="hidden md:flex items-center gap-2">
              <label className="text-sm font-semibold">Show:</label>
              <select
                className="border border-gray-300 rounded px-1 py-1"
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

            <input
              type="text"
              placeholder="Search products..."
              className="hidden md:block border border-gray-300 rounded px-2 py-1 w-4/7 md:w-1/4"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Sort by:</label>
              <select
                className="border border-gray-300 rounded px-1 py-1 text-sm md:text-base"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as 'default' | 'asc' | 'desc')}
              >
                <option value="default">Default</option>
                <option value="asc">Price (Low → High)</option>
                <option value="desc">Price (High → Low)</option>
              </select>
            </div>

            <div className="md:hidden">
              <div className="flex flex-wrap gap-2">
                <Sheet>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-semibold">Filter:</h1>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="capitalize border border-gray-300">
                        <ListFilter />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <SheetContent className="w-[75vw]" side={'left'}>
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription className="sr-only">
                        Filter products by price, category, and availability
                      </SheetDescription>
                    </SheetHeader>
                    <div className="no-scrollbar overflow-y-auto h-[calc(100vh-120px)] px-4">
                      <FilterSidebar
                        categories={categories}
                        selectedCategories={selectedCategories}
                        toggleCategory={toggleCategory}
                        sliderRange={sliderRange}
                        handleSliderChange={handleChange}
                        clearFilters={clearFilters}
                        priceRange={priceRange}
                        isMobile={true}
                      ></FilterSidebar>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"> */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 md:max-h-[70vh] md:overflow-y-auto">
            {paginatedProducts.length === 0 && (
              <p className="min-h-[60vh] col-span-2 md:col-span-4 flex justify-center items-center text-gray-600 text-lg">
                No products found.
              </p>
            )}

            {paginatedProducts.map((product: TProduct) => {
              const itemInCart = cartItems.find((item) => item.product_id === product._id);
              const quantityInCart = itemInCart ? itemInCart.quantity : 0;
              return (
                <div
                  key={product._id}
                  className="border border-gray-300 p-2 md:p-4 rounded shadow flex flex-col"
                >
                  <div className="w-full h-32 md:h-40 overflow-hidden rounded">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 duration-300"
                    />
                  </div>
                  <h2 className="text-gray-700 mt-1">{product.name}</h2>
                  <p className="text-sm md:text-base text-gray-500">৳ {product.price}</p>
                  <div className="mt-auto pt-3 flex flex-col md:flex-row justify-between gap-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="flex-1 text-center bg-[#0D9488] text-white px-2 py-1 rounded hover:bg-[#0a766f] text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => {
                        toast.success(`${product.name} is added to cart.`);

                        dispatch(
                          addToCart({
                            product_id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            stock_quantity: product.stock_quantity,
                          })
                        );
                      }}
                      disabled={quantityInCart >= product.stock_quantity}
                      className="cursor-pointer disabled:cursor-default flex-1 text-center bg-[#F97316] text-white px-2 py-1 rounded hover:bg-[#ea5f0d] text-sm disabled:opacity-40"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <PaginationSetup
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></PaginationSetup>
        </div>
      </div>
    </div>
  );
};

export default Products;
