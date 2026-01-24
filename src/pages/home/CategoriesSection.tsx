import { Link } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../redux/api/products/productsApi';

const CategoriesSection = () => {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();

  if (isLoading) return <p className="text-center mt-10">Loading categories...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading categories.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <h2 className="text-2xl md:text-3xl text-center font-bold text-[#0D9488] mb-6">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories?.data.map((category: { category: string; image?: string }) => (
          <Link
            key={category.category}
            to={`/products?category=${encodeURIComponent(category.category)}`}
            className="bg-[#F0FDFA] border border-gray-300 rounded shadow flex flex-col items-center justify-center gap-2 p-2 md:p-4 hover:scale-105 transform transition"
          >
            <img
              src={category?.image}
              alt={category.category}
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
            <span className="text-gray-700 font-semibold">{category.category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
