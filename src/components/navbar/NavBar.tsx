import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, ShoppingCartIcon } from 'lucide-react';
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
  const location = useLocation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

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

  //const { data } = useGetProductsBySearchQuery(searchText, { skip: !searchText });
  const debouncedSearch = useDebounce(searchText, 300); //300ms delay
  const { data } = useGetProductsBySearchQuery(debouncedSearch, {
    skip: !debouncedSearch,
  });
  const products = data?.data || [];

  //dropdown disappears if you click outside or navigate to another page
  useEffect(() => {
    setSearchText(''); //clear search whenever route changes
    setShowMobileSearch(false); //close search bar whenever route changes
  }, [location.pathname]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !desktopSearchRef.current?.contains(event.target as Node) &&
        !mobileSearchRef.current?.contains(event.target as Node)
      ) {
        setSearchText(''); //clear search whenever click outside
        setShowMobileSearch(false); //close search bar whenever click outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-[#1E293B] px-6 py-2 fixed top-0 left-0 w-full z-50">
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

        {/* Desktop Search */}
        {location.pathname !== '/products' && (
          <div ref={desktopSearchRef} className="relative w-1/3 hidden md:block">
            <input
              className="w-full px-2 py-1 bg-gray-100 rounded-lg"
              placeholder="Search products..."
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto z-50 shadow-lg">
                {products.length ? (
                  products.map((product: TProduct) => (
                    <li
                      key={product._id}
                      className="px-3 py-2 border-b hover:bg-gray-100 cursor-pointer"
                    >
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
                        <span className="text-gray-500 text-sm">
                          | {product.category} | ৳{product.price}
                        </span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-500">No products found</li>
                )}
              </ul>
            )}
          </div>
        )}

        {/* Search bar for mobile device */}
        {location.pathname !== '/products' && (
          <button className="md:hidden" onClick={() => setShowMobileSearch((p) => !p)}>
            <Search className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Cart for mobile device */}
        <Link to="/cart" className="md:hidden relative inline-block text-white">
          <ShoppingCartIcon className="w-6 h-6" />
          {cartItem.length !== 0 && (
            <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs w-5 h-5 font-semibold flex items-center justify-center rounded-full">
              {cartItem.length}
            </span>
          )}
        </Link>

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
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `transition-colors duration-200 hover:text-[#F97316] ${
                  isActive ? 'text-[#F97316] font-semibold' : 'text-white'
                }`
              }
            >
              Login
            </NavLink>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={user.image as string}
                  alt={user.firstName + ' ' + user.lastName}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#334155] space-y-2 p-4 rounded-lg">
                <h1 className="flex justify-center items-center text-white font-semibold border-b border-white pb-2 mb-2">
                  {user.firstName + ' ' + user.lastName}
                </h1>
                <DropdownMenuItem asChild>
                  <Link
                    to={`/dashboard/${user.role}`}
                    className="cursor-pointer border border-white text-white"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={handleLogout}>
                  <button className="w-full inline bg-red-500 cursor-pointer text-white">
                    Logout
                  </button>
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

            <DropdownMenuContent className="flex flex-col space-y-2 bg-[#334155] p-4 rounded-lg mt-4 mr-5">
              {user.firstName && (
                <div className="flex items-center space-x-2 border-b border-white pb-2">
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
              <DropdownMenuItem asChild>
                <Link
                  to="/"
                  className={`border border-white ${isActive('/') ? 'bg-slate-800 text-white font-bold' : 'text-white'}`}
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/products"
                  className={`border border-white ${isActive('/products') ? 'bg-slate-800 text-white font-bold' : 'text-white'}`}
                >
                  Products
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/aboutUs"
                  className={`border border-white ${isActive('/aboutUs') ? 'bg-slate-800 text-white font-bold' : 'text-white'}`}
                >
                  About Us
                </Link>
              </DropdownMenuItem>
              {user.firstName && (
                <DropdownMenuItem asChild>
                  <Link
                    to={`/dashboard/${user.role}`}
                    className={`border border-white ${isActive(`/dashboard/${user.role}`) ? 'bg-slate-800 text-white font-bold' : 'text-white'}`}
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              {!user.firstName ? (
                <DropdownMenuItem asChild>
                  <Link
                    to="/login"
                    className={`border border-white ${isActive('/login') ? 'bg-slate-800 text-white font-bold' : 'text-white'}`}
                  >
                    Login
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild onClick={handleLogout}>
                  <button className="inline py-2 bg-red-500 text-white font-semibold">
                    Logout
                  </button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Mobile Search Area */}
      {showMobileSearch && location.pathname !== '/products' && (
        <div ref={mobileSearchRef} className="md:hidden absolute top-full left-0 w-full mt-1 px-8">
          <input
            autoFocus
            className="w-full px-2 py-1 rounded bg-gray-100"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <ul className="bg-white rounded mt-1 shadow max-h-60 overflow-y-auto">
              {products.length ? (
                products.map((product: TProduct) => (
                  <li className="border-b" key={product._id}>
                    <Link
                      to={`/products/${product._id}`}
                      onClick={() => {
                        setSearchText('');
                        setShowMobileSearch(false);
                      }}
                      className="flex items-center gap-3 px-2 py-1"
                    >
                      <img src={product.images[0]} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <p className="text-sm text-gray-700">{product.name}</p>
                        <p className="text-xs text-gray-500">৳{product.price}</p>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-2 py-1 text-gray-500">No products found</li>
              )}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
