import { Link } from "react-router-dom";
import { useGetFeaturedProductsQuery } from "../../redux/api/featuredProductsApi";
import type { TProduct } from "../../types/TProduct";

const FeaturedProducts = () => {
  //const { data: response, isLoading, error } = useGetFeaturedProductsQuery();
  //const products = response?.data || [];

  const { data: products, isLoading, error } = useGetFeaturedProductsQuery();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading products</p>
    );

  return (
    <div className="my-20 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-[#0D9488]">Featured Products</h1>
        <Link
          to="/products"
          className="mt-4 md:mt-0 inline-block bg-[#F97316] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#ea5f0d] transition-colors duration-200"
        >
          Explore More
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product: TProduct) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="w-full h-60 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-center text-gray-600 font-medium mb-2 line-clamp-2">
                {product.name}
              </h2>

              {/* View Details Button */}
              <Link
                to={`/products/${product._id}`}
                className="mt-auto inline-block text-center bg-[#0D9488] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0a766f] transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
