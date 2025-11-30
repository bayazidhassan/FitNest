import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src={"https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png"}
              alt="Logo"
              className="w-14 h-14 rounded-full"
            />
            <span className="text-[#0D9488] font-bold text-2xl">FitNest</span>
          </div>
          <p className="text-gray-300 text-justify">
            Your fitness & e-commerce destination. Quality products to power
            your journey.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-[#F97316] font-semibold mb-2">Quick Links</h3>
          <Link to="/products" className="hover:text-[#0D9488]">
            Products
          </Link>
          <Link to="/productManagement" className="hover:text-[#0D9488]">
            Product Management
          </Link>
          <Link to="/cart" className="hover:text-[#0D9488]">
            Cart
          </Link>
          <Link to="/aboutUs" className="hover:text-[#0D9488]">
            About Us
          </Link>
          <Link to="/login" className="hover:text-[#0D9488]">
            Login
          </Link>
        </div>

        {/* Contact / Social */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-[#F97316] font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-300">Email: support@fitnest.com</p>
          <p className="text-gray-300">Phone: +123 456 7890</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-[#0D9488]">
              Facebook
            </a>
            <a href="#" className="hover:text-[#0D9488]">
              Instagram
            </a>
            <a href="#" className="hover:text-[#0D9488]">
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} FitNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
