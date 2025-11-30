import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../redux/api/productsApi";

const CategoriesSection = () => {
  const { data: categoryResponse } = useGetAllCategoriesQuery();
  const categories = categoryResponse?.data || [];

  return (
    <div className="my-20 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-[#0D9488] mb-6">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category: { category: string; image?: string }) => (
          <Link
            key={category.category}
            to={`/products?category=${encodeURIComponent(category.category)}`}
            className="bg-white rounded shadow flex flex-col items-center justify-center p-4 hover:scale-105 transform transition"
          >
            {/* Optional: category image */}
            <img
              src={category.image}
              alt={category.category}
              className="w-20 h-20 object-contain mb-2"
            />
            <span className="text-center text-gray-700  font-semibold">
              {category.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
