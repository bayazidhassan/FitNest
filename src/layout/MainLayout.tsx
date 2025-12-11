import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

const MainLayout = () => {
  const { pathname } = useLocation();
  // Route where footer should NOT appear
  const hideFooterRoutes = ["/aboutUs"];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col pt-24">
      {/* globally declare Toast container */}
      <Toaster position="top-center" />

      <NavBar></NavBar>

      {/* <Outlet></Outlet> */}
      {/* Main content area should expand */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* <Footer></Footer> */}
      {/* do not show footer section when I will visit about us page */}
      {!shouldHideFooter && <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
