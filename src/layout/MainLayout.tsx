import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

const MainLayout = () => {
  const { pathname } = useLocation();
  // Route where footer should NOT appear
  const hideFooterRoutes = ["/aboutUs"];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <div className="pt-24">
      <NavBar></NavBar>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
      {/* do not show footer section when I will visit about us page */}
      {!shouldHideFooter && <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
