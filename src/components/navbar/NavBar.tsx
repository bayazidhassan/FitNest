import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCartIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useLogoutMutation } from '../../redux/api/auth/authApi';
import { useGetProductsBySearchQuery } from '../../redux/api/products/productsApi';
import { logout } from '../../redux/features/auth/authSlice';
import { clearCart } from '../../redux/features/cart/addToCartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { persistor } from '../../redux/store';
import type { TProduct } from '../../types/TProduct';

const NavBar = () => {
  const user = useAppSelector((state) => state.auth);
  const cartItem = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutApi] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap(); //refresh token removed from DB + cookie cleared
    } finally {
      dispatch(logout()); //clear auth state
      dispatch(clearCart()); //clear cart state
      persistor.purge(); //remove persisted Redux data
      navigate('/login', { replace: true }); //prevent back navigation
    }
  };

  const [searchText, setSearchText] = useState('');
  //const { data } = useGetProductsBySearchQuery(searchText, { skip: !searchText });
  const debouncedSearch = useDebounce(searchText, 300); //300ms delay
  const { data } = useGetProductsBySearchQuery(debouncedSearch, {
    skip: !debouncedSearch,
  });
  const products = data?.data || [];

  //dropdown disappears if you click outside or navigate to another page
  const location = useLocation();
  useEffect(() => {
    setSearchText(''); //clear search whenever route changes
  }, [location.pathname]);
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchText(''); //clear search whenever click outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#0F172A] px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center md:space-x-2 text-white">
          <img
            src="https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"
            alt="Logo"
            className="w-14 h-14 rounded-full"
          />
          <span className="hidden md:block text-[#0D9488] font-bold text-2xl">FitNest</span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-2/3 md:w-1/3" ref={searchRef}>
          <input
            className="w-full px-2 py-1 bg-gray-200 rounded"
            placeholder="Search products..."
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Search results dropdown */}
          {searchText && products.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto z-50 shadow-lg">
              {products.map((product: TProduct) => (
                <li key={product._id} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link
                    to={`/products/${product._id}`}
                    onClick={() => setSearchText('')} //clear search after click
                    className="flex items-center gap-2"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span className="text-gray-700">{product.name}</span>
                    <span className="hidden md:block text-gray-500 text-sm">
                      {product.category} | ৳{product.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* show no products */}
          {searchText && products.length === 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 px-3 py-2 text-gray-500">
              No products found.
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-[#F97316] ${
                isActive ? 'text-[#F97316] font-semibold' : 'text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-[#F97316] ${
                isActive ? 'text-[#F97316] font-semibold' : 'text-white'
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `transition-colors duration-200 relative inline-block hover:text-[#F97316] ${
                isActive ? 'text-[#F97316] font-semibold' : 'text-white'
              }`
            }
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartItem.length !== 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs w-5 h-5 font-semibold flex items-center justify-center rounded-full">
                {cartItem.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/aboutUs"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-[#F97316] ${
                isActive ? 'text-[#F97316] font-semibold' : 'text-white'
              }`
            }
          >
            About Us
          </NavLink>
          {!user.firstName ? (
            <Link to="/login" className="text-white hover:text-[#F97316]">
              Login
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={user.image as string}
                  alt={user.firstName + ' ' + user.lastName}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem className="font-semibold border-b-2">
                  {user.firstName + ' ' + user.lastName}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={`/dashboard/${user.role}`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button className="text-white focus:outline-none">
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col space-y-2 bg-[#0F172A] p-4 rounded mt-2 mr-6">
              {user.firstName && (
                <div className="flex items-center space-x-2 border-b border-gray-700 pb-2">
                  <img
                    src={user.image as string}
                    alt={user.firstName + ' ' + user.lastName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-semibold">
                    {user.firstName + ' ' + user.lastName}
                  </span>
                </div>
              )}
              <DropdownMenuItem asChild className="text-white">
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-white">
                <Link to="/products">Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-white">
                <Link to="/cart">Cart</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-white">
                <Link to="/aboutUs">About Us</Link>
              </DropdownMenuItem>
              {user.firstName && (
                <DropdownMenuItem className="text-white">
                  <Link to={`/dashboard/${user.role}`}>Dashboard</Link>
                </DropdownMenuItem>
              )}
              {!user.firstName ? (
                <DropdownMenuItem asChild className="text-white">
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                  className="text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
