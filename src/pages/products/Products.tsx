import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/api/productsApi";
import type { TProduct } from "../../types/TProduct";

const Products = () => {
  const { data: response, isLoading, error } = useGetAllProductsQuery();

  const products = response?.data || [];

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading products</p>
    );

  return (
    <div className="pt-16 px-6 pb-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0D9488] mb-6">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map((product: TProduct) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded shadow flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden rounded">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <h2 className="text-[#0D9488] font-bold text-lg mt-3">
              {product.name}
            </h2>
            <p className="text-gray-700 mt-1">${product.price}</p>

            {/* Buttons */}
            <div className="mt-3 flex justify-between gap-2">
              <Link
                to={`/products/${product._id}`}
                className="flex-1 text-center bg-[#0D9488] text-white px-2 py-1 rounded hover:bg-[#0a766f]"
              >
                View Details
              </Link>
              <button
                className="flex-1 text-center bg-[#F97316] text-white px-2 py-1 rounded hover:bg-[#ea5f0d]"
                onClick={() => console.log("Add to Cart:", product.name)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
