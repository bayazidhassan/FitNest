import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { persistor } from "../../redux/store";

const NavBar = () => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    window.location.href = "/login";
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
          <Link to="/products" className="text-white hover:text-[#F97316]">
            Products
          </Link>
          {user.role === "admin" && (
            <Link
              to="/productManagement"
              className="text-white hover:text-[#F97316]"
            >
              Product Management
            </Link>
          )}
          <Link to="/cart" className="text-white hover:text-[#F97316]">
            Cart
          </Link>
          <Link to="/aboutUs" className="text-white hover:text-[#F97316]">
            About Us
          </Link>
          {!user.name ? (
            <Link to="/login" className="text-white hover:text-[#F97316]">
              Login
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={user.image as string}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem>{user.name}</DropdownMenuItem>
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
              {user.name && (
                <div className="flex items-center space-x-2 border-b border-gray-700 pb-2">
                  <img
                    src={user.image as string}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white font-semibold">{user.name}</span>
                </div>
              )}
              <DropdownMenuItem
                asChild
                className="text-white hover:text-[#F97316]"
              >
                <Link to="/products">
                  Products
                </Link>
              </DropdownMenuItem>
              {user.role === "admin" && (
                <DropdownMenuItem
                  asChild
                  className="text-white hover:text-[#F97316]"
                >
                  <Link to="/productManagement">
                    Product Management
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                asChild
                className="text-white hover:text-[#F97316]"
              >
                <Link to="/cart">
                  Cart
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="text-white hover:text-[#F97316]"
              >
                <Link to="/aboutUs">
                  About Us
                </Link>
              </DropdownMenuItem>
              {!user.name ? (
                <DropdownMenuItem
                  asChild
                  className="text-white hover:text-[#F97316]"
                >
                  <Link to="/login">
                    Login
                  </Link>
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
