import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { clearCart } from "../../redux/features/cart/addToCartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { persistor } from "../../redux/store";

const NavBar = () => {
  const user = useAppSelector((state) => state.auth);
  const cartItem = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    persistor.purge();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-[#0F172A] px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-white">
          <img
            src="https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"
            alt="Logo"
            className="w-14 h-14 rounded-full"
          />
          <span className="text-[#0D9488] font-bold text-2xl">FitNest</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-[#F97316] ${
                isActive ? "text-[#F97316] font-semibold" : "text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-[#F97316] ${
                isActive ? "text-[#F97316] font-semibold" : "text-white"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `transition-colors duration-200 relative inline-block hover:text-[#F97316] ${
                isActive ? "text-[#F97316] font-semibold" : "text-white"
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
                isActive ? "text-[#F97316] font-semibold" : "text-white"
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
                  alt={user.firstName + " " + user.lastName}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem className="font-semibold border-b-2">
                  {user.firstName + " " + user.lastName}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={`/dashboard/${user.role}`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <DropdownMenu
            open={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <button className="text-white focus:outline-none">
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                    alt={user.firstName + " " + user.lastName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-semibold">
                    {user.firstName + " " + user.lastName}
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
