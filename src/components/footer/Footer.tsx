import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white p-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center space-y-1 md:space-y-2">
          <div className="flex items-center space-x-2">
            <img
              src={'https://i.ibb.co/qMK6nT44/Fit-Nest-Logo.png'}
              alt="Logo"
              className="w-14 h-14 rounded-full"
            />
            <span className="text-[#0D9488] font-bold text-2xl">FitNest</span>
          </div>
          <p className="text-gray-300 text-justify">
            Your fitness & e-commerce destination. Quality products to power your journey.
          </p>
        </div>
        <div className="flex justify-between md:justify-evenly">
          <div className="flex flex-col space-y-0 md:space-y-1">
            <h3 className="text-[#F97316] font-semibold mb-2">Quick Links</h3>
            <Link to="/products" className="inline w-fit hover:text-[#0D9488]">
              Products
            </Link>
            <Link to="/cart" className="inline w-fit hover:text-[#0D9488]">
              Cart
            </Link>
            <Link to="/aboutUs" className="inline w-fit hover:text-[#0D9488]">
              About Us
            </Link>
            <Link to="/login" className="inline w-fit hover:text-[#0D9488]">
              Login
            </Link>
          </div>

          <div className="flex flex-col space-y-0 md:space-y-1">
            <h3 className="text-[#F97316] font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-300">Email: support@fitnest.com</p>
            <p className="text-gray-300">Phone: +123 456 7890</p>
            <div className="flex space-x-4">
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
      </div>
      <div className="border-t border-gray-700 mt-4 md:mt-8 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} FitNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
