import { Link } from 'react-router-dom';
import { useGetFeaturedProductsQuery } from '../../redux/api/products/productsApi';
import type { TProduct } from '../../types/TProduct';

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useGetFeaturedProductsQuery();

  if (isLoading) return <p className="text-center mt-10">Loading featured products...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error loading featured products.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0D9488]">Featured Products</h1>
        <Link
          to="/products"
          className="bg-[#F97316] font-semibold text-white py-2 px-4 rounded-lg border border-[#C2410C] shadow-md hover:bg-[#ea5f0d]"
        >
          Explore More
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products?.map((product: TProduct) => (
          <div
            key={product._id}
            className="border border-gray-300 bg-[#FFF7ED] rounded-lg shadow-lg flex flex-col justify-center items-center"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-32 h-32 md:w-40 md:h-40 object-contain hover:scale-105 transform transition"
            />
            <h2 className="px-2 text-center text-gray-700 font-medium my-2">{product.name}</h2>
            <Link
              to={`/products/${product._id}`}
              className="mt-auto mb-4 bg-[#0D9488] font-semibold text-white py-2 px-4 rounded-lg border border-[#115E59] shadow-md hover:bg-[#0a766f]"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
