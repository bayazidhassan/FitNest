import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAProductQuery } from "../../redux/api/products/productsApi";
import { addToCart } from "../../redux/features/cart/addToCartSlice";
import { useAppDispatch } from "../../redux/hook";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading, error } = useGetAProductQuery(id!);
  const dispatch = useAppDispatch();

  const product = response?.data;

  // Add state for main image
  const [mainImage, setMainImage] = useState<string | null>(
    product?.images[0] || null
  );

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !product)
    return <p className="text-center mt-10 text-red-500">Product not found</p>;

  // Update mainImage when product changes (important for dynamic fetch)
  if (mainImage === null && product.images.length > 0) {
    setMainImage(product.images[0]);
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product_id: product._id,
        quantity: 1,
        stock: product.stock_quantity,
      })
    );
  };

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Left: Images */}
        <div className="md:w-1/2 flex flex-col gap-1 items-center">
          {/* Main Image */}
          <div className="h-60 md:h-96 overflow-hidden">
            <img
              src={mainImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Other Images */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 md:w-20 md:h-20 shrink-0 overflow-hidden rounded cursor-pointer border hover:border-[#0D9488] ${
                    mainImage === img ? "border-[#0D9488] border-2" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold text-[#0D9488]">{product.name}</h1>
          <p className="text-gray-700 text-xl mt-2">${product.price}</p>
          <p className="text-gray-500 mt-1">Stock: {product.stock_quantity}</p>
          <p className="text-gray-600 text-justify mt-4">
            {product.description}
          </p>
          <p className="text-gray-600 mt-2">
            Category: <span className="font-semibold">{product.category}</span>
          </p>

          {/* Add to Cart */}
          <button
            className="mt-6 bg-[#F97316] text-white px-6 py-2 rounded hover:bg-[#ea5f0d] w-full md:w-auto"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
