import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import { useGetAProductQuery } from '../../redux/api/products/productsApi';
import { addToCart } from '../../redux/features/cart/addToCartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading, error } = useGetAProductQuery(id!);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  const product = response?.data;
  const [mainImage, setMainImage] = useState<string | null>(null);

  usePageTitle(`${product?.name} | FitNest`);

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  if (isLoading) return <p className="text-center py-20 text-lg">Loading product...</p>;
  if (error) return <p className="text-center py-20 text-red-500">Error loading product.</p>;
  if (!product) return <p className="text-center py-20">Product not found.</p>;

  const itemInCart = cartItems.find((item) => item.product_id === product._id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart`);
    dispatch(
      addToCart({
        product_id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        stock_quantity: product.stock_quantity,
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-3">
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="cursor-pointer hover:underline hover:font-medium">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="cursor-pointer hover:underline hover:font-medium">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </div>
      <div className="rounded-xl border border-gray-300 bg-gray-50 shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="aspect-square max-w-sm md:max-w-md mx-auto shadow rounded-lg overflow-hidden bg-white border border-gray-300">
              <img
                src={mainImage!}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex justify-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md border overflow-hidden transition
                      ${mainImage === img ? 'border-[#0D9488] border-2' : 'cursor-pointer border-2 border-gray-300 hover:border-2 hover:border-gray-400'}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name}-${index}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-[#0D9488]">{product.name}</h1>

            <p className="text-2xl font-semibold text-gray-800 mt-2">৳ {product.price}</p>

            <p className="text-sm mt-1">
              Stock:{' '}
              <span
                className={
                  product.stock_quantity > 0
                    ? 'text-green-600 font-medium'
                    : 'text-red-500 font-medium'
                }
              >
                {product.stock_quantity}
              </span>
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">{product.description}</p>

            <p className="mt-3 text-gray-600">
              Category: <span className="font-semibold text-gray-800">{product.category}</span>
            </p>

            {/* CTA */}
            <button
              disabled={quantityInCart >= product.stock_quantity}
              onClick={handleAddToCart}
              className="cursor-pointer border border-[#C2410C] shadow-md mt-6 w-full md:w-fit bg-[#F97316] text-white px-8 py-3 rounded-md font-semibold
                hover:bg-[#ea5f0d] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
